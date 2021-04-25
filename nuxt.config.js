import { getRoutes, getContentRoutes } from './plugins/sitemaps/sitemap'
// import { getGeneratedRoutes } from './plugins/routes/routes'
require('dotenv').config()

export default {
  ssr: true,
  target: 'static',
  // generate: {
  //   crawler: true,
  //   routes: getGeneratedRoutes,
  // },
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
        hid: 'google-site-verification',
        name: 'google-site-verification',
        content: process.env.GOOGLE_SITE_VERIFICATION_TOKEN,
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Memorandum',
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
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@ewilanriviere',
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@ewilanriviere',
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
    // https://github.com/surmon-china/vue-awesome-swiper
    // { src: '~/plugins/vue-awesome-swiper', ssr: false },
    { src: '~/plugins/vue-scrollto' },
    // https://michalsnik.github.io/aos/
    // { src: '~/plugins/aos', ssr: false },
    // https://github.com/Akryum/v-tooltip
    { src: '~/plugins/v-tooltip', ssr: false },
    // https://github.com/eddiemf/vue-scrollactive
    { src: '~/plugins/vue-scrollactive' },
    // https://www.npmjs.com/package/vue-lazy-youtube-video
    // { src: '~/plugins/vue-lazy-youtube' },
    { src: '~/plugins/vue-helper' },
    { src: '~/plugins/global-loader' },
    { src: '~/plugins/vue-read-progress', ssr: false },
    // https://github.com/ymmooot/nuxt-jsonld#readme
    { src: '~/plugins/jsonld' },
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
    },
  },
  colorMode: {
    classSuffix: '',
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    // '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
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
  // axios: {},
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
        'remark-squeeze-paragraphs',
        'remark-slug',
        'remark-autolink-headings',
        'remark-external-links',
        'remark-footnotes',
      ],
      prism: {
        theme: 'prism-themes/themes/prism-vsc-dark-plus.css',
      },
    },
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.APP_URL,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false,
    exclude: ['**'],

    sitemaps: [
      {
        path: '/sitemaps/sitemap.xml',
        exclude: ['**'],
        routes() {
          return getRoutes()
        },
      },
      {
        path: '/sitemaps/documentation.xml',
        exclude: ['**'],
        routes: () => {
          return getContentRoutes()
        },
      },
    ],
  },
  robots: {
    UserAgent: '*',
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const readingTime = require('reading-time')
        const stats = readingTime(document.text)

        document.readingTime = stats

        if (document.path.includes('documentation')) {
          let path = document.path
          path = path.split('/')
          path.shift()
          path.shift()
          path.pop()
          const hierarchy = {
            category: path[0],
            subCategory: path[1],
            subject: path[2],
          }
          document.hierarchy = hierarchy
        }
      }
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
