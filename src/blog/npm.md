---
layout: post.njk
title:  Publishing an npm package
date:   2019-03-15
---

There comes a time when you need an npm package that doesnʼt exist — or just want to share something with the world. In my case, itʼs a [Typography.js](https://kyleamathews.github.io/typography.js/) theme. Iʼll use `yarn` as this is my favourite package manager, but `npm` can be used in a similar fashion.

## Creating a module

This part is quite simple. `yarn init` and answer all the questions.

## Using npm packages locally

We should also test the package locally while developing and before publishing it to npm. This can be done by locally linking it — basically, we are letting our local yarn or npm know that this package exists, and where it lives. We also need a test project where we import it from — Iʼm using a [Gatsby blog starter](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/), because it already uses Typography.js by default.

To link the package:

```shell
cd path/to/package-name
yarn link
cd path/to/test-project
yarn link package-name
```

Thatʼs it, now we can develop away.

## Production build (spoiler: using Babel)

For the sake of performance and compatibility, we should minify and compile our code to be ES5-compatible. The easiest way to do it is using [Babel](https://babeljs.io/).

```shell
yarn add --dev @babel/cli @babel/core @babel/preset-env babel-preset-minify
```

Now, we can add a `build` script to `package.json`:  
`"build": "babel src -d dist"`

Letʼs not forget to point our package entry to this `dist` folder (it can be called something else of course):  
`"main": "./dist/index.js"`

## Ready to publish?

First, we have to register on npm. At least I have to, because this is my first package published there. This is conveniently done from the command line with `npm adduser`, which asks for a username, password and public email. Then a simple email verification, and the magic command:

```shell
npm publish
```

Thatʼs it!

---

By the way, check out my [Typography.js theme](https://www.npmjs.com/package/typography-theme-north) on npm.js, and feel free to use it in your projects.
