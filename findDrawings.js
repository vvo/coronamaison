import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import got from "got";

const adapter = new FileSync("data/drawings.json");
const db = low(adapter);

const bearerToken = process.env.SECRET_TWITTER_BEARER_TOKEN;
const twitter = got.extend({
  prefixUrl: "https://api.twitter.com/1.1/",
  responseType: "json",
  headers: {
    authorization: `Bearer ${bearerToken}`,
  },
});

const start = new Date().toUTCString();

db.defaults({
  drawings: [],
  lastSync: new Date("Sun Mar 15 13:46:40 +0000 2020").toUTCString(), // first date
}).write();

async function run() {
  let hasMoreResults = true;
  let next = undefined;
  let nbTweets = 0;
  let nbRequests = 0;

  while (hasMoreResults === true) {
    const res = await twitter.post("tweets/search/30day/dev.json", {
      json: {
        query: "#coronamaison has:images",
        fromDate: "202003292159",
        toDate: "202003302159",
        maxResults: 100,
        next,
      },
    });
    nbRequests++;
    nbTweets += res.body.results.length;
    console.log(`request # ${nbRequests}, nbTweets: ${nbTweets}`);

    next = res.body.next;
    hasMoreResults = next !== undefined;

    const {
      body: { results: tweets },
    } = res;

    const drawings = tweets
      .map((tweet) =>
        tweet.truncated === true
          ? {
              ...tweet,
              text: tweet.extended_tweet.full_text,
              extended_entities: tweet.extended_tweet?.extended_entities,
              source: "twitter",
            }
          : { ...tweet, source: "twitter" },
      )
      .filter((tweet) => {
        if (tweet.retweeted_status !== undefined) {
          return false;
        }

        const media = tweet?.extended_entities?.media?.[0];
        if (media && media.type === "photo") {
          return true;
        }

        return false;
      });

    db.get("drawings")
      .push(...drawings)
      .write();

    await new Promise((resolve) => {
      setTimeout(resolve, 3 * 1000);
    });
  }

  db.set("lastSync", start).write();
}

run();
