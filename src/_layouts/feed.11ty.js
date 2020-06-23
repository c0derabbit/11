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
  const first20words = content
    .replace(images, '')
    .replace(videos, '')
    .split(' ').slice(0, 20).join(' ')

  if (/[\w,]$/.test(first20words))
    return first20words + '…'

  return first20words
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
    <ul>
      ${postsReversed.map(({ data: { title, page: { date, url }, content, description }}) => `
        <li class="mb-8">
          <a href="${url}">
            <time class="italic text-sm text-gray-600">
              ${dayjs(date).format(t('dateFormat'))}
            </time>
            <h2 class="my-1 text-xl font-bold">${title}</h2>
            ${description || excerpt(content)}
          </a>
        </li>
      `).join('')}
    </ul>
  `
}
