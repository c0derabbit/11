---
layout: post
title: "Friendly UIs: Let users copy with a click"
date: 2019-07-28
---
There’s lots of subtle but very convenient features on GitHub’s UI, one of them is being able to copy stuff from an action menu. Let’s see how we can replicate that behaviour.

## When is this useful?

One really good use case is GitHub’s links to specific lines in files — generally places where it’s just not feasible to show all of them. (Imagine how littered it would look!)

It’s also a nice touch when you have something long to copy, and it’s not really convenient to select manually. Think product codes, long links with tokens or url params, and so forth.

## Using the [Document API](https://developer.mozilla.org/en-US/docs/Web/API/Document)

`document` has much more to offer than `appendChild` and `getElementById`, just look at this looooong list, fresh from the console:

![ ](/img/document-api.gif)

Some of them are familiar, but this time we’ll use one that’s a bit more obscure: [`document.execCommand`](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand). It can manipulate editable elements (such as `input` and anything with the attribute `contentEditable`). `execCommand` takes at least one argument: the name of the command we’d like the browser to execute.

You can try `document.execCommand('otters')` of course (I have), it will simply return `false`.

## Let’s write some code!

As mentioned, `execCommand` needs an editable element. This is because only editable elements can be selected programmatically. Let’s try with an `input`.

```html
<input
  id="some_id"
  value="This will be on your clipboard, chicken and all 🐓"
  onclick="copyToClipboard()"
/>
```

To copy this text, an editable element must be selected. This can be done by:

1. finding the element: `const element = document.getElementById('my-copiable-element')`
2. selecting it: `element.select()`

```js
function copyToClipboard() {
  const input = document.getElementById('some_id');
  input.select();
	document.execCommand('copy');
}
```

There, it should work already!

## But this is not really nice yet.

To use this in production, this little snippet should meet a few more requirements:

* scalable (maybe we have a thousand elements, all copiable)
* pretty.

### Scalability

We’ll just make sure we can pass any `id` to `copyToClipboard`, like so:

```js
function copyToClipboard(id) {
	const input = document.getElementById(id);
	input.select();
	document.execCommand('copy');
}
```

<del>Done.</del> We’ll have to change this function after the next bit, so hang tight.

### Looks

We *could* style the `<input>`, but that’s not what we’ll do. There’s a much more elegant solution, using any HTML element of choice plus a hidden `<input>`[^1]. Because `id`s should be unique, we’ll make use of [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes).

This would almost work, but hidden elements are not selectable. So we will use a `.hidden` class instead, only to visually hide the element.

This now is our final code:

```html
<div
  role="button"
  class="copy-trigger"
  data-copyid="my_uniq_id"
  onclick="copyToClipboard"
>
  Copy text
</div>
<input
  class="hidden-copy-input"
  id="my_uniq_id"
  value="This will be on your clipboard, chicken and all 🐓"
/>
```

```css
.hidden-copy-input {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
}
```

```js
const copyButtons = document.getElementsByClassName('copy-trigger');
copyButtons.forEach(btn => btn.addEventListener('click', copyToClipboard);

function copyToClipboard(e) {
  const id = e.target && e.target.dataset && e.target.dataset.copyid;
  const input = document.getElementById(id);
  input.select();
  document.execCommand('copy');
}
```

That’s it! If you want to be extra fancy, you can now show a message that it’s been copied. Questions? Just copy my email address from the sidebar and ask! :)

- - -

#### Notes

[^1]: `<input type="hidden" ...>` can be used to pass values in a form that we don’t want to display. However, they are by no means a secret!
