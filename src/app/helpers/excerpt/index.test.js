const excerpt = require('.')

describe('Excerpt', () => {
  const helloWorldString = '<p>Hello world!</p>'

  it('returns a simple short sentence unchanged', () => {
    expect(excerpt('<p>Hello world!</p>'))
      .toBe(helloWorldString)
  })

  it('takes first paragraph, drops the rest', () => {
    expect(excerpt('<p>Hello world!</p><p>I have a second paragraph.</p>'))
      .toBe(helloWorldString)
  })

  it('puts ellipsis and ends paragraph if cut off mid-sentence', () => {
    expect(excerpt('<p>Hello'))
      .toBe('<p>Hello…</p>')
  })

  it('truncates content to 20 words', () => {
    expect(excerpt('<p>1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22</p>'))
      .toBe('<p>1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20…</p>')
  })

  it('removes images', () => {
    expect(excerpt('<p><img src="https://foo.com/test.png">Hello <img src="bar" />world!</p>'))
      .toBe(helloWorldString)
  })

  it('removes videos', () => {
    expect(excerpt('<p><video src="/foo.mov" poster="blah.jpg"></video>Hello world!</p>'))
      .toBe(helloWorldString)
  })

  it('clears formatting', () => {
    expect(excerpt('<p><strong>Hello</strong> <em>world!</em></p>'))
      .toBe(helloWorldString)
  })

  it('leaves links alone', () => {
    const withLink = '<p>I have a <a href="#">link</a>!</p>'
    expect(excerpt(withLink)).toBe(withLink)
  })
})
