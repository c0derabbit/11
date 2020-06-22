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

exports.render = ({ title, page, content, lang }) => {
  const t = str => i18n(lang)[str];

  return `
    <a href="/${lang}">${t('back')}</a>
    <article>
      <h1>${title}</h1>
      <time>${dayjs(page.date).format(t('dateFormat'))}</time>
      ${content}
    </article>
  `
}
