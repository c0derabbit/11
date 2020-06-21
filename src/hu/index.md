---
layout: layout.njk
---

# helló, világ!

{%- assign posts = collections.postsHu | reverse -%}
{% for post in posts %}
- [{{ post.data.title }}]({{ post.url }})
{% endfor %}
