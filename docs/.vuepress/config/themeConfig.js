const sidebarNav = require('./nav/sidebar')
const headerNav = require('./nav/header')

module.exports = {
  repo: 'ewilan-riviere/memorandum',
  editLinks: false,
  prevLinks: false,
  nextLinks: false,
  docsDir: 'packages/docs/docs',
  smoothScroll: true,
  logo: '/favicon.ico',
  locales: {
    '/': {
      label: 'English',
      selectText: 'English',
      ariaLabel: 'Select language',
      editLinkText: 'Edit this page on GitHub',
      lastUpdated: 'Last Updated',
      nav: headerNav.getHeaderNav(),
      sidebar: sidebarNav.getSidebar(),
    },
    // '/fr/': {
    //   label: 'Français',
    //   selectText: 'Français',
    //   ariaLabel: 'Sélectionner une langue',
    //   editLinkText: 'Editer cette page sur GitHub',
    //   lastUpdated: 'Dernière mise à jour',
    //   nav: headerNav.getHeaderNav('fr'),
    //   sidebar: sidebarNav.getSidebar('fr'),
    // },
  },
}
