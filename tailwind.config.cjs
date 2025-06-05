/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spindle: {
          50: '#f2f6fc',
          100: '#e2ecf7',
          200: '#ccddf1',
          300: '#a7c7e7',
          400: '#7fabdb',
          500: '#618ed0',
          600: '#4d75c3',
          700: '#4363b2',
          800: '#3c5291',
          900: '#344774',
          950: '#232d48',
        },
      },
    },
  },
  plugins: [],
}