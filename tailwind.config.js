/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        slate: {
          850: '#141E2E',
          900: '#0F172A',
          950: '#020617',
        }
      }
    },
  },
  plugins: [],
}
