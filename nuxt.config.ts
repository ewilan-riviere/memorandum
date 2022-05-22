import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components: {
    global: true,
    dirs: ['~/components'],
  },
  css: ['@/assets/css/tailwind.css'],
  generate: {
    routes: [],
  },
  modules: [
    '@nuxt/content-edge', // https://content-v2.nuxtjs.org
    '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org
    '@pinia/nuxt', // https://pinia.vuejs.org/ssr/nuxt.html
    '@vueuse/nuxt', // https://vueuse.org/guide
  ],
  content: {
    markdown: {
      remarkPlugins: [
        // 'remark-emoji'
      ],
      toc: { depth: 3, searchDepth: 3 },
    },
    highlight: {
      preload: [
        'apache',
        'bash',
        'dart',
        'diff',
        'css',
        'html',
        'groovy',
        'js',
        'json',
        'nginx',
        'php',
        'powershell',
        'ps1',
        'vue',
        'vue-html',
        'vim',
        'yaml',
      ],
      theme: 'vitesse-dark',
    },
  },
  typescript: {
    strict: true, // for pinia
    shim: false, // with Take Over Mode from https://github.com/johnsoncodehk/volar/discussions/471
  },
  vite: {
    plugins: [svgLoader()],
  },
})
