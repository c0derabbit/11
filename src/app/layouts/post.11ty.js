const dayjs = require('dayjs')
const { i18n } = require('../helpers')

exports.data = {
  layout: 'base.11ty.js'
}

exports.render = ({ title, page, content, lang, className = '' }) => {
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
    <article class="${className}">
      <header class="text-center">
        <h1 class="tracking-widest">${title}</h1>
        <time class="text-gray-600 font-mono text-sm">
          ${dayjs(page.date).format(t('dateFormat'))}
        </time>
      </header>
      <div class="mt-10">
        ${lazy(content)}
      </div>
    </article>
    <script src="/lazyload.js"></script>
  `
}
