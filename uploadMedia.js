import path from "path";
import { DateTime } from "luxon";
import OVHStorage from "node-ovh-storage";
import drawingsById from "./data/drawingsById.json";

const config = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  authURL: "https://auth.cloud.ovh.net/v3",
  tenantId: process.env.TENANTID,
  region: "GRA",
};
const storage = new OVHStorage(config);

const publicDrawingsFolder = path.join(__dirname, "public/drawings");
const coloringPagesFolder = path.join(__dirname, "public/coloringPages");

const startDate = process.env.DATE || DateTime.local().toFormat("yyyy-LL-dd");

storage.getToken((err) => {
  if (!err) {
    for (let item in drawingsById) {
      if (drawingsById[item].date.startsWith(startDate)) {
        // item to upload
        const drawingFilename = `twitter-${drawingsById[item].id}-1026.jpg`;
        const coloringFilename = `twitter-${drawingsById[item].id}.png`;

        const jpgPublicBasePath = path.join(
          publicDrawingsFolder,
          drawingFilename,
        );
        const coloringPagePath = path.join(
          coloringPagesFolder,
          coloringFilename,
        );

        storage.putFile(
          jpgPublicBasePath,
          `/coronamaison/drawings/${drawingFilename}`,
          (err, res) => {
            // done
            if (err) {
              console.warn(res);
            } else {
              console.log(
                `File has been uploaded : https://media.coronamaison.net/i/drawings/${drawingFilename}`,
              );
            }
          },
        );

        storage.putFile(
          coloringPagePath,
          `/coronamaison/coloringPages/${coloringFilename}`,
          (err, res) => {
            // done
            if (err) {
              console.warn(res);
            } else {
              console.log(
                `File has been uploaded : https://media.coronamaison.net/i/coloringPages/${coloringFilename}`,
              );
            }
          },
        );
      }
    }
  } else {
    console.log("OVH Storage error => ", err);
  }
});
