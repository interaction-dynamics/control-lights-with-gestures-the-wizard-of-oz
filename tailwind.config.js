const colors = require('tailwindcss/colors')

// https://coolors.co/031224-720045-83215d-af0069-949cdf-f5853f-0cce6b-3083dc-bce7fd-c492b1

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        200: '0 0 400px',
        300: '0 0 300px',
      },
      colors: {
        black: {
          500: '#000000',
          600: '#010B17',
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
