const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@stagehq/ui/dist/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "blue-gray": colors.slate,
        "yellow-light": "#fffd6c",
        "indigo-light": "#f5f7fe",
        background: "#f7f7f7",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        handwritten: ["Nanum Pen Script", ...defaultTheme.fontFamily.serif],
        mono: ["jetBrainsMono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};
