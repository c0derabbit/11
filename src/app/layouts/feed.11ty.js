const dayjs = require('dayjs')
const { excerpt, i18n } = require('../helpers')

exports.data = {
  layout: 'base.11ty.js'
}

exports.render = ({ lang, collections }) => {
  const t = i18n(lang)
  const { postsHu, postsEn } = collections
  const posts = lang === 'hu' ? postsHu : postsEn
  const postsReversed = [...posts].reverse()

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
      ${postsReversed.map(({ data: { title, page: { date, url }, content, description } }) => `
        <li class="mb-8">
          <a href="${url}">
            <time class="italic text-sm text-gray-700">
              ${dayjs(date).format(t('dateFormat'))}
            </time>
            <h2 class="my-1 text-xl font-bold">${title}</h2>
            ${description
              ? `<p>${description}</p>`
              : excerpt(content)
            }
          </a>
        </li>
      `).join('')}
    </ul>
  `
}
