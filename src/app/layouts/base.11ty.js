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
        <header>
          <a
            href="${langSwitchUrl}"
            class="absolute top-0 right-0 p-4 text-sm font-semibold"
          >
            ${langSwitchLabel}
          </a>
        </header>
        <div class="flex gap-6 justify-center">
          <nav class="text-right text-sm text-gray-600">
            <ul>
              ${(countries[lang] || []).map(country => `
                <strong>${country || (lang === 'hu' ? 'világ' : 'world')}</strong>
                ${(collections[`${lang}_${country}`] || []).map(post => `
                  <li>
                    <a href="${post.url}">
                      ${post.data.title}
                    </a>
                  </li>
                `).join('') || '<br />'}
              `).join('')}
            </ul>
          </nav>
          <main class="container max-w-2xl my-6 pb-6">
            ${content}
          </main>
        </div>
        <script type="text/javascript">
          (function() {
            if('serviceWorker' in navigator)
              navigator.serviceWorker.register('/sw.js');

            if (typeof localStorage !== 'undefined' && typeof window !== 'undefined')
              localStorage.setItem('nf-lang', window.location.pathname.substr(1, 2))
          })()
        </script>
      </body>
    </html>
  `
}
