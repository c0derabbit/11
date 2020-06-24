module.exports = function ({
  lang = 'en',
  title = 'Hello, world!',
  content,
  canonicalUrl,
}) {
  const [langSwitchUrl, langSwitchLabel] = lang === 'en'
    ? ['/hu', 'magyar']
    : ['/en', 'English']

  return `
    <!doctype html>
    <html lang="${lang}">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        <main class="container mx-auto my-6 max-w-2xl">
          ${content}
        </main>
        <script type="text/javascript">
          (function() {
            if (typeof localStorage !== 'undefined' && typeof window !== 'undefined')
              localStorage.setItem('nf-lang', window.location.pathname.substr(1, 2))
          })()
        </script>
      </body>
    </html>
  `
}
