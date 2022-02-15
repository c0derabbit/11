const dayjs = require('dayjs')
const { i18n } = require('../helpers')

exports.data = {
  layout: 'base.11ty.js'
}

exports.render = ({
  title,
  page,
  content,
  lang,
  className = '',
  supportedOrg,
  supportedOrgLink,
  supportedOrgDescription,
  donation,
  location,
  collections,
  icon
}) => {
  const t = i18n(lang)
  const collection = collections[lang]
  const idx = collection.indexOf(collection.find(post => post.fileSlug === page.fileSlug))
  const prev = idx === 0 ? null : collection[idx - 1]
  const next = idx === collections.length - 1 ? null : collection[idx + 1]

  const lazy = content => content.replace(
    /(<img src=)(\S+)/g,
    (_, __, url) =>
      `<noscript>
         <img src="${url}" alt="" />
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
    <article class="${className} md:pt-12">
      <header class="text-center">
        ${icon ? `<img src="/icons/${icon}.png" alt="" class="hidden md:block icon w-16 px-1 mx-auto mb-4" />` : ''}
        <h1 class="mt-2 font-title font-medium">${title}</h1>
        <time class="font-mono text-xs tracking-wide">
          ${location ? location + ', ' : ''}
          ${dayjs(page.date).format(t('dateFormat'))}
        </time>
      </header>
      <div class="mt-6">
        ${supportedOrg ? `
          <div class="text-sm bg-gray-100 text-gray-700 p-4 mb-6 relative">
            <strong>${t('supportedOrg')}:</strong> <a href="${supportedOrgLink}" target="_blank" rel="noopener noreferrer">${supportedOrg}</a><br />
            <strong>${t('donation')}:</strong> ${donation}<br />
            <span class="block mt-2">
              ${supportedOrgDescription}
            </span>
            <sup class="absolute px-2 py-3" style="top: 0; right: 0;">
              <a href="/${lang}/${t('responsibilitySlug')}" class="border-gray-600">
                ${t('whatsThis')}
              </a>
            </sup>
          </div>
        ` : ''}
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
      class="opacity-0 transition-opacity duration-300 pointer-events-none fixed md:p-6 flex justify-center items-center bg-gray-800 bg-opacity-75"
      style="top: 0; left: 0; bottom: 0; right: 0;"
    >
      <img
        id="modal-img"
        class="max-h-full md:border-white md:border-40 shadow-lg"
      />
    </div>

    <script src="/lazyload.js"></script>
  `
}
