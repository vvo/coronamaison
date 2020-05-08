const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: ["./components/**/*.jsx", "./pages/**/*.jsx"],
    options: {
      whitelist: ["twitter-tweet"],
      whitelistPatternsChildren: [/^lazy/], // lazy loading classes are added dynamically by an external script
    },
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        cursive: ["Gochi Hand", "Comic Sans MS", "cursive", "sans-serif"],
      },
      colors: {
        yellow: {
          "500": "#f1eddc",
          "700": "#848278",
          "900": "#30302C",
        },
        twitter: "#1da1f2",
      },
    },
  },
  variants: {},
  plugins: [],
};
