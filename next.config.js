// next.config.js
const withPlugins = require("next-compose-plugins");

const optimizedImages = require("next-optimized-images");
const withBundleAnalyzer = require("@next/bundle-analyzer");

module.exports = withPlugins([
  optimizedImages,
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  }),
]);
