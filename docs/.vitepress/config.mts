import { footnote } from '@mdit/plugin-footnote'
import namedCodeBlocks from 'markdown-it-named-code-blocks'
import { defineConfig } from 'vitepress'
import { nav, sidebar } from './nav'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Memorandum',
  description: 'Personal documentation.',
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  // ignoreDeadLinks: true, // testing
  markdown: {
    image: {
      lazyLoading: true,
    },
    toc: {
      level: [1, 2, 3, 4],
    },
    config: (md) => {
      md.use(footnote)
      md.use(namedCodeBlocks)
    },
  },
  sitemap: {
    hostname: 'https://memorandum.kiwilan.app',
    transformItems(items) {
      return items.filter(item => !item.url.includes('migration'))
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      dark: '/dark-logo.svg',
      light: '/logo.svg',
      alt: 'Memorandum',
    },
    nav: nav(),
    sidebar,
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/ewilan-riviere/memorandum/edit/main/:path',
      text: 'Suggest changes to this page',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ewilan-riviere' },
    ],
    footer: {
      message: 'MIT License',
      copyright: 'Memorandum',
    },
    outline: 'deep',
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }],
    ['meta', { name: 'author', content: 'Ewilan Rivière' }],
    ['meta', { property: 'og:title', content: 'Memorandum' }],
    ['meta', { property: 'og:site_name', content: 'Memorandum' }],
    ['meta', { property: 'og:image', content: 'https://memorandum.kiwilan.app/og.png' }],
    ['meta', { property: 'og:description', content: 'Personal documentation' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:url', content: 'https://memorandum.kiwilan.app' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://memorandum.kiwilan.app/og.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],
})
