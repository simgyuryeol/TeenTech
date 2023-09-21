/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    neumorphismColor: {
      eee: "#3BACFF",
    },
    extend: {},
  },
  plugins: [require("tailwindcss-neumorphism")],
};
