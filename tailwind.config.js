const {
  borderWidth,
  colors,
  fontFamily,
  inset,
  lineHeight,
} = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.njk'
  ],
  theme: {
    borderWidth: {
      ...borderWidth,
      '40': '40px',
    },
    colors: {
      ...colors,
      black: '#111'
    },
    container: {
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      }
    },
    fontFamily: {
      ...fontFamily,
      sans: ['"Helvetica Neue"', 'Helvetica', ...fontFamily.sans],
      serif: ['"IBM Plex Serif"', ...fontFamily.serif],
    },
    inset: {
      ...inset,
      '-16': '-4rem',
      '-20': '-5rem',
      '-32': '-8rem',
    },
    letterSpacing: {
      wide: '.008em'
    },
    lineHeight: {
      ...lineHeight,
      tight: 1.15
    },
  },
  variants: {},
  plugins: []
}
