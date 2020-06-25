const i18n = require('.')

describe('i18n', () => {
  it('translates strings', () => {
    const tHu = i18n('hu')
    const tEn = i18n('en')

    expect(tHu('back')).toBe('Vissza')
    expect(tEn('back')).toBe('Back')
  })

  it('returns EN translations for non-existent language', () => {
    const t = i18n('wtf')

    expect(t('back')).toBe('Back')
  })

  it('returns sequence of keys for non-existent translation', () => {
    const t = i18n('en')

    expect(t('foo.bar')).toBe('foo.bar')
  })
})
