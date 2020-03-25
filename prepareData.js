import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import async from "async";
import { DateTime } from "luxon";
import got from "got";
import fs from "fs";
import stream from "stream";
import { promisify } from "util";
import mkdirp from "mkdirp";
import path from "path";
import sharp from "sharp";
import sqip from "sqip";

const pipeline = promisify(stream.pipeline);

const adapter = new FileSync("db.json");
const db = low(adapter);
const deletes = require("./data/deletes.json").deleted.twitter;

async function run() {
  const drawings = db
    .get("drawings")
    .filter(({ id_str }) => !deletes.includes(id_str))
    .value();

  const drawingsByDate = {};

  const worker = async.asyncify(async (drawing) => {
    const date = DateTime.fromJSDate(new Date(drawing.created_at));
    const formattedDrawing = {
      source: "twitter",
      id: drawing.id_str,
      username: drawing.user.screen_name,
      text: drawing.text,
      likes: drawing.retweet_count + drawing.favorite_count,
      image: drawing.extended_entities.media[0].media_url_https,
      date: date.toISO(),
    };

    const extension = path.extname(
      drawing.extended_entities.media[0].media_url_https,
    );

    const formattedDate = date.toFormat("yyyy-LL-dd");

    const drawingsFolder = path.join(__dirname, "drawings", formattedDate);
    const thumbnailsFolder = path.join(__dirname, "public/thumbnails");
    const filename = `${formattedDrawing.source}-${formattedDrawing.id}`;
    const imagePath = path.join(drawingsFolder, `${filename}.jpg`);
    const thumbnailPath = path.join(thumbnailsFolder, `${filename}.svg`);

    await mkdirp(drawingsFolder);
    await mkdirp(thumbnailsFolder);

    if (!(await fileExists(imagePath))) {
      try {
        const streams = [got.stream(formattedDrawing.image)];

        if (extension !== ".jpg") {
          streams.push(sharp().toFormat("jpg"));
        }

        streams.push(fs.createWriteStream(imagePath));

        await pipeline(...streams);
      } catch (e) {
        // when there's a 404, image is still created so we delete it and returns
        if (e.name === "HTTPError") {
          console.error(formattedDrawing);
          await fs.promises.unlink(imagePath);
        }

        return false;
      }
    }

    if (!(await fileExists(thumbnailPath))) {
      await sqip({
        input: imagePath,
        output: thumbnailPath,
        width: 0,
        plugins: ["sqip-plugin-pixels", "sqip-plugin-svgo"],
      });
    }

    drawingsByDate[formattedDate] = drawingsByDate[formattedDate] || [];
    drawingsByDate[formattedDate].push(formattedDrawing);

    return true;
  });

  async.eachLimit(drawings, 4, worker, (err) => {
    if (err) {
      throw err;
    }

    const drawingsByDateArray = Object.entries(drawingsByDate);
    const dataFolder = path.join(__dirname, "data");

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

    const allDates = drawingsByDateArray.reduce((acc, [date, drawings]) => {
      const [year, month, day] = date.split("-");
      acc.push({ year, month, day, nbDrawings: drawings.length });
      return acc;
    }, []);

    fs.writeFileSync(
      path.join(dataFolder, "allDates.json"),
      JSON.stringify(allDates, null, 2),
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

// <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by freepik - www.freepik.com</a>
