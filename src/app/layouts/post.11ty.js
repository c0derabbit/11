const dayjs = require('dayjs')
const { i18n } = require('../helpers')

exports.data = {
  layout: 'base.11ty.js'
}

exports.render = ({ title, page, content, lang }) => {
  const t = i18n(lang)

  const lazy = content => content.replace(
    /(?<=<img[\s\S]+)(<img src)/g,
    `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3C/svg%3E" data-src`
  )

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
          images[0].style.opacity = 1
          for (var i = 1; i < images.length; i++) {
            observer.observe(images[i])
          }
        } else {
          for (var i = 1; i < images.length; i++) {
            var image = images[i]
            image.setAttribute('src', image.dataset.src)
            image.style.opacity = 1
          }
        }

        function lazyload(entries, observer) {
          for (var i = 0; i < entries.length; i++) {
            var entry = entries[i]

            if (entry.isIntersecting) {
              var target = entry.target
              var src = target.dataset.src

              var loader = new Image()
              loader.onload = function() {
                target.setAttribute('src', src)
                target.style.opacity = 1
              }
              loader.src = src
            }
          }
        }
      })()
    </script>
  `
}
