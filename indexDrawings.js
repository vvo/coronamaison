// For the default version
import algoliasearch from "algoliasearch";
import drawingsById from "./data/drawingsById.json";

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.SECRET_ALGOLIA_ADMIN_API_KEY,
);
const algoliaIndex = algoliaClient.initIndex(process.env.ALGOLIA_INDEX_NAME);
run()
  .then(() => {
    console.log("done");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

async function run() {
  await algoliaIndex.setSettings({
    searchableAttributes: ["username"],
    customRanking: ["desc(likes)"],
  });

  await algoliaIndex.saveObjects(
    Object.entries(drawingsById).reduce((allDrawings, [, drawing]) => {
      allDrawings.push({
        objectID: drawing.id,
        ...drawing,
      });
      return allDrawings;
    }, []),
  );
}
