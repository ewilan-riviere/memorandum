# Blog Tech NuxtJS

[![nuxtjs](https://img.shields.io/static/v1?label=NuxtJS&message=v2.14&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/)
[![tailwindCSS](https://img.shields.io/static/v1?label=Tailwind%20CSS&message=v1.8&color=38B2AC&style=flat-square&logo=tailwind-css&logoColor=ffffff)](https://tailwindcss.com/)

[![nodejs](https://img.shields.io/static/v1?label=NodeJS&message=v12.16&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![yarn](https://img.shields.io/static/v1?label=Yarn&message=v1.22&color=2C8EBB&style=flat-square&logo=yarn&logoColor=ffffff)](https://classic.yarnpkg.com/lang/en/)

> Blog tech pour Useweb réalisé en NuxtJS avec nuxt/content pour les articles

- 🌐 [**blog.useweb.net**](https://blog.useweb.net) : production
- [**nuxt/content**](https://content.nuxtjs.org/fr) : documentation
- [**create a blog with nuxt/content**](https://fr.nuxtjs.org/blog/creating-blog-with-nuxt-content/) : tuto nuxt/content
- [**manage images content**](https://github.com/nuxt/content/issues/106)

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

Pour des explications détaillées sur NuxtJS, voir la [documentation Nuxt.js](https://nuxtjs.org).

## MD tips

<spoiler label="Config">

```bash
sudo apt update && sudo apt upgrade
```

</spoiler>

<md-img source="nginx-home.jpg"></md-img>

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add prism-themes
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install prism-themes
  ```

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
```
