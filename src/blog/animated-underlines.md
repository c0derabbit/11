---
layout: post.njk
title:  "Animated link underlines"
date:   2018-09-16
---

Animated link underlines are fairly easy to do, and make any website more alive. Well, they are not really underlines, rather a separate `div` that grows on hover. <a style="white-space: nowrap" class="example animated-link">But how to achieve this?</a>

Underline is no good, and `border-bottom` will not do here either, as its `width` is actually the stroke width of said border.

<style type="text/css">
  .example.animated-link {
    border: none !important;
    background: none;
    text-decoration:none;
    font-weight: 600;
    position: relative;
    cursor: pointer;
  }

  .example.animated-link:hover {
    background: none;
    color: inherit;
  }

  .example.animated-link::after {
    content: '';
    height: 3px;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    background: #28f;
    transition: width .3s ease;
  }

  .example.animated-link:hover::after {
    width: 100%;
    transition: width .4s ease;
  }

  .example.animated-link.example-pink::after {
    background: hotpink;
  }
</style>

### `::after` to the rescue!

The `::after` CSS notation _”creates a pseudo-element that is the last child of the selected element”_[^1]. `::before` behaves in a very similar way, but it is the first child instead of the last, and `::after` is more suitable in our case. We donʼt have to include this in the HTML, Itʼs done by pure CSS!

Letʼs create a simple link, I will add a class to it, but the `<a>` element itself could be styled as well.

```html
<a class="animated-link" href="https://example.com">
  Example link
</a>
```

First, letʼs add relative positioning to the `a`, so that the `::after` pseudo-element knows what to compare its size to (otherwise it would be relative to the next relatively or absolutely positioned parent, which could be `body` itself!) Letʼs also remove any text-decoration, so that the hover effect can be enjoyed in its full glory.

```css
.animated-link {
  position: relative;
  text-decoration: none;
}
```

Now on to the `::after` element itself. It has to have some `content` so that it is displayed, absolute positioning relative to the parent (our `<a>` element in this case), a positive height, which will be the stroke width, a background colour, and `0` width in its non-hovered state. Letʼs add a width transition as well, to make a smooth shrink effect when the mouse leaves the link.

```css
.animated-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: hotpink;
  z-index: -1;
  transition: width .3s ease;
}
```

On hover, we just have to set the width to `100%` (meaning 100% of the `<a>` element) with a nice transition.
```
.animated-link:hover::after {
  width: 100%;
  transition: width .5s ease;
}
```

The result:
<a href="https://example.com" class="example animated-link example-pink">Example link</a>

Thatʼs it, the animated link! The possibilities are endless, it can have a nice highlight effect, or can be a gradient, change stroke width or colour etc. — just keep it low-key and donʼt do these all at once :) Have fun!

---
#### References

[^1]: [::after on MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/::after)

