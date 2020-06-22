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

exports.data = {
  layout: 'base.11ty.js',
}

exports.render = ({ lang, collections }) => {
  const t = str => i18n(lang)[str]
  const { postsHu, postsEn } = collections
  const posts = lang === 'hu' ? postsHu : postsEn
  const postsReversed = [...posts].reverse()

  return `
    <ul>
      ${postsReversed.map(({ data: { title, page: { date, url }, content }}) => `
        <li class="mb-8">
          <a href="${url}">
            <time class="italic text-sm text-gray-600">
              ${dayjs(date).format(t('dateFormat'))}
            </time>
            <h2 class="my-1 text-xl font-bold">${title}</h2>
          </a>
        </li>
      `).join('')}
    </ul>
  `
}
