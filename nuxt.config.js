require('dotenv').config()

export default {
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
  css: ['~/assets/css/app', '~/assets/css/markdown'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/icons-loader', ssr: false },
    { src: '~/plugins/vue-tailwind-screens', mode: 'client' },
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
    { src: '~/plugins/vue-code-info', ssr: false },
    { src: '~/plugins/vue-helper' },
    { src: '~/plugins/global-loader' },
    { src: '~/plugins/vue-read-progress', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // https://github.com/nuxt/components
  // components: [
  //   '~/components',
  //   { path: '~/components/global' },
  // ],

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

  robots: {
    UserAgent: '*',
    Disallow: '/',
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
