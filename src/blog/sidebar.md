---
layout: post.njk
title:  "Flexbox with fixed sidebar"
date:   2018-05-02
---

I love [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox). It’s… flexible. Today, developers have to think about almost as many resolutions as devices. Things have to shrink (and grow!), fit, and not cover anything else. In some cases, they have to reorder themselves (more on that in a future blog post). Flexbox can do all this. One caveat though — it does not work well with absolute or fixed positioning.

**So how do we keep a sidebar in place?**

## HTML structure
Our very simple website will contain a sidebar and a `<main>` part. These will be wrapped in a common parent, which has `display: flex` property. Something like this (fill `main` with lots of paragraphs —  try [Space Ipsum](http://spaceipsum.com) or [Fillerama](http://fillerama.io)).

#### HTML
```html
<div class="wrapper">
  <nav class="sidebar">Links...</nav>
  <main>Fill with lots of text</main>
</div>
```

#### CSS
```css
.wrapper {
  display: flex;
}
```
Blocks have an `overflow` property. They also have `width` and `height`, and with these properties, we can easily tame that sidebar.

## Fixing the sidebar
First, our sidebar should not be taller than the screen. But how tall is the screen? It’s exactly `100vh`. Now that we are at it, let’s fix `box-sizing` for _every element_ too, in case there are any paddings or borders[^1].

```css
* {
  box-sizing: border-box;
}

.sidebar {
  height: 100vh;
}
```

## Scrolling the content
At this point, our sidebar will be as tall as the screen — but our page height is defined by the length of its content. In other words, `.wrapper` will be as tall as `main`, and if we have lots of paragraphs, we will scroll past the sidebar quickly.
Overflow to the rescue! Let’s make this `main` no taller than the screen, and scroll if it has more content:
```css
main {
  height: 100vh;
  overflow: scroll;
}
```

That’s it! [Here’s a working example.](https://jsfiddle.net/rgvpn1zr/1/)

---
#### References
[^1]: see [box-sizing on MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)

