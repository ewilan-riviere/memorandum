# Memorandum

[![nuxtjs](https://img.shields.io/static/v1?label=Nuxt&message=v3.x&color=00DC82&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxt.com/)
[![docus](https://img.shields.io/static/v1?label=Docus&message=v1.x&color=00DC82&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://docus.dev/)

[![node](https://img.shields.io/static/v1?label=NodeJS&message=v18.x&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![pnpm](https://img.shields.io/static/v1?label=pnpm&message=v7.x&color=F69220&style=flat-square&logo=pnpm&logoColor=ffffff)](https://pnpm.io)

> Personal documentation.

Deploy on [memorandum.ewilan-riviere.com](https://memorandum.ewilan-riviere.com), built using [Docus](https://docus.dev/), a modern static website generator.

## Setup

```
pnpm i
```

```
pnpm dev
```


## Edge Side Rendering

Can be deployed to Vercel Functions, Netlify Functions, AWS, and most Node-compatible environments.

Look at all the available presets [here](https://v3.nuxtjs.org/guide/deploy/presets).

```bash
pnpm build
```

## Static Generation

Use the `generate` command to build your application.

The HTML files will be generated in the .output/public directory and ready to be deployed to any static compatible hosting.

```bash
pnpm generate
```

## Preview build

You might want to preview the result of your build locally, to do so, run the following command:

```bash
pnpm preview
```

---

For a detailed explanation of how things work, check out [Docus](https://docus.dev).

