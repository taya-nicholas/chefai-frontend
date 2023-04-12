/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "pale-yellow": "#fbf9ee",
        aqua: "#9ee8f1",
      },
    },
  },
  plugins: [require("daisyui")],
};
