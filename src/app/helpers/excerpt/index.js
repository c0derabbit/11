module.exports = content => {
  const images = /<img[^>]+>/g
  const videos = /<video[^>]+>([^<]+)?<\/video>/g
  const formatting = /<\/?(strong|em)>/g
  const firstParagraphEnd = /<\/p>/

  const firstParagraph = content
    .split(firstParagraphEnd)[0]
    .replace(images, '')
    .replace(videos, '')
    .replace(formatting, '')
    .split(' ').slice(0, 20).join(' ')

  const ellipsis = /[\w,]$/.test(firstParagraph) ? '…' : ''

  return firstParagraph + ellipsis + '</p>'
}
