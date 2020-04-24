// next.config.js
const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer");

module.exports = withPlugins(
  [
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === "true",
    }),
  ],
  {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
    env: {
      APP_ENV: process.env.APP_ENV || "production",
      DRAWINGS_BASE_URL: process.env.DRAWINGS_BASE_URL,
    },
  },
);
