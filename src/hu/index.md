---
layout: feed.11ty.js
lang: hu
pagination:
  data: collections.hu
  size: 10
  reverse: true
permalink: "hu/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber | plus: 1 }}/{% endif %}index.html"
---
