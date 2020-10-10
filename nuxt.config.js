require('dotenv').config()

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Accueil',
    titleTemplate: '%s · Useweb Blog tech',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Blog tech de Useweb',
      },
      { property: 'og:title', content: 'Useweb : Blog tech' },
      { property: 'og:description', content: 'Blog tech de Useweb' },
      { property: 'og:image', content: '/icon.png' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: {
    color: '#4a81bd',
    height: '5px',
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
    { src: '~/plugins/vue-awesome-swiper' },
    { src: '~/plugins/vue-scrollto' },
    // https://github.com/ewilan-riviere/vue-badges
    { src: '~/plugins/vue-badges', ssr: false },
    // https://github.com/ewilan-riviere/vue-code-info
    { src: '~/plugins/vue-code-info', ssr: false },
    // https://michalsnik.github.io/aos/
    { src: '~/plugins/aos', ssr: false },
    // https://github.com/mercs600/vue2-perfect-scrollbar
    { src: '~/plugins/vue-perfect-scrollbar', ssr: false },
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
    // https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
    // Doc: https://github.com/nuxt-community/router-module
    '@nuxtjs/router',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  moment: {
    defaultLocale: 'fr',
    locales: ['fr'],
    timezone: {
      matchZones: /Europe\/(Belfast|London|Paris|Athens)/,
      startYear: 2000,
      endYear: 2030,
    },
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
    // https://github.com/webcore-it/nuxt-clipboard2
    'nuxt-clipboard2',
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
    'content:file:beforeInsert': async (document, database) => {
      if (document.extension === '.json' && document.body) {
        const data = await database.markdown.toJSON(document.body)

        Object.assign(document, data)
      }
    },
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

  storybook: {
    // Options
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
