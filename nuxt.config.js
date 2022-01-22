import metadata from './plugins/config/metadata'
import pwa from './plugins/config/pwa'
// import sitemaps from './plugins/config/sitemaps'
import crawler from './plugins/config/crawler'

import metadataDynamic from './plugins/config/metadata-dynamic'
import metadataStatic from './plugins/config/metadata-static'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // For `.env`
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
  },
  // For static site generation
  generate: {
    crawler: false,
    routes: crawler,
  },
  // To prevent Nuxt to create fallback images
  render: {
    fallback: false,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: metadata.website.title,
    titleTemplate: metadata.website.titleTemplate,
    htmlAttrs: {
      lang: metadata.settings.locale,
    },
    meta: [...metadataStatic(), ...metadataDynamic(null, process.env.BASE_URL)],
    link: [
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        href: '/apple-touch-icon.png',
      },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.svg' },
      {
        rel: 'manifest',
        crossorigin: 'use-credentials',
        href: '/manifest.webmanifest',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/app.pcss'],
  loading: {
    color: metadata.settings.color,
    height: '2px',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // global helper methods
    '~/plugins/utils/helpers',
    // https://github.com/ymmooot/nuxt-jsonld#readme
    // '~/plugins/utils/jsonld',
    // https://github.com/ndelvalle/v-click-outside
    // '~/plugins/v-click-outside',
    // https://github.com/eddiemf/vue-scrollactive
    '~/plugins/vue-scrollactive',
    // https://github.com/rigor789/vue-scrollto
    '~/plugins/vue-scrollto',
    // https://github.com/ajerez/vue-read-progress
    '~/plugins/vue-read-progress.client.js',

    '~/plugins/markdown',
    '~/plugins/init',
    // '~/plugins/i18n.client',
    '~/plugins/menu.client',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://color-mode.nuxtjs.org/#setup
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
    // https://html-validator.nuxtjs.org/
    // '@nuxtjs/html-validator',
    // https://github.com/nuxt-community/device-module
    '@nuxtjs/device',
    // https://google-fonts.nuxtjs.org
    '@nuxtjs/google-fonts',
  ],
  eslint: {
    cache: false,
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.pcss',
  },
  colorMode: {
    classSuffix: '',
  },
  svgSprite: {},
  htmlValidator: {
    usePrettier: false,
    options: {
      extends: [
        'html-validate:document',
        'html-validate:recommended',
        'html-validate:standard',
      ],
      rules: {
        'svg-focusable': 'off',
        'no-unknown-elements': 'error',
        // Conflicts or not needed as we use prettier formatting
        'void-style': 'off',
        'no-trailing-whitespace': 'off',
        // Conflict with Nuxt defaults
        'require-sri': 'off',
        'attribute-boolean-style': 'off',
        'doctype-style': 'off',
        // Unreasonable rule
        'no-inline-style': 'off',
      },
    },
  },
  googleFonts: {
    families: {
      Quicksand: [500],
      'DM+Mono': [400],
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://www.npmjs.com/package/@nuxtjs/robots
    // '@nuxtjs/robots',
    // https://sitemap.nuxtjs.org/guide/setup
    // '@nuxtjs/sitemap',
    // https://gitlab.com/broj42/nuxt-lazy-load
    'nuxt-lazy-load',
    // https://github.com/frenchrabbit/nuxt-precompress
    'nuxt-precompress',
    // https://i18n.nuxtjs.org/setup
    '@nuxtjs/i18n',
  ],
  pwa: {
    meta: pwa.meta,
    manifest: pwa.manifest,
  },
  content: {
    apiPrefix: '_content',
    dir: 'content',
    fullTextSearchFields: ['title', 'description', 'slug', 'text'],
    live: false,
    nestedProperties: ['categories.slug'],
    markdown: {
      externalLinks: {},
      footnotes: {
        inlineNotes: true,
      },
      tocDepth: 5,
      remarkPlugins: [
        'remark-squeeze-paragraphs',
        'remark-slug',
        'remark-autolink-headings',
        'remark-external-links',
        'remark-footnotes',
        // 'remark-hint',
        // 'remark-strip-badges',
        // 'remark-code-import',
        // 'remark-code-extra',
      ],
      prism: {
        // https://github.com/PrismJS/prism-themes
        theme: 'assets/css/prism-vsc-dark-plus.pcss',
      },
    },
  },
  // robots: {
  //   Disallow: metadata.settings.disallow.split(','),
  //   Sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  // },
  // sitemap: {
  //   path: '/sitemap.xml',
  //   hostname: process.env.BASE_URL,
  //   cacheTime: 1000 * 60 * 15,
  //   gzip: true,
  //   exclude: metadata.settings.disallow.split(','),
  //   sitemaps: sitemaps(),
  // },
  'nuxt-lazy-load': {
    directiveOnly: true,
    loadingClass: 'isLoading',
    loadedClass: 'isLoaded',
    appendClass: 'lazyLoad',
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js',
        name: 'English',
      },
    ],
    defaultLocale: 'en',
    langDir: '~locales/',
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const readingTime = require('reading-time')
        const stats = readingTime(document.text)

        document.readingTime = stats

        let path = document.path
        path = path.split('/')
        path.shift()
        path.pop()

        // - category: development
        // - domain: frameworks
        // - subject: flutter
        // - guide: api-localhost

        const hierarchy = {
          category: path[0],
          domain: path[1],
          subject: path[2],
        }
        if (hierarchy.category !== 'undefined') {
          document.hierarchy = hierarchy
        }
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
