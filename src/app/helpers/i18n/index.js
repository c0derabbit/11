const dict = {
  hu: {
    back: 'Vissza',
    next: 'Következő',
    previous: 'Előző',
    dateFormat: 'YYYY.MM.DD'
  },
  en: {
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    dateFormat: 'MMMM D, YYYY'
  }
}

const i18n = lang => {
  const translations = dict[lang] || dict.en

  return str => translations[str] || str
}

module.exports = i18n
