module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection('posts', collectionApi =>
    collectionApi.getFilteredByGlob('src/blog/*.md')
  )

  return {
    dir: {
      input: 'src',
      output: 'dist',
    }
  }
}
