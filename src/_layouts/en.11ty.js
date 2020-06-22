const dayjs = require('dayjs')
exports.data = {
  layout: 'post.11ty.js',
  lang: 'hu',
}

exports.render = ({ title, page, content }) => `
  <h1>${title}</h1>
  <time>${dayjs(page.date).format()}</time>
  ${content}
`
