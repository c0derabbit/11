---
layout: layout.njk
---

# hello world

{%- assign posts = collections.posts | reverse -%}
{% for post in posts %}
- [{{ post.data.title }}]({{ post.url }})
{% endfor %}
