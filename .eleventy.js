module.exports = function(config) {
  config.addPassthroughCopy({ public: './' })

  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
  })

  config.addCollection('hu', api => api.getFilteredByGlob('src/blog/hu/*.md'))
  config.addCollection('en', api => api.getFilteredByGlob('src/blog/en/*.md'))

  const slugify = require('slugify')
  const countries = require('./src/app/helpers/countries')
  const categories = require('./src/app/helpers/categories')

  categories.hu.forEach(category => {
    const [country, year] = category.split(', ')
    config.addCollection(`hu_${slugify(category)}`, api =>
      api
        .getFilteredByGlob('src/blog/hu/*.md')
        .filter(post =>
          post.data.country === country
          && parseInt(year) === new Date(post.data.date).getFullYear()
        )
        .sort((a, b) => b.data.date - a.data.date)
    )
  })

  categories.en.forEach(category => {
    const [country, year] = category.split(', ')
    config.addCollection(`en_${slugify(category)}`, api =>
      api
        .getFilteredByGlob('src/blog/en/*.md')
        .filter(post =>
          post.data.country === country
          && parseInt(year) === new Date(post.data.date).getFullYear()
        )
        .sort((a, b) => b.data.date - a.data.date)
    )
  })

  countries.hu.forEach(country => {
    config.addCollection(`hu_${country || 'világ'}`, api =>
      api
        .getFilteredByGlob('src/blog/hu/*.md')
        .filter(post => !!country
          ? post.data.country === country
          : !post.data.country
        )
        .reverse()
    )
  })

  countries.en.forEach(country => {
    config.addCollection(`en_${country || 'world'}`, api =>
      api
        .getFilteredByGlob('src/blog/en/*.md')
        .filter(post => !!country
          ? post.data.country === country
          : !post.data.country
        )
        .reverse()
    )
  })

  config.addShortcode('baseUrl', () => 'https://nagyfalat.com')

  const markdownIt = require('markdown-it')
  const markdownItAttrs = require('markdown-it-attrs')
  const markdownItSpan = require('markdown-it-bracketed-spans')
  const options = {
    html: true,
    linkify: true,
    typographer: true,
  }
  const markdownLib = markdownIt(options)
    .use(markdownItAttrs)
    .use(markdownItSpan)
    .use(require('markdown-it-footnote'))
  config.setLibrary('md', markdownLib)

  const pluginRss = require('@11ty/eleventy-plugin-rss')
  config.addPlugin(pluginRss)

  return {
    templateFormats: ['md', 'jpg', 'jpeg', 'png', 'gif', 'mp4', 'njk'],
    dir: {
      input: 'src',
      output: 'dist',
      layouts: 'app/layouts',
    }
  }
}
