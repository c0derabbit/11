---
layout: post.njk
title:  Environment variables with Gatsby and Netlify
date:   2019-06-29
---
So you have a secret key. I have a public one, but there's a limit to requests per day in free tier, so it's better not to commit to source code. Plus, with any kind of key, it's better not to commit it to source code.

Before we go forward, [Gatsby.js](https://www.gatsbyjs.org/) is a superfast frontend framework/static site generator written in React. [Netlify](https://www.netlify.com/) offers a way to deploy it, and they play pretty well together.

Back to our problem: I don't want any keys, secret or public, in my source code. But I'd still like to use it as follows:
```js
const apiKey = process.env.MY_API_KEY;
// do something with key
```
To achieve this, we just need a couple of things:
1. configure environment variables locally and on Netlify[^1]
2. make those variables available to Gatsby's client side.

## Configuring environment variables
### Locally
Create a file called `.env.development` with content `MY_API_KEY=monkey`. Add `.env.*` to `.gitignore`.

### On Netlify
Go to `https://app.netlify.com/sites/{your_site}/deploys#environment`, click 'Edit variables', then 'New variable', add your key and value, and save.

## Done!
That’s it, Gatsby will pick these up from Netlify’s build environment, so now we can access the variable in client-side code as `process.env.MY_API_KEY`.

---
#### Notes
[^1]: Btw, this works very similarly on other hosts, such as Heroku.
[^2]: Read more on Gatsby and environment variables [here](https://www.gatsbyjs.org/docs/environment-variables/).
