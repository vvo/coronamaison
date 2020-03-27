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

const adapter = new FileSync("data/drawings.json");
const db = low(adapter);

const dbDeletes = low(new FileSync("data/deletes.json"));

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
    const filename = `${formattedDrawing.source}-${formattedDrawing.id}`;

    const jpgOriginalImagePath = path.join(
      originalDrawingsFolder,
      `${filename}.jpg`,
    );
    const jpgPublicImagePath = path.join(
      publicDrawingsFolder,
      `${filename}.jpg`,
    );
    const webpPublicImagePath = path.join(
      publicDrawingsFolder,
      `${filename}.webp`,
    );
    const thumbnailPath = path.join(thumbnailsFolder, `${filename}.svg`);

    await mkdirp(originalDrawingsFolder);
    await mkdirp(publicDrawingsFolder);
    await mkdirp(thumbnailsFolder);

    if (
      !(await fileExists(jpgOriginalImagePath)) ||
      !(await fileExists(jpgPublicImagePath)) ||
      !(await fileExists(webpPublicImagePath))
    ) {
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

        promises.push(
          sharpStream
            .clone()
            .jpeg({ quality: 80, progressive: true })
            .toFile(jpgPublicImagePath),
        );
        promises.push(
          sharpStream
            .clone()
            .webp({
              quality: 80,
            })
            .toFile(webpPublicImagePath),
        );
        got.stream(formattedDrawing.originalImage).pipe(sharpStream);

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
            await fs.promises.unlink(jpgPublicImagePath);
            await fs.promises.unlink(webpPublicImagePath);
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

    if (!(await fileExists(thumbnailPath))) {
      try {
        const result = await sqip({
          input: jpgOriginalImagePath,
          output: thumbnailPath,
          width: 0, // keep original width
          plugins: ["sqip-plugin-pixels", "sqip-plugin-svgo"],
        });

        formattedDrawing.imageHeight = result.metadata.height;
        formattedDrawing.imageWidth = result.metadata.width;
      } catch (e) {
        console.error(
          "Could not generate thumbnail for",
          jpgOriginalImagePath,
          e,
        );
      }
    }

    drawingsByDate[formattedDate] = drawingsByDate[formattedDate] || [];
    drawingsByDate[formattedDate].push(formattedDrawing);

    return true;
  });

  console.log("Downloading images from twitter");
  async.eachLimit(formattedDrawings, 10, worker, (err) => {
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
