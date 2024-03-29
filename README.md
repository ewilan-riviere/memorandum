# Memorandum

[![nuxt][nuxt-version-src]][nuxt-version-href]
[![docus][docus-src]][docus-href]
[![node][node-src]][node-href]
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

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

[nuxt-version-src]: https://img.shields.io/badge/dynamic/json?label=Nuxt&query=devDependencies[%27nuxt%27]&url=https://raw.githubusercontent.com/ewilan-riviere/memorandum/main/package.json&color=28CF8D&logo=nuxt.js&logoColor=ffffff&labelColor=18181b
[nuxt-version-href]: https://nuxt.com/
[docus-version-src]: https://img.shields.io/badge/dynamic/json?label=Docus&query=devDependencies[%27@nuxt-themes/docus%27]&url=https://raw.githubusercontent.com/ewilan-riviere/memorandum/main/package.json&color=28CF8D&labelColor=18181b
[docus-href]: https://packagist.org/packages/kiwilan/php-archive
[node-src]: https://img.shields.io/badge/dynamic/json?label=Node.js&query=engines[%27node%27]&url=https://raw.githubusercontent.com/ewilan-riviere/memorandum/main/package.json&color=28CF8D&labelColor=18181b
[node-href]: https://nodejs.org/en
