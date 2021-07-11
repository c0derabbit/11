module.exports = function({
  lang = 'en',
  title = 'Hello, world!',
  content,
  canonicalUrl,
  collections,
}) {
  const [langSwitchUrl, langSwitchLabel] = lang === 'en'
    ? ['/hu', 'magyar <span class="text-base">🇭🇺</span>']
    : ['/en', 'English <span class="text-base">🇬🇧</span>']
  const description = 'A pair going places. We love the Japanese Alps off-season, Chile (also off-season), and parts of Vietnam where “hotel” does not appear in English. And, more recently, some Scottish weather.'
  const safe = country => country || (lang === 'hu' ? 'világ' : 'world')
  const years = require('../helpers/years')
  const categories = require('../helpers/categories')
  const slugify = require('slugify')

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
            <img src="/panda.png" class="mx-auto md:fixed top-0 md:left-0 md:m-3 w-16" />
          </a>
          <a
            href="${langSwitchUrl}"
            class="absolute top-0 right-0 p-4 text-xs font-medium"
          >
            ${langSwitchLabel}
          </a>
          <button
            class="absolute top-0 left-0 p-4 md:hidden"
            onclick="toggleMenu()"
          >
            <img src="/close.svg" alt="" class="menu-icon hidden" />
            <img src="/menu.svg" alt="" class="menu-icon" />
          </button>
        </header>
        <div class="max-w-6xl mx-auto p-4 grid gap-6 grid-cols-1 md:grid-cols-12 md:gap-2">
          <nav id="menu" class="left-nav text-xs text-right md:col-span-3">
            <ul class="sticky text-gray-700" style="top: 25vh">
              ${(categories[lang]).map(category => `
                <span class="font-semibold block mt-4 mb-1 uppercase">
                  ${category}
                </span>
                <div class="post-list text-sm leading-snug">
                  ${(collections[`${lang}_${slugify(category)}`] || []).map(post => `
                    <li>
                      <a class="hover:text-black" href="${post.url}">
                        ${post.data.shortTitle || post.data.title + post.data.location},
                        <span class="text-xs">
                          ${new Date(post.data.date)
                            .toLocaleDateString(lang === 'en' ? 'en-GB' : lang)
                              .replace(/ /g, '')
                              .substr(0, lang === 'hu' ? 10 : undefined)
                          }
                      </a>
                    </li>
                  `).join('') || '<br />'}
                </div>
              `).join('')}
            </ul>
          </nav>
          <main class="min-h-screen md:col-start-5 md:col-span-6">
            ${content}
          </main>
        </div>
        <!-- Fathom - simple website analytics - https://github.com/usefathom/fathom -->
        <script>
        (function(f, a, t, h, o, m){
            a[h]=a[h]||function(){
                (a[h].q=a[h].q||[]).push(arguments)
            };
            o=f.createElement('script'),
            m=f.getElementsByTagName('script')[0];
            o.async=1; o.src=t; o.id='fathom-script';
            m.parentNode.insertBefore(o,m)
        })(document, window, '//stats.eszter.space/tracker.js', 'fathom');
        fathom('set', 'siteId', 'RBNNP');
        fathom('trackPageview');
        </script>
        <!-- / Fathom -->
        <script type="text/javascript">
          (function() {
            if('serviceWorker' in navigator)
              navigator.serviceWorker.register('/sw.js');

            if (typeof localStorage !== 'undefined' && typeof window !== 'undefined')
              localStorage.setItem('nf-lang', window.location.pathname.substr(1, 2));
          })()

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
