const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        cursive: ["Gochi Hand", "cursive"],
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
