require("events").EventEmitter.defaultMaxListeners = 15;

import fs from "fs";
import path from "path";
import { promisify } from "util";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import async from "async";
import { DateTime } from "luxon";
import got from "got";
import mkdirp from "mkdirp";
import sharp from "sharp";
import sqip from "sqip";
import sizeOf from "image-size";
const exec = promisify(require("child_process").exec);

const adapter = new FileSync("data/drawings.json");
const db = low(adapter);

const dbDeletes = low(new FileSync("data/deletes.json"));
const sizes = [1026];

const bearerToken = process.env.SECRET_TWITTER_BEARER_TOKEN;
const twitter = got.extend({
  prefixUrl: "https://api.twitter.com/1.1/",
  responseType: "json",
  headers: {
    authorization: `Bearer ${bearerToken}`,
  },
});

dbDeletes
  .defaults({
    deleted: {
      twitter: [],
    },
  })
  .write();

const deletes = dbDeletes.get("deleted.twitter");
const deletedTweets = deletes.value();

async function run() {
  const drawingsFromDatabase = db
    .get("drawings")
    .filter(({ id_str }) => !deletedTweets.includes(id_str));

  // First let's update RT + likes count for every drawing
  const drawingsGroupsOf100 = drawingsFromDatabase.chunk(100);
  let updatedTweets = {};

  for (const drawingsGroupOf100 of drawingsGroupsOf100) {
    try {
      const res = await twitter.post("statuses/lookup.json", {
        form: {
          id: drawingsGroupOf100.map(({ id_str }) => id_str).join(","),
          include_entities: false,
          trim_user: true,
          map: true,
        },
      });
      updatedTweets = {
        ...updatedTweets,
        ...res.body.id,
      };
    } catch (e) {
      console.error("Could not update tweets", e.response.body);
      process.exit(1);
    }
  }

  const tweetsIdToDelete = Object.entries(updatedTweets)
    .filter(([, tweet]) => tweet === null)
    .map(([id]) => id);

  tweetsIdToDelete.forEach((id) => {
    if (!deletedTweets.includes(id)) {
      console.log("Deleting tweet", id);
      deletes.push(id).write();
    }
  });

  const drawings = drawingsFromDatabase
    .filter(({ id_str }) => !tweetsIdToDelete.includes(id_str))
    .map((drawing) => {
      return {
        ...drawing,
        retweet_count: updatedTweets[drawing.id_str].retweet_count,
        favorite_count: updatedTweets[drawing.id_str].favorite_count,
      };
    })
    .value();

  const drawingsByDate = {};
  const drawingsById = {};
  const dataFolder = path.join(__dirname, "data");

  console.log("Formatting drawings objects");
  const formattedDrawings = drawings.map((drawing) => {
    const date = DateTime.fromJSDate(new Date(drawing.created_at));

    return {
      source: drawing.source,
      id: drawing.id_str,
      username: drawing.user.screen_name,
      likes: drawing.retweet_count + drawing.favorite_count,
      originalImage: drawing.extended_entities.media[0].media_url_https,
      date: date.toISO(),
    };
  });

  // reformat and download images
  const worker = async.asyncify(async (formattedDrawing) => {
    const formattedDate = DateTime.fromISO(formattedDrawing.date).toFormat(
      "yyyy-LL-dd",
    );

    const originalDrawingsFolder = path.join(
      __dirname,
      "data/originalDrawings",
      formattedDate,
    );
    const manualColoringPagesFolder = path.join(
      __dirname,
      "data/manualColoringPages",
    );
    const publicDrawingsFolder = path.join(__dirname, "public/drawings");
    const thumbnailsFolder = path.join(__dirname, "public/thumbnails");
    const coloringPagesFolder = path.join(__dirname, "public/coloringPages");
    const filename = `${formattedDrawing.source}-${formattedDrawing.id}`;

    const jpgOriginalImagePath = path.join(
      originalDrawingsFolder,
      `${filename}`,
    );

    await mkdirp(originalDrawingsFolder);
    await mkdirp(publicDrawingsFolder);
    await mkdirp(thumbnailsFolder);
    await mkdirp(coloringPagesFolder);
    await mkdirp(manualColoringPagesFolder);

    const jpgPublicBasePath = path.join(publicDrawingsFolder, `${filename}`);

    if (
      !(await fileExists(jpgOriginalImagePath)) ||
      process.env.REGENERATE_IMAGES === "true"
    ) {
      console.log("downloading images + resizing for", filename);

      try {
        const sharpStream = sharp({
          failOnError: false,
        });

        const promises = [];

        promises.push(
          sharpStream
            .clone()
            .jpeg({ quality: 100 })
            .toFile(jpgOriginalImagePath),
        );

        // we were previously generating more formats, thus we're using this convulated way of using sharp
        sizes.forEach((size) => {
          promises.push(
            sharpStream
              .clone()
              .resize({ width: size })
              .jpeg({ quality: 80 })
              .toFile(`${jpgPublicBasePath}-${size}.jpg`),
          );
        });

        if (await fileExists(jpgOriginalImagePath)) {
          fs.createReadStream(jpgOriginalImagePath).pipe(sharpStream);
        } else {
          got.stream(formattedDrawing.originalImage).pipe(sharpStream);
        }

        await Promise.all(promises);
      } catch (e) {
        // when there's a 404, image is still created so we delete it and returns
        if (e.name === "HTTPError") {
          console.error("Drawing in error:", formattedDrawing);
          try {
            if (!deletedTweets.includes(formattedDrawing.id).value()) {
              deletes.push(formattedDrawing.id).write();
            }

            await fs.promises.unlink(jpgOriginalImagePath);
            await Promise.all(
              sizes.map((size) => {
                return Promise.all([
                  fs.promises.unlink(`${jpgPublicBasePath}-${size}.jpg`),
                ]);
              }),
            );
          } catch (e) {
            console.error(
              "Could not delete some files (most probably fine)",
              e,
            );
          }

          return false;
        }

        console.error("Unknown error", e);

        return false;
      }
    }

    // convert jpgOriginalImagePath to public/colouring-pages/source-id.png
    const coloringPagePath = path.join(coloringPagesFolder, `${filename}.png`);
    const maybeManualColoringPagePath = path.join(
      manualColoringPagesFolder,
      `${filename}.png`,
    );

    if (await fileExists(maybeManualColoringPagePath)) {
      console.log("Manual coloring page exists for", filename);
      await fs.promises.copyFile(maybeManualColoringPagePath, coloringPagePath);
    } else if (
      !(await fileExists(coloringPagePath)) ||
      process.env.REGENERATE_COLORING_PAGES === "true"
    ) {
      console.log("Generating coloring page for", filename);
      await exec(
        [
          `convert ${jpgOriginalImagePath} pgm:`,
          "mkbitmap -f 4 -s 2 -t 0.48 - -o -",
          "potrace --pgm",
          "convert -resize 1500 - png:",
          "pngquant 4 -",
          `pngout - ${coloringPagePath} -y`,
        ].join(" | "),
      );
    }

    const thumbnailPath = path.join(thumbnailsFolder, `${filename}.svg`);

    if (
      !(await fileExists(thumbnailPath)) ||
      process.env.REGENERATE_THUMBNAILS === "true"
    ) {
      console.log("generating thumbnail for", filename);
      try {
        await sqip({
          input: `${jpgPublicBasePath}-800.jpg`,
          output: thumbnailPath,
          plugins: ["sqip-plugin-pixels", "sqip-plugin-svgo"],
        });
      } catch (e) {
        console.error(
          "Could not generate thumbnail for",
          jpgOriginalImagePath,
          e,
        );
      }
    }

    const { width: imageWidth, height: imageHeight } = await sizeOf(
      jpgOriginalImagePath,
    );

    drawingsByDate[formattedDate] = drawingsByDate[formattedDate] || [];

    // This is done this way (and not via push({...formattedDrawing, imageWidth}) for example)
    // because we WANT to modify the original formattedDrawing object from formattedDrawings array
    // so that the top50Drawings are computed with modified data
    // MUTATE ALL THE THINGS
    formattedDrawing.imageWidth = imageWidth;
    formattedDrawing.imageHeight = imageHeight;
    formattedDrawing.originalImage = undefined;

    drawingsById[formattedDrawing.id] = formattedDrawing;

    drawingsByDate[formattedDate].push(formattedDrawing);

    return true;
  });

  async.eachLimit(formattedDrawings, 2, worker, (err) => {
    if (err) {
      throw err;
    }

    console.log("Compiling top50");
    const top50Drawings = formattedDrawings
      .sort((a, b) => {
        return a.likes > b.likes ? -1 : 1;
      })
      .slice(0, 50);

    fs.writeFileSync(
      path.join(dataFolder, "top50Drawings.json"),
      JSON.stringify(top50Drawings, null, 2),
    );

    // reorder to get most recent dates at the top
    const drawingsByDateArray = Object.entries(drawingsByDate).sort(
      ([dateA], [dateB]) => {
        return dateA > dateB ? -1 : 1;
      },
    );

    drawingsByDateArray.forEach(([date, drawings]) => {
      fs.writeFileSync(
        path.join(dataFolder, `${date}.json`),
        JSON.stringify(
          drawings.sort((a, b) => {
            return a.likes > b.likes ? -1 : 1;
          }),
          null,
          2,
        ),
      );
    });

    fs.writeFileSync(
      path.join(dataFolder, "drawingsById.json"),
      JSON.stringify(drawingsById, null, 2),
    );

    const allDates = drawingsByDateArray.reduce(
      (acc, [date, drawingsForDay]) => {
        const [year, month, day] = date.split("-");
        acc.push({ year, month, day, nbDrawings: drawingsForDay.length });
        return acc;
      },
      [],
    );

    fs.writeFileSync(
      path.join(dataFolder, "allDates.json"),
      JSON.stringify(allDates, null, 2),
    );

    const now = DateTime.local().setLocale("fr");
    fs.writeFileSync(
      path.join(dataFolder, "state.json"),
      JSON.stringify(
        {
          lastUpdate: `${now.toLocaleString(DateTime.DATETIME_MED)}`,
          nbDrawings: drawings.length,
        },
        null,
        2,
      ),
    );
  });
}

async function fileExists(filePath) {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch (e) {
    return false;
  }
}

run();
