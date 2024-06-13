/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'], // Ensures Inter is the first font in the sans-serif stack
      }
    },
  },
  plugins: [require('daisyui')],
}

