const dict = {
  hu: {
    back: 'Vissza',
    next: 'Következő',
    previous: 'Előző',
    responsibilitySlug: 'felelosseg',
    supportedOrg: 'Támogatott szervezet',
    donation: 'Összeg',
    whatsThis: 'Mi ez?',
    dateFormat: 'YYYY.MM.DD',
  },
  en: {
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    responsibilitySlug: 'responsibility',
    supportedOrg: 'Supported organisation',
    donation: 'Donation',
    whatsThis: 'Whatʼs this?',
    dateFormat: 'MMMM D, YYYY',
  }
}

const i18n = lang => {
  const translations = dict[lang] || dict.en

  return str => translations[str] || str
}

module.exports = i18n
