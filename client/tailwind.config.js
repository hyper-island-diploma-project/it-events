/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{css,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Outfit', 'sans-serif'],
      },
      colors: {
        blueAccent: '#1D6BF3',
        black: '#1A1B22',
        yellow: '#FFDC4A',
      },
    },
  },
  plugins: [],
};
