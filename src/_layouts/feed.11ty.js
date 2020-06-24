const dayjs = require('dayjs')

const locales = {
  hu: {
    back: 'Vissza',
    dateFormat: 'YYYY.MM.DD',
  },
  en: {
    back: 'Back',
    dateFormat: 'MMMM D, YYYY',
  },
}

const i18n = lang => locales[lang] || locales['en']

const excerpt = content => {
  const images = /<img[^>]+>/g
  const videos = /<video[^>]+>[^<]+<\/video>/g
  const formatting = /<\/?(strong|em)>/g
  const firstParagraphEnd = /<\/p>/

  const firstParagraph = content
    .split(firstParagraphEnd)
    [0]
    .replace(images, '')
    .replace(videos, '')
    .replace(formatting, '')
    .split(' ').slice(0, 20).join(' ')

  const ellipsis = /[\w,]$/.test(firstParagraph) ? '…' : ''

  return firstParagraph + ellipsis + '</p>'
}

exports.data = {
  layout: 'base.11ty.js',
}

exports.render = ({ lang, collections }) => {
  const t = str => i18n(lang)[str]
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
      ${postsReversed.map(({ data: { title, page: { date, url }, content, description }}) => `
        <li class="mb-8">
          <a href="${url}">
            <time class="italic text-sm text-gray-600">
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
