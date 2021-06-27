import { routes } from './plugins/utils/routes'

import metadata from './plugins/metadata/metadata'
import sitemaps from './plugins/utils/sitemaps'

import metadataDynamic from './plugins/metadata/metadata-dynamic'
import metadataStatic from './plugins/metadata/metadata-static'

export default {
  target: 'static',
  generate: {
    crawler: true,
    routes,
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
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

  loading: {
    color: metadata.settings.color,
    height: '2px',
  },

  render: {
    // fallback: false,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/app', '~/assets/css/markdown'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/utils/helpers' },
    // https://github.com/ymmooot/nuxt-jsonld#readme
    { src: '~/plugins/jsonld' },
    // https://github.com/eddiemf/vue-scrollactive
    { src: '~/plugins/vue-scrollactive' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // https://github.com/nuxt/components
  components: [
    { path: '~/components/common', prefix: false },
    // { path: '~/components/common/content' },
    // { path: '~/components/common/markdown' },
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/google-fonts-module
    '@nuxtjs/google-fonts',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
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
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://sitemap.nuxtjs.org
    '@nuxtjs/sitemap',
    // https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots',
    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
    // https://gitlab.com/broj42/nuxt-lazy-load
    [
      'nuxt-lazy-load',
      {
        directiveOnly: true,
      },
    ],
    // https://github.com/rigor789/vue-scrollto
    'vue-scrollto/nuxt',
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
  robots: {
    Disallow: metadata.settings.disallow,
    Sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    exclude: metadata.settings.disallow,
    sitemaps: sitemaps(),
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
