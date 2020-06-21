module.exports = function(config) {
  config.addCollection('postsHu', collectionApi =>
    collectionApi.getFilteredByGlob('src/blog/hu/*.md')
  )
  config.addCollection('postsEn', collectionApi =>
    collectionApi.getFilteredByGlob('src/blog/en/*.md')
  )

  return {
    templateFormats: ['md', 'css', 'jpg', 'png'],
    dir: {
      input: 'src',
      output: 'dist',
      layouts: '_layouts',
    }
  }
}
