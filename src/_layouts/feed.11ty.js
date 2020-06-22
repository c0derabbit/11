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
  const t = str => i18n(lang)[str];
  const { postsHu, postsEn } = collections;
  const posts = lang === 'hu' ? postsHu : postsEn;

  return `
    <div>
      ${posts.map(({ data }) => data.title)}
    </div>
  `
}
