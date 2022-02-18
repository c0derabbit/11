const { i18n } = require('../helpers')

module.exports = function({
  lang = 'en',
  title = 'Hello, world!',
  content,
  canonicalUrl,
  collections,
  page,
}) {
  const t = i18n(lang)
  const [langSwitchUrl, langSwitchLabel] = lang === 'en'
    ? ['/hu', 'magyar <span class="text-base">🇭🇺</span>']
    : ['/en', 'English <span class="text-base">🇬🇧</span>']
  const description = 'A pair going places. We love snow, the Japanese Alps off-season, Chile, and parts of Vietnam where “hotel” does not appear in English. And, more recently, some Scottish weather.'
  const categories = require('../helpers/categories')
  const slugify = require('slugify')

  function getColour(category) {
    const country = category.split(', ')[0]
    const colour = (() => {
      switch (country) {
        case 'Scotland':
        case 'Skócia':
          return 'blue'
        case 'Anglia':
        case 'UK':
          return 'indigo'
        case 'Japan':
        case 'Japán':
          return 'red'
        case 'Vietnam':
        case 'Vietnám':
          return 'yellow'
        case 'Hong Kong':
          return 'green'
        case 'Thailand':
        case 'Thaiföld':
          return 'pink'
        case 'Tajvan':
        case 'Taiwan':
          return 'yellow'
        case 'China':
        case 'Kína':
          return 'blue'
          /*
        case 'Európa':
        case 'Europe':
          return 'purple'
          */
        default:
          return 'gray'
      }
    })()

    return colour
  }

  return `
    <!doctype html>
    <html lang="${lang}">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="${description}">
        <meta name="theme-color" content="#fafafa">
        <meta property="og:image" content="/favicon.png">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="apple-touch-icon" href="/favicon.png">
        <link rel="manifest" href="/nf.webmanifest">
        <title>${title}</title>
        <link rel="stylesheet" href="/main.bundle.css" />
        ${canonicalUrl
          ? `<link rel="canonical" href="${this.baseUrl()}${canonicalUrl}" />`
          : ''
        }
      </head>
      <body>
        <header class="text-center">
          <a href="/">
            <img src="/panda.png" class="w-12 md:w-16 mx-auto top-0 mt-2 md:fixed md:left-0 md:m-3" />
          </a>
          <a
            href="${langSwitchUrl}"
            class="absolute top-0 right-0 p-4 text-xs font-medium"
            style="top: 0; right: 0"
          >
            ${langSwitchLabel}
          </a>
          <button
            class="absolute top-0 left-0 p-4 md:hidden"
            style="top: 0; left: 0;"
            onclick="toggleMenu()"
          >
            <img src="/close.svg" alt="" class="menu-icon hidden" />
            <img src="/menu.svg" alt="" class="menu-icon" />
          </button>
        </header>
        <div class="max-w-screen-xl mx-auto p-4 grid gap-6 grid-cols-1 md:grid-cols-12 md:gap-24">
          <nav id="menu" class="left-nav text-xs text-right text-gray-500 md:col-span-3">
            <ul class="sticky" style="top: 20vh">
              ${(categories[lang]).map(category => `
                <span
                  class="
                    font-semibold block mt-3 uppercase cursor-pointer
                    hover:text-${getColour(category)}-700
                    pr-1 border-r-2 border-gray-100
                  "
                  onclick="setCategory('${slugify(category)}')"
                >
                  ${category}
                </span>
                <div
                  id="${slugify(category)}"
                  class="post-list text-sm font-medium border-r-2 border-gray-100 pt-1.5 pr-1 leading-relaxed"
                >
                  ${(collections[`${lang}_${slugify(category)}`] || []).map(post => `
                    <li>
                      <a
                        href="${post.url}"
                        class="${page.url === post.url
                          ? `border-${getColour(category)}-600 border-r-2 pr-1 -mr-1.5 text-${getColour(category)}-700`
                          : `hover:text-${getColour(category)}-700`
                        }"
                      >
                        ${post.data.shortTitle || post.data.location || post.data.title},
                        <span class="text-xs">
                          ${new Date(post.data.date)
                            .toLocaleDateString(lang === 'hu' ? 'hu' : 'en-GB')
                              .replace(/ /g, '')
                              .substr(0, lang === 'hu' ? 10 : undefined)
                          }
                        </span>
                      </a>
                    </li>
                  `).join('') || '<br />'}
                </div>
              `).join('')}
              <a href="/${lang}/${t('aboutLink')}/" class="text-sm block mt-8">
                ${t('aboutText')}
              </a>
            </ul>
          </nav>
          <main class="min-h-screen md:col-span-6">
            ${content}
          </main>
        </div>
        <script type="text/javascript">
          (function() {
            if('serviceWorker' in navigator)
              navigator.serviceWorker.register('/sw.js');

            if (typeof localStorage !== 'undefined' && typeof window !== 'undefined')
              localStorage.setItem('nf-lang', window.location.pathname.substr(1, 2));

            var lists = Array.from(document.getElementsByClassName('post-list'));
            var open = localStorage.getItem('open-category');
            for (var i = 0; i < lists.length; i++) {
              if (lists[i].id !== open) lists[i].classList.add('hidden');
            }
          })()

          function setCategory(category) {
            var open = localStorage.getItem('open-category');
            if (open) {
              var openList = document.getElementById(open);
              if (openList) openList.classList.add('hidden');
              if (open === category) {
                localStorage.removeItem('open-category');
                return;
              }
            }
            localStorage.setItem('open-category', category);
            var list = document.getElementById(category);
            list.classList.remove('hidden');
          }

          var menu = document.getElementById('menu');

          function toggleMenu() {
            var icons = document.getElementsByClassName('menu-icon');

            if (menu.classList.contains('open')) {
              menu.classList.remove('open');
              icons[0].classList.add('hidden');
              icons[1].classList.remove('hidden');
            } else {
              menu.classList.add('open');
              icons[0].classList.remove('hidden');
              icons[1].classList.add('hidden');
            }
          }
        </script>
      </body>
    </html>
  `
}
