module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.html', './src/**/*.js']
    })
  ]
}
