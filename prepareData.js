require("events").EventEmitter.defaultMaxListeners = 15;

import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import async from "async";
import { DateTime } from "luxon";
import got from "got";
import fs from "fs";
import mkdirp from "mkdirp";
import path from "path";
import sharp from "sharp";
import sqip from "sqip";
import sizeOf from "image-size";
import { promisify } from "util";
const exec = promisify(require("child_process").exec);

const adapter = new FileSync("data/drawings.json");
const db = low(adapter);

const dbDeletes = low(new FileSync("data/deletes.json"));
const sizes = [800, 1026];

dbDeletes
  .defaults({
    deleted: {
      twitter: [],
    },
  })
  .write();

const deletes = dbDeletes.get("deleted.twitter").value();

async function run() {
  const drawings = db
    .get("drawings")
    .filter(({ id_str }) => !deletes.includes(id_str))
    .value();

  const drawingsByDate = {};
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
      avatarImage: drawing.user.profile_image_url_https,
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

    const jpgPublicBasePath = path.join(publicDrawingsFolder, `${filename}`);

    const webpPublicBasePath = path.join(publicDrawingsFolder, `${filename}`);

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

        sizes.forEach((size) => {
          promises.push(
            sharpStream
              .clone()
              .resize({ width: size })
              .jpeg({ quality: 80 })
              .toFile(`${jpgPublicBasePath}-${size}.jpg`),
          );

          promises.push(
            sharpStream
              .clone()
              .resize({ width: size })
              .webp({
                quality: 80,
              })
              .toFile(`${webpPublicBasePath}-${size}.webp`),
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
            if (!dbDeletes.includes(formattedDrawing.id).value()) {
              dbDeletes.push(formattedDrawing.id).write();
            }

            await fs.promises.unlink(jpgOriginalImagePath);
            await Promise.all(
              sizes.map((size) => {
                return Promise.all([
                  fs.promises.unlink(`${jpgPublicBasePath}-${size}.jpg`),
                  fs.promises.unlink(`${webpPublicBasePath}-${size}.webp`),
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

    if (
      !(await fileExists(coloringPagePath)) ||
      process.env.REGENERATE_COLORING_PAGES === "true"
    ) {
      console.log("Generating coloring page for", filename);
      await exec(
        [
          `convert ${jpgOriginalImagePath} pgm:`,
          "mkbitmap -f 4 -s 2 -t 0.48 - -o -",
          "potrace --pgm",
          "convert -resize 2300 - png:",
          `pngquant 4 - > ${coloringPagePath}`,
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
    // so that the top20Drawings are computed with modified data
    // MUTATE ALL THE THINGS
    formattedDrawing.imageWidth = imageWidth;
    formattedDrawing.imageHeight = imageHeight;

    drawingsByDate[formattedDate].push(formattedDrawing);

    return true;
  });

  async.eachLimit(formattedDrawings, 4, worker, (err) => {
    if (err) {
      throw err;
    }

    console.log("Compiling top20");
    const top20Drawings = formattedDrawings
      .sort((a, b) => {
        return a.likes > b.likes ? -1 : 1;
      })
      .slice(0, 20);

    fs.writeFileSync(
      path.join(dataFolder, "top20Drawings.json"),
      JSON.stringify(top20Drawings, null, 2),
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
