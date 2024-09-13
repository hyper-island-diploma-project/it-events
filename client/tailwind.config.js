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
        accent: '#5100FF',
        black: '#1A1B22',
        blackDark: '#171717',
        yellow: '#FFDC4A',
        lightGray: '#F6F6F6',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
      animation: {
        fade: 'fadeIn 0.5s ease-in-out',
      },
      height: (theme) => ({
        'screen/60': '60vh',
      }),
    },
  },
  plugins: [],
};
