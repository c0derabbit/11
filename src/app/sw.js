const fs = require('fs')

module.exports = () => {
  const outputDir = 'dist'

  try {
    const files = fs.readdirSync(outputDir)
    console.log('got files', files)
  } catch (error) {
    console.error(error.message)
  }
}
