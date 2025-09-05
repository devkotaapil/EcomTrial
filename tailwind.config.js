// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
         nunito: ['Nunito', 'sans-serif'],
         edu: ['Edu NSW ACT Cursive', 'sans-serif']
      }
    },
  },
  plugins: [],
};