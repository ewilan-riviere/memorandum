const { fs, path } = require('@vuepress/shared-utils')
const sidebar = require('./nav/sidebar')

module.exports = ctx => ({
  lang: 'en-US',
  title: 'Memorandum',
  description: 'Keep knowledge safe',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { href: 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/0.7.4/tailwind.min.css' }],
  ],
  theme: '@vuepress/vue',
  themeConfig: {
    repo: 'ewilan-riviere/memorandum',
    editLinks: false,
    smoothScroll: true,
    label: 'English',
    selectText: 'Languages',
    ariaLabel: 'Select language',
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    nav: require('./nav/nav'),
    sidebar: {
      '/guides/': sidebar.getGuideSidebar('Guides', 'Web Server & VHost', 'Server', 'Linux', 'Raspberry & NAS', 'Git', 'Laravel'),
      '/games/': sidebar.getGamesSidebar('Games', 'Oxygen Not Included'),
      '/safe/': sidebar.getSafeSidebar('Safe'),
      '/projects/': sidebar.getProjectSidebar('Projects', 'Portfolio'),
    },
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@dovyp/vuepress-plugin-clipboard-copy', true],
  ],
  extraWatchFiles: [
    '.vuepress/nav/nav.js',
    '.vuepress/nav/sidebar.js',
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@images': 'docs/.vuepress/images',
      },
    },
  },
  markdown: {
    // lineNumbers: true,
    anchor: { permalink: false },
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  },
})
