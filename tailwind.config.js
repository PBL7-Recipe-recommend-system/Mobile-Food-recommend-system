/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor100: "#129575",
      },
      fontFamily: {
        sans: ["Poppin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
