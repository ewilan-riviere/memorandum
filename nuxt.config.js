require('dotenv').config()

export default {
  // target: 'static',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Memorandum',
    titleTemplate: '%s · Memorandum',
    htmlAttrs: {
      lang: 'en-US',
    },
    meta: [
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Personal documentation, in nuxt/content, on several languages, frameworks and many other topics in web & mobile development.',
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
        content: `${process.env.APP_URL}/logo/preview.png`,
      },
      // Twitter Card
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
        hid: 'twitter:image',
        property: 'twitter:image',
        content: `${process.env.APP_URL}/logo/preview.png`,
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
  css: ['~/assets/css/markdown.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/icons-loader', ssr: false },
    // https://github.com/ewilan-riviere/vue-tailwind-screens-helper
    { src: '~/plugins/vue-tailwind-screens', mode: 'client' },
    { src: '~/plugins/vue-helper' },
    // https://github.com/surmon-china/vue-awesome-swiper
    { src: '~/plugins/vue-awesome-swiper', ssr: false },
    { src: '~/plugins/vue-scrollto' },
    // https://michalsnik.github.io/aos/
    { src: '~/plugins/aos', ssr: false },
    // https://github.com/mercs600/vue2-perfect-scrollbar
    { src: '~/plugins/vue-perfect-scrollbar', ssr: false },
    // https://github.com/Akryum/v-tooltip
    { src: '~/plugins/v-tooltip', ssr: false },
    // https://github.com/eddiemf/vue-scrollactive
    { src: '~/plugins/vue-scrollactive' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/global-components
    '@nuxtjs/global-components',
    // https://github.com/pirony/nuxt-gsap
    'nuxt-gsap',
    // Doc: https://github.com/nuxt-community/router-module
    '@nuxtjs/router',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/html-validator-module
    // '@nuxtjs/html-validator',
    // https://github.com/daliborgogic/nuxt-vitals
    // [
    //   'nuxt-vitals',
    //   {
    //     // Tracking ID (required) { string }
    //     // Replace UA-XXXXXXXX-X by your Google Analytics tracking ID.
    //     trackingID: 'G-Y4XJBB2RP7',
    //     // Event Category (optional) { string }, default 'Web Vitals'
    //     eventCategory: 'Some Category',
    //     // Debug (optional) { number } default 0
    //     debug: 1,
    //     disabled: false,
    //   },
    // ],
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    cookie: {
      key: 'nuxt-color-mode',
      // options: {
      //   path: nuxt.options.router.base, // https://nuxtjs.org/api/configuration-router#base
      //   sameSite: 'lax', // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
      // },
    },
  },

  router: {
    // keepDefaultRouter: true,
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
    // https://github.com/nuxt-community/recaptcha-module
    // '@nuxtjs/recaptcha',
    // https://github.com/nicolasbeauvais/vue-social-sharing
    'vue-social-sharing/nuxt',
    // https://github.com/rigor789/vue-scrollto
    ['vue-scrollto/nuxt', { duration: 300 }],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

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
    //   if (document.extension === '.json' && document.body) {
    //     const data = await database.markdown.toJSON(document.body)

    //     Object.assign(document, data)
    //   }
    // },
  },
  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {
    apiPrefix: '_content',
    dir: 'content',
    fullTextSearchFields: ['title', 'description', 'slug', 'text'],
    nestedProperties: ['categories.slug'],
    markdown: {
      externalLinks: {},
      footnotes: {
        inlineNotes: true,
      },
      remarkPlugins: [
        ['remark-emoji', { emoticon: true }],
        'remark-squeeze-paragraphs',
        'remark-slug',
        'remark-autolink-headings',
        'remark-external-links',
        'remark-footnotes',
        'remark-container',
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

  // https://github.com/nuxt-community/global-components
  globalComponents: {},

  recaptcha: {
    // hideBadge: true,
    // siteKey: process.env.RECAPTCHA_SITE_KEY,
    // version: 3,
  },

  // storybook: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
