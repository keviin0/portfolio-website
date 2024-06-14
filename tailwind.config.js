/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'], 
      },
      height: {
        '80v': "80vh",
      },
      backgroundImage: {
        'web-dev-ss': "url('/img/WebDev.png')",
      }
    },
  },
  plugins: [require('daisyui')],
}

