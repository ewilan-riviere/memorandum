const { fs, path } = require('@vuepress/shared-utils')
const sidebarNav = require('./nav/sidebar')
const headerNav = require('./nav/header')

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
      nav: headerNav.getHeaderNav(),
      sidebar: sidebarNav.getSidebar()
    },
    '/fr/': {
      label: 'Français',
      selectText: 'Lang',
      ariaLabel: 'Sélectionner une langue',
      editLinkText: 'Editer cette page sur GitHub',
      lastUpdated: 'Dernière mise à jour',
      nav: headerNav.getHeaderNav('fr'),
      sidebar: sidebarNav.getSidebar('fr')
    }
  }
}
