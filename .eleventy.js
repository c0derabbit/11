const { generateSW } = require('workbox-build')

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

  return {
    templateFormats: ['md', 'jpg', 'png', 'gif'],
    dir: {
      input: 'src',
      output: 'dist',
      layouts: 'app/layouts',
    }
  }
}
