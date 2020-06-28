---
layout: feed.11ty.js
lang: hu
pagination:
  data: collections.postsHu
  size: 10
  start: 2
  reverse: true
permalink: "hu/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber | plus: 1 }}/{% endif %}index.html"
---
