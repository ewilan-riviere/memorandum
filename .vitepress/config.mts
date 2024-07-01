import { defineConfig } from 'vitepress'
import { footnote } from '@mdit/plugin-footnote'
import namedCodeBlocks from 'markdown-it-named-code-blocks'
// import { parseFiles } from './init'
import { navigation, sidebar } from './nav'

// console.log('start config')
// const files = await parseFiles('guides')
// console.log('Markdown files:', files)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Memorandum',
  description: 'Personal documentation and notes',

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  // ignoreDeadLinks: true,

  markdown: {
    // anchor: {
    //   permalink: markdownItAnchor.permalink.headerLink()
    // },
    image: {
      lazyLoading: true,
    },
    toc: {
      level: [1, 2, 3, 4],
    },
    // lineNumbers: true,
    config: (md) => {
      // use more markdown-it plugins!
      md.use(footnote)
      md.use(namedCodeBlocks)
    },
  },

  sitemap: {
    hostname: 'https://https://memorandum.ewilan-riviere.com',
    transformItems(items) {
      return items.filter(item => !item.url.includes('migration'))
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      dark: '/dark-logo.svg',
      light: '/logo.svg',
      alt: 'Memorandum Logo',
    },

    nav: navigation(),

    sidebar,

    editLink: {
      pattern: 'https://github.com/ewilan-riviere/memorandum/edit/main/:path',
      text: 'Suggest changes to this page',
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ewilan-riviere' },
      { icon: 'twitter', link: 'https://x.com/ewilanriviere' },
    ],

    footer: {
      message: 'MIT License',
      copyright: 'Ewilan Rivière',
    },

    outline: 'deep',
  },

  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }],
    ['meta', { name: 'author', content: 'Ewilan Rivière' }],
    ['meta', { property: 'og:title', content: 'Memorandum' }],
    ['meta', { property: 'og:site_name', content: 'VitePress' }],
    ['meta', { property: 'og:image', content: 'https://https://memorandum.ewilan-riviere.com/og.png' }],
    ['meta', { property: 'og:description', content: 'Personal documentation and notes' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:url', content: 'https://https://memorandum.ewilan-riviere.com' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://https://memorandum.ewilan-riviere.com/og.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],
})
