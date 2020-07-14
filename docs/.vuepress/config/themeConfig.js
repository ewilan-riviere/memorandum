const { fs, path } = require('@vuepress/shared-utils')
const sidebar  = require('./nav/sidebar')

module.exports = {
  repo: 'ewilan-riviere/memorandum',
  editLinks: false,
  docsDir: 'packages/docs/docs',
  smoothScroll: true,
  logo: '/favicon.ico',
  locales: {
    '/': {
      label: 'English',
      selectText: 'Lang',
      ariaLabel: 'Select language',
      editLinkText: 'Edit this page on GitHub',
      lastUpdated: 'Last Updated',
      nav: require('./nav/en'),
      sidebar: {
        // '/api/': getApiSidebar(),
        '/guides/': sidebar.getGuideSidebar('Guides', 'Advanced'),
        // '/plugin/': getPluginSidebar('Plugin', 'Introduction', 'Official Plugins'),
        // '/theme/': getThemeSidebar('Theme', 'Introduction')
      }
    },
    '/fr/': {
      label: 'Français',
      selectText: 'Lang',
      ariaLabel: 'Sélectionner une langue',
      editLinkText: 'Editer cette page sur GitHub',
      lastUpdated: 'Dernière mise à jour',
      nav: require('./nav/fr'),
      sidebar: {
        // '/fr/api/': getApiSidebar(),
        '/fr/guides/': sidebar.getGuideSidebar('指南', '深入'),
        // '/fr/plugin/': getPluginSidebar('插件', '介绍', '官方插件'),
        // '/fr/theme/': getThemeSidebar('主题', '介绍')
      }
    }
  }
}
