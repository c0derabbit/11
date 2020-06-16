---
layout: post.njk
title:  "CSS tricks: respecting spacing in hash navigation"
date:   2020-04-28
---

When implementing a hash-based navigation, it’s not trivial to control the actual starting position of headings. This could cause headings to be cut off or hidden below your floating navigation. I’ll show you two ways to fix that.

## But first: what’s the problem?

When using hash navigation, browsers take advantage of the [id attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) to find and jump to elements on the page. This is very useful in long documents, when you’d like to enable visitors to jump to sections further down. So, for instance, you can have a `<h2 id="monstera">`, and upon clicking a link `<a href="#monstera">`, users are taken to the respective section. This works with any kind of HTML element – just make sure `id`s are unique.

But the problem is _where_ exactly it jumps to: right where content starts.

Consider [this example](https://jsfiddle.net/sgwomzv8/2/). As you navigate back and forth between the two sections, the title will be hidden by the floating header. As you can see in the screenshot below, the text inside `h2#monstera` is right at the document’s top, with a lower z-index than the header’s, and it seemingly doesn’t respect the margin. Except, it does — margin is just not part of the content.[^1]

![](https://raw.githubusercontent.com/c0derabbit/eszter.space/master/content/assets/hidden.png)

So, how could we _make_ that space part of the content?

## Simplest solution: change margin to padding

Pretty easy: change your element’s margin to 0, and add some padding. Of course, you can offset the extra padding with a negative margin, in case you want less spacing between sections.

```css
h2 {
  margin: -1em 0 0;
  padding: 1.8em 0 .5em;
}
```

[Here’s the previous demo, updated.](https://jsfiddle.net/sgwomzv8/3/)

## Alternative solution: `::before`

If you don’t want to change padding for some reason, you can use a the [`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/::before) pseudo-element as well. It will insert a node as the first child of our `h2`, and as such, is part of the box. You can control its height as below.

```css
h2 {
  margin-top: -1em;
}

h2::before {
  content: '';
  display: block;
  height: 1.8em;
}
```

[Here’s the demo for this version.](https://jsfiddle.net/sgwomzv8/5/)

---
#### Notes:

[^1]: To understand how this works, I recommend reading about the [box model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model).
