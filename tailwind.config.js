const { colors, fontFamily, screens } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.njk'
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      black: '#111'
    },
    container: {
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem'
      }
    },
    fontFamily: {
      ...fontFamily,
      sans: ['Helvetica Neue', 'Helvetica', ...fontFamily.sans]
    },
    letterSpacing: {
      wide: '.008em'
    },
    lineHeight: {
      tight: 1.15
    },
    maxWidth: {
      '2xl': '44rem'
    },
    screens: {
      ...screens,
      xl: {
        min: '1440px'
      }
    }
  },
  variants: {},
  plugins: []
}
