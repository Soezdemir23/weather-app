/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
{
  /* sm: 540px, not 640px. WOW 
      md: 720, not 768px
      */
}
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {},
  corePlugins: {
    preflight: false,
  },
  important: "#root",
  plugins: [],
});
