const dayjs = require('dayjs')
const { excerpt, i18n } = require('../helpers')

exports.data = {
  layout: 'base.11ty.js',
}

exports.render = ({ lang, pagination = {} }) => {
  const t = i18n(lang)
  const { items = [], hrefs = [], previousPageHref, nextPageHref, pageNumber } = pagination;

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
            <time class="text-xs font-mono tracking-wide">
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
    <div class="text-center">
      ${previousPageHref ? `<a href="${previousPageHref}" class="mr-3">${t('previous')}</a>` : ''}
      ${hrefs.map((link, idx) => `
        <a href="${link}" class="mx-2 ${pageNumber === idx ? ' font-bold' : ''}">
          ${idx + 1}
        </a>
      `).join('')}
      ${nextPageHref ? `<a href="${nextPageHref}" class="ml-3">${t('next')}</a>` : ''}
    </div>
  `
}
