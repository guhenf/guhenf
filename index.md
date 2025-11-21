---
layout: default
---

# Bem-vindo ao meu Blog Automatizado com Github Issues e Github Actions!

Aqui estão os artigos publicados via GitHub Issues:

<ul>
  {% for post in site.posts %}
    <li>
      <span class="post-meta">{{ post.date | date: "%d/%m/%Y" }}</span>
      <h3>
        <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h3>
      <p>{{ post.summary }}</p>
    </li>
  {% endfor %}
</ul>
