# Memorandum <!-- omit in toc -->

[![vite](https://img.shields.io/static/v1?label=Vite&message=v2.*&color=646CFF&style=flat-square&logo=vite&logoColor=ffffff)](https://vitejs.dev/)
[![vue](https://img.shields.io/static/v1?label=Vue&message=v3.*&color=4FC08D&style=flat-square&logo=vue.js&logoColor=ffffff)](https://vuejs.org/)
[![tailwindcss](https://img.shields.io/static/v1?label=Tailwind%20CSS&message=v3.*&color=38B2AC&style=flat-square&logo=tailwind-css&logoColor=ffffff)](https://tailwindcss.com/)

[![node](https://img.shields.io/static/v1?label=NodeJS&message=v16.15&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![pnpm](https://img.shields.io/static/v1?label=pnpm&message=v7.*&color=F69220&style=flat-square&logo=pnpm&logoColor=ffffff)](https://pnpm.io)

Based on [**Vitesse**](https://github.com/antfu/vitesse). Blog & documentation based on Vite, Vue and Markdown.

<p align='center'>
  <img src='./public/default.webp' alt='Memorandum' width='650'/>
</p>

📀 [**repository**](https://gitlab.com/ewilan-riviere/memorandum) : repository  
💻 [**memorandum.ewilan-riviere.com**](https://memorandum.ewilan-riviere.com): demo  

## Setup

```bash
pnpm i
```

```bash
pnpm dev
```

### Production

```bash
pnpm build
```

## Features

- ⚡️ [Vue 3](https://github.com/vuejs/vue-next), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness
- 🗂 [File based routing](./src/pages)
- 📦 [Components auto importing](./src/components)
- 🍍 [State Management via Pinia](https://pinia.esm.dev/)
- 📑 [Layout system](./src/layouts)
- 🗒 [Markdown Support](https://github.com/antfu/vite-plugin-md)
- 🤙🏻 [Reactivity Transform](https://vuejs.org/guide/extras/reactivity-transform.html) enabled
- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly
- 🖨 Static-site generation (SSG) via [vite-ssg](https://github.com/antfu/vite-ssg)
- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest), E2E Testing with [Cypress](https://cypress.io/) on [GitHub Actions](https://github.com/features/actions)
- ☁️ Deploy on Netlify, zero-config

### Plugins

- [Vue Router](https://github.com/vuejs/vue-router)
  - [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
  - [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - layouts for pages
- [Pinia](https://pinia.esm.dev) - Intuitive, type safe, light and flexible Store for Vue using the composition api
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing
- [`vite-plugin-md`](https://github.com/antfu/vite-plugin-md) - Markdown as components / components in Markdown
  - [`markdown-it-prism`](https://github.com/jGleitz/markdown-it-prism) - [Prism](https://prismjs.com/) for syntax highlighting
  - [`prism-theme-vars`](https://github.com/antfu/prism-theme-vars) - customizable Prism.js theme using CSS variables
- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs
- [`vite-ssg-sitemap`](https://github.com/jbaubree/vite-ssg-sitemap) - Sitemap generator
- [`@vueuse/head`](https://github.com/vueuse/head) - manipulate document head reactively
- [`vite-plugin-vue-inspector`](https://github.com/webfansplz/vite-plugin-vue-inspector) - jump to local IDE source code while click the element of browser automatically

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://github.com/vitest-dev/vitest) - Unit testing powered by Vite
- [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager
- [`vite-ssg`](https://github.com/antfu/vite-ssg) - Static-site generation
  - [critters](https://github.com/GoogleChromeLabs/critters) - Critical CSS
- [Netlify](https://www.netlify.com/) - zero-config deployment
- [VS Code Extensions](./.vscode/extensions.json)
  - [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up Vite server automatically
  - [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - Vue 3 `<script setup>` IDE support
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
