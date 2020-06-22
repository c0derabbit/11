module.exports = ({ lang = 'en', title = 'Hello, world!', content }) => {
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
      </body>
    </html>
  `
}
