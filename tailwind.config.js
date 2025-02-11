/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        aeonik: ['AeonikTRIAL', 'sans-serif'], 
      },
      colors:{
        green:"#00D74E",
        grey:"#8D959D",
        black_custom:"#1E1E1E",
        white_custom:"#F2F4F4",
      },
      fontWeight: {
        light: 300,
        normal: 400,
        bold: 700,
      },
    },
  },
  plugins: [],
};
