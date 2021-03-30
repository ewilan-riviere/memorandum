import { getRoutes, getGuidesRoutes } from './plugins/sitemaps/sitemap'
import { getGeneratedRoutes } from './plugins/routes/routes'
require('dotenv').config()

export default {
  ssr: true,
  target: 'static',
  generate: {
    crawler: true,
    routes: getGeneratedRoutes,
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Documentation',
    titleTemplate: '%s · Memorandum',
    htmlAttrs: {
      lang: 'en-US',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Personal documentation, in nuxt/content, on several languages, frameworks and many other topics in web & mobile development.',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.APP_URL,
      },
      // Open Graph
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Memorandum',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Personal documentation, in nuxt/content, on several languages, frameworks and many other topics in web & mobile development.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${process.env.APP_URL}/open-graph.jpg`,
      },
      // Twitter Card
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Memorandum',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Personal documentation, in nuxt/content, on several languages, frameworks and many other topics in web & mobile development.',
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@ewilanriviere',
      },
      {
        hid: 'twitter:image:src',
        property: 'twitter:image:src',
        content: `${process.env.APP_URL}/open-graph.jpg`,
      },
      {
        hid: 'twitter:image:width',
        name: 'twitter:image:width',
        content: 1200,
      },
      {
        hid: 'twitter:image:height',
        name: 'twitter:image:height',
        content: 600,
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: 'Memorandum',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: {
    color: '#800080',
    height: '5px',
  },

  render: {
    fallback: false,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/app', '~/assets/css/markdown'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/icons-loader', ssr: false },
    // { src: '~/plugins/vue-helper' },
    // https://github.com/surmon-china/vue-awesome-swiper
    // { src: '~/plugins/vue-awesome-swiper', ssr: false },
    { src: '~/plugins/vue-scrollto' },
    // https://michalsnik.github.io/aos/
    // { src: '~/plugins/aos', ssr: false },
    { src: '~/plugins/vue-perfect-scrollbar', ssr: false },
    // https://github.com/Akryum/v-tooltip
    { src: '~/plugins/v-tooltip', ssr: false },
    // https://github.com/eddiemf/vue-scrollactive
    { src: '~/plugins/vue-scrollactive' },
    // https://www.npmjs.com/package/vue-lazy-youtube-video
    // { src: '~/plugins/vue-lazy-youtube' },
    { src: '~/plugins/vue-helper' },
    { src: '~/plugins/global-loader' },
    { src: '~/plugins/vue-read-progress', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // https://github.com/nuxt/components
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/router-module
    '@nuxtjs/router',
    // https://github.com/nuxt/components
    // '@nuxt/components',
    // https://github.com/nuxt-community/google-fonts-module
    '@nuxtjs/google-fonts',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/web-vitals-module
    // [
    //   'nuxt-vitals',
    //   {
    //     // Tracking ID (required) { string }
    //     // Replace UA-XXXXXXXX-X by your Google Analytics tracking ID.
    //     trackingID: 'UA-XXXXXXXX-X',
    //     // Event Category (optional) { string }, default 'Web Vitals'
    //     eventCategory: 'Some Category',
    //     // Debug (optional) { number } default 0
    //     debug: 1,
    //     disabled: false,
    //   },
    // ],
    '@nuxtjs/google-analytics',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    jit: true,
  },

  routerModule: {
    keepDefaultRouter: true,
  },

  googleFonts: {
    display: 'swap',
    prefetch: true,
    families: {
      Quicksand: true,
      Handlee: [400],
      // Raleway: {
      //   wght: [100, 400],
      //   ital: [100]
      // },
    },
  },

  colorMode: {
    classSuffix: '',
  },

  googleAnalytics: {
    id: 'G-Y4XJBB2RP7',
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // https://sitemap.nuxtjs.org
    '@nuxtjs/sitemap',
    // https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    apiPrefix: '_content',
    dir: 'content',
    fullTextSearchFields: ['title', 'description', 'slug', 'text'],
    nestedProperties: ['categories.slug'],
    markdown: {
      live: false,
      externalLinks: {},
      footnotes: {
        inlineNotes: true,
      },
      remarkPlugins: [
        // ['remark-emoji'],
        'remark-squeeze-paragraphs',
        'remark-slug',
        'remark-autolink-headings',
        'remark-external-links',
        'remark-footnotes',
        // 'remark-container',
      ],
      prism: {
        theme: '~/assets/css/prism-vsc-dark-plus.css',
      },
    },
    yaml: {},
    csv: {},
    extendParser: {
      '.custom': (file) => ({
        body: file.split('\n').map((line) => line.trim()),
      }),
    },
  },

  sitemap: {
    path: '/sitemap.xml', // L'emplacement de votre fichier sitemap.
    hostname: process.env.APP_URL, // L'adresse de votre site, que vous pouvez placer comme ici dans une variable d'environnement.
    cacheTime: 1000 * 60 * 15, // La durée avant que le sitemap soit regénéré. Ici 15mn.
    gzip: true,
    generate: false, // Génère une version statique du sitemap quand activé. À utiliser avec nuxt generate.
    exclude: [
      // Les pages qu'on a pas trop envie de voir atterrir sur Google.
      '**',
    ],

    sitemaps: [
      {
        path: '/sitemaps/sitemap.xml',
        exclude: ['**'],
        routes() {
          // Nous allons utiliser une fonction personnalisée pour charger nos routes dynamiques dans le sitemap.
          return getRoutes()
        },
      },
      {
        path: '/sitemaps/guides.xml',
        exclude: ['**'],
        routes: () => {
          return getGuidesRoutes()
        },
      },
    ],
  },
  robots: {
    UserAgent: '*',
    // Disallow: '/',
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const readingTime = require('reading-time')
        const stats = readingTime(document.text)

        document.readingTime = stats

        const paths = document.path.split('/')
        paths.splice(0, 2)
        const pathsObj = {
          type: paths[0], // like 'development' or 'games'
          category: paths.length === 4 ? paths[1] : null, // like 'frameworks'
          entity: paths[paths.length - 2], // like 'flutter' or 'guild-wars'
          file: paths[paths.length - 1], // like 'setup-flutter'
        }
        document.pathsObj = pathsObj
      }
    },
    // 'content:file:beforeInsert': async (document, database) => {
    //   if (document.extension === '.json' ; document.body) {
    //     const data = await database.markdown.toJSON(document.body)

    //     Object.assign(document, data)
    //   }
    // },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
