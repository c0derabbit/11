---
layout: post.njk
title: console.log('colours!')
date: 2018-10-09
script: console.js
---
Ever seen those styled `console.log`s when opening the dev console on some random website? Cool, right? Calls to `console.log` (and `.warn`, `.info` etc.) can be styled with inline CSS, but itʼs not really well documented, so letʼs experiment with it a little.

## I have no idea what you are talking about (or: some examples)

Open the console on [Protonmail](https://protonmail.com/login) or [zeit.co](https://zeit.co) to see a nice message, or check Google[^1] and Facebook for warning messages for non-developers. Displaying a `console.info` (which I find better than `log` for this purpose) can be very useful to attract developers, and warn everyone else that this is not the place to tinker unless they know what they are doing.

- - -

Thereʼs not much on the official console spec[^2], so we have to experiment a bit. I will use `console.log` for the sake of simplicity, but this should work with all of the printing `console` methods.

## Basic text styling

The basic syntax is putting `%c` (letʼs say C for CSS) before the string, so the console knows it has to interpret the next input as styling.

```js
console.log('%cKittens everywhere!', 'color: pink');
```

Which results in something like this:

![](/img/console1.png)

Of course, we can specify some more styles, but the text will always behave like an `inline` element (so it canʼt have height etc.)

```js
console.log(
  '%cFancy log',
  'font-family: Georgia; font-size: 18px; text-shadow: 1px 2px 4px #ddd'
);
```

Looking like this:

![](/img/console3.png)

## Multiple styles

We can change styles within one call to `log` too (like Protonmail does), by adding `%c` wherever we want to change style, and defining a style (which can be an empty string) for each of them, like so:

```js
console.log(
  '%cPink%c, %cred %cand %cblue',
  'color: pink',
  '',
  'color: red',
  '',
  'color: blue'
);
```

Looking like this, the empty styles printed in black:

![](/img/console2.png)

## Going wild: images

This is a bit hacky, but possible. Text printed on the console can have a `background` property, which — you guessed it — can be an image! So I can do this (the `font-size` is important here, as it will define the image height):

```js
console.log(
  '%c        ',
  'font-size: 60px; background: url(https://placekitten.com/60/60) no-repeat;'
);
```

There, a cat in the console.

![](/img/console4.png)

## Going really, really wild (maybe don't do this in production)

Open the console to see if it works with gifs.[^3]

Thatʼs all for today, remember to check your console for error messages[^4] (most importantly in production), and say hi to fellow developers.

- - -

#### References

[^1]: By the way, google "text adventure" and check the console for a full-blown easter egg game, complete with console styling. [^2]: [Formatting specifiers — Console standard on WHATWG](https://console.spec.whatwg.org/#formatting-specifiers) [^3]: Not in Firefox. [^4]: Ah, another hack: `console.error = function() {};` suppresses all error messages.
