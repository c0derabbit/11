module.exports = function({
  lang = 'en',
  title = 'Hello, world!',
  content,
  canonicalUrl,
  collections,
}) {
  const posts = collections[lang]
  const countries = require('../helpers/countries')
  const [langSwitchUrl, langSwitchLabel] = lang === 'en'
    ? ['/hu', 'magyar']
    : ['/en', 'English']
  const description = 'A pair going places. We love the Japanese Alps off-season, Chile (also off-season), and parts of Vietnam where “hotel” does not appear in English. And, more recently, some Scottish weather.'
  const safe = country => country || (lang === 'hu' ? 'világ' : 'world')

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
          <img src="/panda.png" class="my-2 mx-auto" />
          <a
            href="${langSwitchUrl}"
            class="absolute top-0 right-0 p-4 text-sm font-semibold"
          >
            ${langSwitchLabel}
          </a>
        </header>
        <div class="max-w-6xl mx-auto p-4 grid gap-8 grid-cols-1 md:grid-cols-12">
          <nav class="hidden md:block text-sm text-gray-600 md:col-span-2">
            <ul class="sticky italic" style="top: 25vh">
              ${(countries[lang] || []).map(country => `
                <strong class="block mt-1 cursor-pointer" onclick="setCountry('${safe(country)}')">
                  ${safe(country)}
                </strong>
                <div id="${safe(country)}" class="post-list leading-tight pl-4">
                  ${(collections[`${lang}_${safe(country)}`] || []).map(post => `
                    <li class="mb-1">
                      <a class="hover:text-gray-900 transition duration-300" href="${post.url}">
                        ${post.data.title}
                      </a>
                    </li>
                  `).join('') || '<br />'}
                </div>
              `).join('')}
            </ul>
          </nav>
          <main class="md:col-start-4 md:col-span-6">
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
            var open = localStorage.getItem('open-country');
            for (var i = 0; i < lists.length; i++) {
              if (lists[i].id !== open) lists[i].classList.add('hidden');
            }
          })()

          function setCountry(country) {
            var open = localStorage.getItem('open-country');
            if (open) {
              var openList = document.getElementById(open);
              if (openList) openList.classList.add('hidden');

              if (open === country) {
                localStorage.removeItem('open-country');
                return;
              }
            }
            localStorage.setItem('open-country', country);
            var list = document.getElementById(country);
            list.classList.remove('hidden');
          }
        </script>
      </body>
    </html>
  `
}
