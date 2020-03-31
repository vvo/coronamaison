const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: ["./components/**/*.jsx", "./pages/**/*.jsx"],
    whitelist: ["twitter-tweet"],
    whitelistPatternsChildren: [/^lazy/], // lazy loading classes are added dynamically by an external script
    defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
  },
];

module.exports = {
  plugins: [
    "postcss-import",
    "tailwindcss",
    "autoprefixer",
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
