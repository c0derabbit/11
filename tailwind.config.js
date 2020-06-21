const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.njk',
  ],
  theme: {
    extend: {},
    colors: {
      black: '#333',
    },
    container: {
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    fontFamily: {
      ...fontFamily,
      sans: ['Helvetica Neue', 'Helvetica', ...fontFamily.sans],
    },
    letterSpacing: {
      wide: '.008em',
    },
    lineHeight: {
      tight: 1.15,
    },
    screens: {
      xl: {
        min: '1440px',
      },
    },
  },
  variants: {},
  plugins: [],
}
