const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection('posts', collectionApi =>
    collectionApi.getFilteredByGlob('src/blog/*.md')
  )

  eleventyConfig.addPlugin(syntaxHighlight)

  return {
    templateFormats: ['md', 'css', 'jpg', 'png'],
    dir: {
      input: 'src',
      output: 'dist',
    }
  }
}
