/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'main': '#1A1A1A',
      },
      fontFamily: {
        'main': ['Montserrat', 'sans-serif'],
      },
      textColor: {
        'main': '#FFFFFF',
      },
    },
  },
  plugins: [],
}

