const dayjs = require('dayjs')
const { i18n } = require('../helpers')

exports.data = {
  layout: 'base.11ty.js'
}

exports.render = ({ title, page, content, lang }) => {
  const t = i18n(lang)

  return `
    <a href="/${lang}">${t('back')}</a>
    <article>
      <h1>${title}</h1>
      <time>${dayjs(page.date).format(t('dateFormat'))}</time>
      ${content}
    </article>
  `
}
