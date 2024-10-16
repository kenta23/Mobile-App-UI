/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#E44881",
        secondary: "#5548E4",
        darker: "#07040B",
        lightPrimary: "#EB9AB7",
        lightSecondary: "#886DE8",
      },
    },
  },
  plugins: [],
};
