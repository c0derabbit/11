---
layout: post.njk
title:  "Typing animation with JavaScript"
date:   2018-06-16
script: typing.js
---

Let’s imagine I’d like to show a one-line introduction on my website, but can’t decide what to say about myself. So I’d like to rotate between the phrases *I’m a web developer*, *I like coffee*, and *I write about stuff I'm no expert in*. I could grab the code from the internet, but I’d like to challenge myself today and come up with a solution on my own — which is also a good way to prove it’s not hard at all!

Let us begin.

<style type="text/css">
  .example {
    border: 1px dotted #ff7;
    padding: 6px;
    height: 30px;
    line-height: 30px;
  }

  .blink {
    animation: blink 1.08s linear infinite alternate;
  }

  @keyframes blink {
    from {opacity: 1;}
    20% {opacity: 1;}
    28% {opacity: 0;}
    72% {opacity: 0;}
    80% {opacity: 1;}
    to {opacity: 1;}
  }
</style>

### Part one: rotating phrases

First, we need a default phrase, so that it works for people who have JavaScript off.

##### HTML
```html
<p id="type">I'm a web developer</p>
```

Now, we will need JS to replace this nice phrase with the others. I will start by simply alternating the phrases with a `setInterval` function.


##### JS
```javascript
const typeElement = document.getElementById('type');

const phrases = [
	"I'm a web developer",
	"I like coffee",
	"I write about stuff I'm no expert in",
	"But then everyone else does so I guess that's ok",
];

let currentIdx = 0;

window.setInterval(() => {
  currentIdx++;
  if (currentIdx > 3) {currentIdx = 0;}
  typeElement.innerText = phrases[currentIdx];
}, 2400);
```

#### This is what we have so far:
<p id="type1" class="example">
  I'm a web developer
</p>

### Part two: typing

Let's start off with a full sentence, in case someone has JS turned off, delete from there, and start typing again when we have nothing left.

##### HTML
```html
<p id="sentence" class="example">Type this.</p>
```

Next, we will need to handle two directions: deleting or typing text. Once we know which way we are going, and where our cursor is (which we decide based on its previous position and the direction), we know how much text to show.

##### JS
```javascript
const sentenceElement = document.getElementById('sentence');
const sentence = 'Type this.';
let cursorPos = sentence.length;
let direction = -1;
const switchDirection = () => direction *= -1;

window.setInterval(() => {
  const atStart = cursorPos === 0;
  const atEnd = cursorPos === sentence.length;
  if (atStart && direction === -1 || atEnd && direction === 1) {switchDirection();}
  cursorPos += direction;
  /* Display only part of the text */
  sentenceElement.innerText = sentence.slice(0, cursorPos);
}, 180);
```

#### Here's the result of the above code:
<p id="sentence" class="example">
  Type this.
</p>

### Part three: a blinking cursor

A blinking cursor is not hard to get in pure css, we just need a good animation-timing-function. ([By the way, here's a recap on animations](/blog/2018/05/10/svg-animations.html) — it's for SVGs, but can be applied to any element).
##### HTML
```html
<span class="blink">|</span>
```
##### CSS
```css
.blink {
  animation: blink 1.1s linear infinite alternate;
}

@keyframes blink {
  from {opacity: 1;}
  20% {opacity: 1;}
  28% {opacity: 0;}
  72% {opacity: 0;}
  80% {opacity: 1;}
  to {opacity: 1;}
}
```
Here's our cursor:
<span class="example"><span class="blink">|</span></span>

### Putting it all together

The desired outcome is to show the first phrase, delete it, type the second one, delete, type etc. and start again after we have typed them all. For this, the only additional info we need is to know when to switch sentences, and this is when we are in `delete` mode (= `direction` is `-1`), at `cursorPos` 0. We can even skip a few rounds here, blink the cursor a few times, and continue with the next phrase.

<small>
Note for the cursor's blinking: the number of intervals we spend without typing, and with a blinking cursor, will not be the number of blinks, rather the number of 180ms intervals passing. There's a bit of math to get it right, the cursor blink animation timing should be divisible by the interval, without remainder. In my example, the cursor is set to blink every `1080ms`, the interval is `90ms`, and I wait `12` interval cycles, which is `12 * 90 = 1080ms`, enough for exactly
one blink.
</small>

##### Here's the code:
```javascript
const phrases = [
  'I’m a web developer',
  'I like coffee',
  'I write about stuff I’m no expert in',
  'But then everyone else does so I guess that’s ok',
];

const element = document.getElementById('typing-example');
const cursor = document.getElementById('cursor');
let direction = -1;
let phraseIdx = 0;
let sentence = phrases[phraseIdx];
let cursorPos = sentence.length;
let blinking = false;
let blinkIntervals = 0;

const switchDirection = () => {
  direction *= -1;
  toggleTyping();
  if (direction === 1) {
    /* Just started typing again, time to switch phrase */
    phraseIdx++;
    if (phraseIdx >= phrases.length) {phraseIdx = 0;}
    sentence = phrases[phraseIdx];
  }
};

const toggleTyping = () => {
  blinking = !blinking;
  if (blinking) {cursor.classList.add('blink')} else {cursor.classList.remove('blink');}
}

window.setInterval(() => {
  const atStart = cursorPos === 0;
  const atEnd = cursorPos === sentence.length;
  if (atStart && direction === -1 || atEnd && direction === 1) {switchDirection();}

  if (!blinking) {
    cursorPos += direction;
    element.innerText = sentence.slice(0, cursorPos);
  } else {
    blinkIntervals++;
    if (blinkIntervals >= 12) {
      blinkIntervals = 0;
      toggleTyping();
    }
  }
}, 90);
```

Enjoy the result.

<p class="example">
  <span id="typing-example">I'm a web developer</span><span id="cursor">|</span>
</p>
