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

const pipeline = promisify(stream.pipeline);

const adapter = new FileSync("db.json");
const db = low(adapter);

async function run() {
  const drawings = db
    .get("drawings")
    .slice(0, 30)
    .value();

  const drawingsByDate = {};

  const worker = async.asyncify(async (drawing) => {
    const date = DateTime.fromJSDate(new Date(drawing.created_at));

    const formattedDrawing = {
      source: "twitter",
      id: drawing.id_str,
      username: drawing.user.screen_name,
      text: drawing.text,
      image: drawing.extended_entities.media[0].media_url_https,
      date: date.toISO(),
    };

    const formattedDate = date.toFormat("yyyy-LL-dd");

    const drawingsFolder = path.join(__dirname, "drawings", formattedDate);
    const imagePath = path.join(
      drawingsFolder,
      `${formattedDrawing.source}-${formattedDrawing.id}.jpg`,
    );

    await mkdirp(drawingsFolder);
    if (!(await fileExists(imagePath))) {
      await pipeline(
        got.stream(formattedDrawing.image),
        fs.createWriteStream(imagePath),
      );
    }

    drawingsByDate[formattedDate] = drawingsByDate[formattedDate] || [];
    drawingsByDate[formattedDate].push(formattedDrawing);

    return true;
  });

  async.eachLimit(drawings, 2, worker, () => {
    const drawingsByDateArray = Object.entries(drawingsByDate);
    const dataFolder = path.join(__dirname, "data");

    drawingsByDateArray.forEach(([date, drawings]) => {
      fs.writeFileSync(
        path.join(dataFolder, `${date}.json`),
        JSON.stringify(drawings, null, 2),
      );
    });

    const allDates = drawingsByDateArray.reduce((acc, [date]) => {
      acc.push(date);
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
