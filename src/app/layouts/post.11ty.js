const dayjs = require('dayjs')
const { i18n } = require('../helpers')

exports.data = {
  layout: 'base.11ty.js'
}

exports.render = ({ title, page, content, lang, className = '', location, collections }) => {
  const t = i18n(lang)
  const collection = collections[lang]
  const idx = collection.indexOf(collection.find(post => post.fileSlug === page.fileSlug))
  const prev = idx === 0 ? null : collection[idx - 1]
  const next = idx === collections.length - 1 ? null : collection[idx + 1]

  const lazy = content => content.replace(
    /(<img src=)(\S+)/g,
    (_, __, url) =>
      `<noscript>
         <img src="${url}" alt="My cat" />
       </noscript>
       <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3C/svg%3E"
        data-src=${url} `
  )

  const prevNextLink = post => `
    <a href="${post.url}" class="underline">
      ${post.data.title}
    </a>
  `

  return `
    <article class="${className}">
      <header class="text-center">
        <h1 class="mt-2">${title}</h1>
        <time class="font-mono text-xs tracking-wide">
          ${location ? location + ', ' : ''}
          ${dayjs(page.date).format(t('dateFormat'))}
        </time>
      </header>
      <div class="mt-6">
        ${lazy(content)}
      </div>
    </article>

    <footer class="mt-8 py-8 flex justify-between">
      <div>
        ${prev
          ? `
            <small>${t('previous')}</small><br />
            ${prevNextLink(prev)}
          ` : ''
        }
      </div>
      <div class="text-right">
        ${next
          ? `
            <small>${t('next')}</small><br />
            ${prevNextLink(next)}
          ` : ''
        }
      </div>
    </footer>

    <div
      id="modal"
      class="hidden fixed inset-0 md:p-6 flex justify-center items-center bg-white bg-opacity-75"
    >
      <img
        id="modal-img"
        class="max-h-full md:border-white md:border-40 shadow-lg"
      />
    </div>

    <script src="/lazyload.js"></script>
  `
}
