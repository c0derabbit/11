const dayjs = require('dayjs')

module.exports = ({ title, page }) => `
  <h1>${title}</h1>
  <time>${dayjs(page.date).format()}</time>
`
