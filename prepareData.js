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
const deletes = require("./data/deletes.json").deleted.twitter;

async function run() {
  const drawings = db
    .get("drawings")
    .filter(({ id_str }) => !deletes.includes(id_str))
    .value();

  const drawingsByDate = {};
  const dataFolder = path.join(__dirname, "data");

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

  const top20Drawings = formattedDrawings
    .sort((a, b) => {
      return a.likes > b.likes ? -1 : 1;
    })
    .slice(0, 20);

  fs.writeFileSync(
    path.join(dataFolder, "top20Drawings.json"),
    JSON.stringify(top20Drawings, null, 2),
  );

  // reformat and download images
  const worker = async.asyncify(async (formattedDrawing) => {
    const formattedDate = DateTime.fromISO(formattedDrawing.date).toFormat(
      "yyyy-LL-dd",
    );

    const drawingsFolder = path.join(__dirname, "public/drawings");
    const thumbnailsFolder = path.join(__dirname, "public/thumbnails");
    const filename = `${formattedDrawing.source}-${formattedDrawing.id}`;
    const jpgImagePath = path.join(drawingsFolder, `${filename}.jpg`);
    const webpImagePath = path.join(drawingsFolder, `${filename}.webp`);
    const thumbnailPath = path.join(thumbnailsFolder, `${filename}.svg`);

    await mkdirp(drawingsFolder);
    await mkdirp(thumbnailsFolder);

    if (
      !(await fileExists(jpgImagePath)) ||
      !(await fileExists(webpImagePath))
    ) {
      try {
        const sharpStream = sharp({
          failOnError: false,
        });

        const promises = [];

        promises.push(sharpStream.clone().toFormat("jpg").toFile(jpgImagePath));
        promises.push(
          sharpStream.clone().toFormat("webp").toFile(webpImagePath),
        );
        got.stream(formattedDrawing.originalImage).pipe(sharpStream);

        await Promise.all(promises);
      } catch (e) {
        // when there's a 404, image is still created so we delete it and returns
        if (e.name === "HTTPError") {
          console.error(formattedDrawing);
          try {
            await fs.promises.unlink(jpgImagePath);
            await fs.promises.unlink(webpImagePath);
          } catch (e) {
            console.error("Could not delete some files", e);
          }

          return false;
        }

        console.error("Unknown error", e);

        return false;
      }
    }

    if (!(await fileExists(thumbnailPath))) {
      await sqip({
        input: jpgImagePath,
        output: thumbnailPath,
        width: 0,
        plugins: ["sqip-plugin-pixels", "sqip-plugin-svgo"],
      });
    }

    drawingsByDate[formattedDate] = drawingsByDate[formattedDate] || [];
    drawingsByDate[formattedDate].push(formattedDrawing);

    return true;
  });

  async.eachLimit(formattedDrawings, 10, worker, (err) => {
    if (err) {
      throw err;
    }

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
