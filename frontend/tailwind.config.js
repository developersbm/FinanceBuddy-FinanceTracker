/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    daisyui: {
      themes: ["light", "dark"],
      darkTheme: "dark",
    },
    plugins: [require("daisyui")],
  }