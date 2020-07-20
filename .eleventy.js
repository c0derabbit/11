module.exports = function(config) {
  config.addPassthroughCopy({ public: './' })

  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
  })

  config.addCollection('postsHu', collectionApi =>
    collectionApi.getFilteredByGlob('src/blog/hu/*.md')
  )
  config.addCollection('postsEn', collectionApi =>
    collectionApi.getFilteredByGlob('src/blog/en/*.md')
  )

  config.addShortcode('baseUrl', () => 'https://nagyfalat.com')

  const markdownIt = require('markdown-it')
  const markdownItAttrs = require('markdown-it-attrs')
  const markdownItSpan = require('markdown-it-bracketed-spans')
  const options = {
    html: true,
    linkify: true,
    typographer: true,
  }
  const markdownLib = markdownIt(options).use(markdownItAttrs).use(markdownItSpan)
  config.setLibrary('md', markdownLib)

  return {
    templateFormats: ['md', 'jpg', 'png', 'gif'],
    dir: {
      input: 'src',
      output: 'dist',
      layouts: 'app/layouts',
    }
  }
}
