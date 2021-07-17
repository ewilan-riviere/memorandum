import metadata from './plugins/metadata/metadata'
import sitemaps from './plugins/utils/sitemaps'

import metadataDynamic from './plugins/metadata/metadata-dynamic'
import metadataStatic from './plugins/metadata/metadata-static'

import { routes } from './plugins/utils/routes'

export default {
  target: 'static',
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
  },
  generate: {
    crawler: true,
    routes,
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: metadata.tags.title,
    titleTemplate: metadata.tags.titleTemplate,
    htmlAttrs: {
      lang: metadata.settings.locale,
    },
    meta: [...metadataStatic(), ...metadataDynamic()],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/app.css', '~/assets/css/markdown.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  loading: {
    color: metadata.settings.color,
    height: '2px',
  },

  plugins: [
    // global helper methods
    '~/plugins/utils/helpers',
    // https://github.com/ymmooot/nuxt-jsonld#readme
    '~/plugins/utils/jsonld',
    // https://github.com/ndelvalle/v-click-outside
    '~/plugins/v-click-outside',
    // https://github.com/eddiemf/vue-scrollactive
    '~/plugins/vue-scrollactive',
    // https://github.com/rigor789/vue-scrollto
    '~/plugins/vue-scrollto',
  ],

  // GitHub: https://github.com/nuxt/components
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [{ path: '~/components/common', pathPrefix: false }],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // https://color-mode.nuxtjs.org/#setup
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
    // https://html-validator.nuxtjs.org/
    // '@nuxtjs/html-validator',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
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

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://www.npmjs.com/package/@nuxtjs/robots
    '@nuxtjs/robots',
    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
    // https://gitlab.com/broj42/nuxt-lazy-load
    'nuxt-lazy-load',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
    https: false,
    headers: {
      common: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
      },
    },
  },
  pwa: {
    meta: {
      name: metadata.tags.title,
      author: process.env.META_AUTHOR || metadata.tags.author,
      description: metadata.tags.description,
      theme_color: metadata.settings.color,
      lang: metadata.settings.lang,
      ogSiteName: metadata.og.siteName,
      ogTitle: metadata.tags.title,
      ogDescription: metadata.tags.description,
      ogImage: `${process.env.BASE_URL}/default.jpg`,
      ogUrl: process.env.BASE_URL,
      twitterSite: metadata.twitter.site,
      twitterCreator: metadata.twitter.creator,
    },
    manifest: {
      name: metadata.tags.title,
      short_name: metadata.og.siteName,
      description: metadata.tags.description,
      display: 'browser',
      lang: metadata.settings.lang,
    },
  },
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
  robots: {
    Disallow: metadata.settings.disallow.split(','),
    Sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    exclude: metadata.settings.disallow.split(','),
    sitemaps: sitemaps(),
  },
  'nuxt-lazy-load': {
    directiveOnly: true,
    loadingClass: 'isLoading',
    loadedClass: 'isLoaded',
    appendClass: 'lazyLoad',
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
