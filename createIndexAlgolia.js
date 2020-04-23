// For the default version
import { DateTime } from "luxon";
import algoliasearch from "algoliasearch";
import drawingsById from "./data/drawingsById.json";

const client = algoliasearch(
  process.env.ALGOLIA_CLIENT_ID,
  process.env.ALGOLIA_TOKEN,
);
const index = client.initIndex("coronamaison");

const startDate = process.env.DATE;

for (let item in drawingsById) {
  let object = drawingsById[item];
  const indexId = object.id;
  object.objectID = indexId;

  if (startDate) {
    if (object.date.startsWith(startDate)) {
      index.saveObject(object).then(({ objectID }) => {
        console.log(objectID);
      });
    }
  } else {
    index.saveObject(object).then(({ objectID }) => {
      console.log(objectID);
    });
  }
}
