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
    <ul class="feed lg:pt-8">
      ${items.map(({ data: { title, page: { date, url }, description, cover }, templateContent }) => `
        <li class="block relative mb-8 hover:text-blue-900 ${cover ? 'lg:-mx-8' : ''}">
          <a href="${url}">
            ${cover ? `
              <div class="overflow-hidden my-2 lg:mb-6 lg:mt-12 bg-gray-200" style="aspect-ratio: 1.7">
                <img src="${cover}" alt="" />
              </div>
            ` : ''}
            <div class="${cover ? 'lg:px-8' : ''}">
              <time class="block text-xs tracking-wide">
                ${dayjs(date).format(t('dateFormat'))}
              </time>
              <h2 class="py-1 my-0 text-xl ${cover ? 'lg:text-3xl' : ''} font-title font-normal">
                ${title}
              </h2>
              <div class="${cover ? 'pb-2 lg:text-xl' : ''}">
                ${description
                  ? `<p>${description}</p>`
                  : excerpt(templateContent)
                }
              </div>
            </div>
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
