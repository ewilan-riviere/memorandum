---
title: nuxt/content
description: 'Build your next Vue.js application with confidence using NuxtJS. An open source framework making web development simple and powerful.'
position: 2
category: 'NuxtJS'
---

<content-alert type="info"> About
Use Markdown files to create content pages with NuxtJS  
[**GitHub**](https://github.com/nuxt/content)
</content-alert>

- [**content.nuxtjs.org**](https://content.nuxtjs.org/fr): official doc
- [**fr.nuxtjs.org/blog/creating-blog-with-nuxt-content**](https://fr.nuxtjs.org/blog/creating-blog-with-nuxt-content/): tuto to create a blog with Nuxt Content
- [**content.nuxtjs.org/configuration#markdown**](https://content.nuxtjs.org/configuration#markdown)
- [**github.com/remark/plugins#list-of-plugins**](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins)
- [**github.com/remarkjs/remark**](https://github.com/remarkjs/remark)
- [**github.com/rehypejs/rehype**](https://github.com/rehypejs/rehype)
- For blog theme: [**nuxtjs.blog**](https://nuxtjs.blog)

## Errors with components in markdown

[github.com/nuxt/content/issues/47](https://github.com/nuxt/content/issues/47#issuecomment-643393328)

```js[nuxt.config.js]
components: [
  { path: '~/components/global', global: true' }
]
```
