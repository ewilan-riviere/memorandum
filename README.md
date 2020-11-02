# Memorandum

[![nuxtjs](https://img.shields.io/static/v1?label=NuxtJS&message=v2.14&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/)
[![tailwindCSS](https://img.shields.io/static/v1?label=Tailwind%20CSS&message=v1.8&color=38B2AC&style=flat-square&logo=tailwind-css&logoColor=ffffff)](https://tailwindcss.com/)

[![nodejs](https://img.shields.io/static/v1?label=NodeJS&message=v12.16&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![yarn](https://img.shields.io/static/v1?label=Yarn&message=v1.22&color=2C8EBB&style=flat-square&logo=yarn&logoColor=ffffff)](https://classic.yarnpkg.com/lang/en/)

![Memo](static/logo/logo-readme.png)

> Documentation with snippets and boiler plates, built with [NuxtJS](https://nuxtjs.org) and [nuxt/content](https://content.nuxtjs.org). Markdown ❤️ for ever.

## Setup

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev
```

### Production

```bash
# build for production and launch server
$ yarn build
$ yarn start
```

```bash
# generate static project
$ yarn generate
```

To learn more, check [NuxtJS documentation](https://nuxtjs.org).

## MD tips

```html
<spoiler label="Config">

```bash
sudo apt update && sudo apt upgrade
\```

</spoiler>

<md-img source="nginx-home.jpg"></md-img>

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add prism-themes
  \```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install prism-themes
  \```

  </code-block>
</code-group>

```js[nuxt.config.js]
{
  modules: [
    '@nuxt/content'
  ],
  content: {
    // Options
  }
}
\```

```

- <http://localhost:3000/_content/posts/animations>
- <http://localhost:3000/_content/posts?only=title&only=description&only=img&only=slug&only=author>
- <https://content.nuxtjs.org/>
- <https://nuxtjs.org/>
- <https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins>
- <https://github.com/nuxt-community/feed-module>
- <https://github.com/ngryman/reading-time>
- <https://github.com/nuxt/content/issues/106>
- <https://fr.nuxtjs.org/blog/creating-blog-with-nuxt-content/>
