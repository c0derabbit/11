const dayjs = require('dayjs')
const { i18n } = require('../helpers')

exports.data = {
  layout: 'base.11ty.js'
}

exports.render = ({ title, page, content, lang }) => {
  const t = i18n(lang)

  const lazy = content => {
    const [first, ...rest] = content.split('<img')
    const replaced = rest && rest.join('<img').replace(/<img src/g, '<img data-src')

    return [first, '<img', replaced].join('')
  }

  return `
    <a href="/${lang}">${t('back')}</a>
    <article>
      <h1>${title}</h1>
      <time>${dayjs(page.date).format(t('dateFormat'))}</time>
      ${lazy(content)}
    </article>
    <script>
      (function() {
        var images = Array.from(document.querySelectorAll('img'))

        if ('IntersectionObserver' in window) {
          var observer = new IntersectionObserver(lazyload, {})
          for (var i = 1; i < images.length; i++) {
            var image = images[i]
            image.setAttribute('style', 'opacity: 0; transition: opacity .5s ease')
            observer.observe(image)
          }
        } else {
          for (var i = 1; i < images.length; i++) {
            var image = images[i]
            image.setAttribute('src', image.dataset.src)
          }
        }

        function lazyload(entries, observer) {
          for (var i = 1; i < entries.length; i++) {
            var entry = entries[i]
            if (entry.isIntersecting) {
              var target = entry.target
              var src = target.dataset.src

              var loader = new Image()
              loader.onload = function() {
                target.style.opacity = 1
              }
              loader.src = src
              target.setAttribute('src', src)

              observer.unobserve(target)
            }
          }
        }
      })()
    </script>
  `
}
