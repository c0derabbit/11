module.exports = function(config) {
  config.addPassthroughCopy({ public: './' })

  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
  })

  config.addCollection('hu', api => api.getFilteredByGlob('src/blog/hu/*.md'))
  config.addCollection('en', api => api.getFilteredByGlob('src/blog/en/*.md'))

  const countries = require('./src/app/helpers/countries')

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

  return {
    templateFormats: ['md', 'jpg', 'png', 'gif', 'mp4'],
    dir: {
      input: 'src',
      output: 'dist',
      layouts: 'app/layouts',
    }
  }
}
