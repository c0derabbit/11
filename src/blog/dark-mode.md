---
layout: post
title:  Supporting dark mode on the web
date:   2019-11-17
---

Dark mode is here to stay, and many websites, including [DuckDuckGo](https://duckduckgo.com/), Twitter and my personal favourite Gatsby, make sure they blend in seamlessly with the user’s UI preferences.

Some have offered their own dark mode before this could have been picked up fron the OS settings (for example, [CryptoCompare](https://www.cryptocompare.com/) has a 'Turn Lights On/Off' switch in their footer).[^1]

But now, [there’s a media query for that](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-color-scheme).

```css
@media (prefers-color-scheme: dark) {
  background: #222;
  color: #f0f0f0;
}
```

### What if I want to use this with [styled-components themes](https://www.styled-components.com/docs/advanced#theming)?

JavaScript can detect media queries with [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).

```js
window.matchMedia('(prefers-color-scheme: dark)')
```

will return something like this:
```js
MediaQueryList {
  media: "(prefers-color-scheme: dark)",
  matches: true, // or false :)
  onchange: null
}
```

So, we can set our styled-components theme based on whether there’s a match.

If I did that right (and you have a modern-enough browser), my website should be matching your system preferences![^2]

---
#### Notes

[^1]: I used to have one too, but one has to keep up with the changing times!

[^2]: Ps. you can still switch between light & dark manually, and that will be remembered in `localStorage`.
