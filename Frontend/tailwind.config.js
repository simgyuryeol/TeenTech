/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        bgblue: "#B6DBEE",
        // mainpink: "#FFA9B8",
        // mainblue: "#68B9E3",
        mainpink: "#FF7EA5",
        mainblue: "#3C95FF",
      }
    },
  },
  plugins: [],
};
