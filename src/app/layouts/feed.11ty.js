const dayjs = require('dayjs')
const { excerpt, i18n } = require('../helpers')

exports.data = {
  layout: 'base.11ty.js',
}

exports.render = ({ lang, pagination = { items: [] } }) => {
  const t = i18n(lang)
  const { items, pageLinks, previousPageHref, nextPageHref } = pagination;

  return `
    <script type="text/javascript">
      (function() {
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
          var lang = localStorage.getItem('nf-lang')
          if (!lang || lang !== 'hu') lang = 'en'

          window.location.replace('/' + lang + '/')
        }
      })()
    </script>
    <ul class="feed">
      ${items.map(({ data: { title, page: { date, url }, description }, templateContent }) => `
        <li class="mb-8">
          <a href="${url}">
            <time class="italic text-sm text-gray-700">
              ${dayjs(date).format(t('dateFormat'))}
            </time>
            <h2 class="my-1 text-xl font-bold">${title}</h2>
            ${description
              ? `<p>${description}</p>`
              : excerpt(templateContent)
            }
          </a>
        </li>
      `).join('')}
    </ul>
    <a href="${previousPageHref}">${t('previous')}</a>
    <a href="${nextPageHref}">${t('next')}</a>
  `
}
