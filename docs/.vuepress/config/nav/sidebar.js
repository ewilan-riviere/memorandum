const sidebarMethods = require('./sidebarMethods')

module.exports = {
  getSidebar: (lang) => {
    let sidebar = {
      // '/api/': getApiSidebar(),
      '/guides/': sidebarMethods.getGuides(),
      '/games/': sidebarMethods.getGames(),
      // '/plugin/': getPluginSidebar('Plugin', 'Introduction', 'Official Plugins'),
      // '/theme/': getThemeSidebar('Theme', 'Introduction')
    }
    if (lang !== undefined) {
      for (const link in sidebar) {
        // console.log(link)
        let newKey = `/${lang}${link}`
        let oldKey = link
        delete Object.assign(sidebar, { [newKey]: sidebar[oldKey] })[oldKey]
      }
      // console.log(sidebar)
    }
    return sidebar
  },
}
