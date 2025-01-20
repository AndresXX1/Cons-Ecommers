/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.{html,js,jsx,ts,tsx}", "index.html"],
  theme: {
    extend: {
      colors: {
        argenpesos: {
          red: "#ED1A00",
          red2: "#E64628",
          white: "#FFF",
          textos: "#575757",
          gray: "#F2F2F2",
          gray2: "#ABABAB",
          gray3: "#AAA",
          salmon: "#F68D80",
          skyBlue: "#4DCCFF",
        },
      },
      fontFamily: {
        light: ["Gotham Light", "sans-serif"],
        regular: ["Gotham Regular", "sans-serif"],
        medium: ["Gotham Medium", "sans-serif"],
        bold: ["Gotham Bold", "sans-serif"],
        normal: ["Gotham Medium", "sans-serif"],
        book: ["Gotham Book", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
