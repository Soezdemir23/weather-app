/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    screens: {
      xs: "320px",
      "mobile-m": "375px",
      md: "768px",
      "ipad-air": "820px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  corePlugins: {
    preflight: false,
  },
  important: "#root",
  plugins: [],
});
