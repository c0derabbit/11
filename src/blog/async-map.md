---
layout: post.njk
title:  "Async Array.map(): how to await an array with API calls for each item?"
date:   2019-08-04
---

Today we'll explore how to use Promises[^1] within Array methods. For our example, we will look up coordinates for places on [Here API](https://developer.here.com/documentation/geocoder/topics/quick-start-geocode.html).

Let's try to do it the naïve way (like itʼs the first time we do anything async).

```js
const axios = require('axios');

const baseUrl = 'https://geocoder.api.here.com/6.2/geocode.json';
const places = ['beirut', 'london']; 	
const hereAppCode = 'yourAppCode';
const hereAppId = 'yourAppId';

function getCoords(name) {
  return axios.get(
    `${baseUrl}?app_id=${hereAppId}&app_code=${hereAppCode}&searchtext=${name}`
  );
}

const placesWithCoords = places.map(place => {
  getCoords(place)
    .then(res => {
      console.log(`in map(): ${res.data}`);
      return res.data;
    })
    .catch(err => {
      console.error(err);
    });
});

console.log(`after map(): ${placesWithCoords}`);

// -> after map(): [ undefined, undefined ] (⚠️ this gets called first!)
// -> in map(): { Response: … } }
// -> in map(): { Response: … } }
```

Why does this fail?

Because the `console.log` after mapping does not wait for the promises to finish. Letʼs try something different then: wait for all promises to finish before we do anything with the result.

With a combination of `async`, `await` and `Promise.all()`, it's giving somewhat better results:

```js
function getCoords(name) {
  return axios.get(
    `${baseUrl}?app_id=${hereAppId}&app_code=${hereAppCode}&searchtext=${name}`
  );
}

async function getPlacesWithCoords() {
  const withCoords = await Promise.all(places.map(place => getCoords(place)));
  console.log(`in async function: ${withCoords}`);
  return withCoords;
}

const placesWithCoords = getPlacesWithCoords();
console.log(`after async function: ${placesWithCoords}`);

// -> after async function: Promise { <pending> }
// -> in async function: [ …data ]
```

Much better, now we have a Promise to work with. We just have to add `.then(…)` to the end and do with the results what we like.

```js
async function getPlacesWithCoords() {
  const withCoords = await Promise.all(places.map(place => getCoords(place)));
  console.log('in async function:', withCoords);
  return withCoords;
}

getPlacesWithCoords().then(res => console.log('after async function:', res));

// -> in async function: [ …data ]
// -> after async function: [ …data ]
```

Thatʼs it! If you only need this function once, you can even wrap it in a [self-executing anonymous function](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) and do:

```js
(async function() {
  const withCoords = await Promise.all(places.map(place => getCoords(place)));
  // do something with the result
})()
```

---
#### Notes

[^1]: “The **Promise** object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.” — [Promise on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
