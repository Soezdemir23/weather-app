/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    screens: {
      xs: "320px",
      "ipad-air": "820px",
    },
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  important: "#root",
  plugins: [],
});
