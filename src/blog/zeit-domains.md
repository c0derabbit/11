---
layout: post.njk
title:  Setting up Zeit.co domains with GitHub Pages
date:   2018-09-18
---

A few days ago I decided I deserved a treat, and bought myself a domain on [Zeit.co](https://zeit.co/domains)[^1]. My [website](https://eszter.space) and blog (this very same) live there for now, and I will probably add some more projects later, the ones that need a server to run (like my [weather app](https://swtr.herokuapp.com) that runs on a free Heroku instance at the moment).

Looking back, the process is fairly easy — Zeit even takes care of SSL with [Let’s Encrypt](https://letsencrypt.org). I did need some help setting it up though, huge thanks to [Sam](https://samu.space) for helping out!

## Hereʼs how itʼs done:

1. register with zeit.co and add a payment method
2. install now.sh by `npm i -g now`
3. `now login` with your email and a fun authentication[^2]
4. head over to [zeit.co/domains](https://zeit.co/domains) and choose something nice
5. in the command line, type `now dns add your.domain @ ALIAS you.github.io`
6. go to your `username.github.io` repo’s settings and add custom domain
7. wait about half an hour
8. donʼt forget to enforce HTTPS (you can do this on your github repo settings page).

That should be it!

---
#### References

[^1]: The people behind the lovely [next.js](https://github.com/zeit/next.js), which will deserve a post on its own.
[^2]: This is actually a very cool part, you donʼt need to type passwords in the command line. Instead, you are shown a combination of words, which should match the combination sent to your email. After this is confirmed, youʼre all set!

