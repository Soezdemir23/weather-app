/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    screens: {
      xs: { min: "0px", max: "374px" },
      "mobile-m": { min: "375px", max: "639px" },
      md: { min: "768px", max: "819px" },
      "ipad-air": { min: "820px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px", max: "1535px" },
      "2xl": "1536px",
    },
  },
  corePlugins: {
    preflight: false,
  },
  important: "#root",
  plugins: [],
});
