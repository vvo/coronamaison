// import Cache from "lru-cache-fs";
// import { createWriteStream } from "fs";
// import { resolve } from "path";
// import { SitemapStream } from "sitemap";

// const baseUrl = "https://istayhome-info.now.sh/";
// const cache = new Cache({
//   max: 1000,
//   cacheName: "istayhome.info", // filename ref to be used
// });
// const [languages] = cache.get("languages");
// const sitemapStream = new SitemapStream({
//   hostname: baseUrl,
// });
// sitemapStream.pipe(createWriteStream(resolve("public/sitemap.xml")));

// sitemapStream.write({ url: baseUrl });

// languages.forEach(({ code }) => {
//   sitemapStream.write({
//     url: code,
//   });
// });
// sitemapStream.end();
