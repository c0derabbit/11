const dayjs = require('dayjs')

const locales = {
  hu: {
    back: 'Vissza',
  },
  en: {
    back: 'Back',
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
    <h1>${title}</h1>
    <time>${dayjs(page.date).format()}</time>
    ${content}
  `
}
