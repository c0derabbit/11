const dayjs = require('dayjs')
const { i18n } = require('../helpers')

exports.data = {
  layout: 'base.11ty.js'
}

exports.render = ({ title, page, content, lang }) => {
  const t = i18n(lang)

  const lazy = content => content.replace(
    /(<img src=)(\S+)/g,
    (_, __, url) =>
      `<noscript>
         <img src="${url}" alt="My cat" />
       </noscript>
       <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3C/svg%3E"
        data-src=${url} `
  )

  return `
    <a href="/${lang}">${t('back')}</a>
    <article>
      <h1>${title}</h1>
      <time>${dayjs(page.date).format(t('dateFormat'))}</time>
      ${lazy(content)}
    </article>
    <script src="/lazyload.js"></script>
  `
}
