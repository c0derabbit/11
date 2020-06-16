---
layout: post.njk
title:  Building a reading progress bar
date:   2018-09-21
category: css
script: progressbar.js
---

For this post, I will do what I did with [Typing animation with JavaScript](https://eszter.space/blog/typing-animation):
start from zero and experiment my way through the problem, to show it’s not that hard to build impressive animations. A reading progress bar this time.

(It should already be done, look at the colourful bar at the top! But I will explain the whole process below.)

---

What I am trying to achieve is similar to how [Ghost indicates progress](https://demo.ghost.io/welcome/) on their default theme.

My initial hunch is that it has to do with scroll position and the blog post’s height. Quite useful in this case if blog posts sit in their own nice semantic `<article>` elements, so we don’t have to rely on the height of the full `body` and account for the height of whatever is below the blog post itself. Our progress bar should show the exact reading position of the post itself, excluding related articles and tall footers!

## Letʼs do some maths

So we want to project our vertical scroll position onto a horizontal bar ranging from 0 to 100%. 100% means we have reached the end of the blog post, and its bottom edge is in view. Letʼs see what we know, and how can we use it. `element` will be our blog post element.
- `window.innerHeight`: our window size
- `document.body.clientHeight`: the body height
- `window.scrollY`: how many pixels we have scrolled
- `element.offsetTop`: where our blog post starts[^1]
- `element.clientHeight`: the blog post element height

The actual scroll trajectory to measure starts from the bottom of the non-scrolled page (because that is the bottom-most thing we can see without scrolling), and ends at the bottom of the element. The distance between these two points, `(element.clientHeight + element.offsetTop) - window.innerHeight`, is equal to 100% of the scroll distance.

We only need to know how much of this distance we have covered (or, how much we have scrolled so far) to show the actual progress.

## Turning it into code

One thing I have noticed is that in order to measure progress accurately, we should wait for all the elements to be loaded, so we will do everything on load. Once this is done, we just need a fixed `div` that sits at the top edge of our window and has a bright background. It should start with 0% width, which we will update as we scroll.

```html
<div id="progress-bar"></div>
```

```css
#progress-bar {
  width: 0%;
  position: fixed;
  top: 0;
  left: 0;
  height: 6px;
  background: linear-gradient(to right, #ecd2fe, #feaaaa);
}
```

```js
window.onload = () => {
  const post = document.getElementsByTagName('article')[0];
  const progressBar = document.getElementById('progress-bar');
  const distance = (post.clientHeight + post.offsetTop) - window.innerHeight;

  window.addEventListener('scroll', () => {
    const progress = window.scrollY / distance * 100;
    progressBar.style.width = `${progress}%`;
  });
}
```

This is the actual code I am using for this page. Feel free to replicate and modify! :)

<div id="progress-bar"></div>

<style>
  #progress-bar {
    width: 0%;
    position: fixed;
    top: 0;
    left: 0;
    height: 6px;
    background: linear-gradient(to right, #ecd2fe, #feaaaa);
  }
</style>

---
#### References

[^1]: Careful though, this is calculated relative to the _closest relatively positioned parent element_ — see [HTMLElement.offsetTop on MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop)
