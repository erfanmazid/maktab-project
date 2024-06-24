/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./mail.js"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
      },
      backgroundImage: {
        welcome: "url('./src/img/welcom/bg.png')",
      },
    },
  },
  plugins: [],
};
