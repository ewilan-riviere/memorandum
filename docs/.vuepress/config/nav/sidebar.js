const sidebarMethods = require('./sidebarMethods')

module.exports = {
  getSidebar: (lang) => {
    const sidebar = {
      // '/api/': getApiSidebar(),
      '/guides/': sidebarMethods.getGuides(),
      // '/games/': sidebarMethods.getGames(),
      // '/plugin/': getPluginSidebar('Plugin', 'Introduction', 'Official Plugins'),
      // '/theme/': getThemeSidebar('Theme', 'Introduction')
    }
    if (lang !== undefined) {
      for (const link in sidebar) {
        // console.log(link)
        const newKey = `/${lang}${link}`
        const oldKey = link
        delete Object.assign(sidebar, { [newKey]: sidebar[oldKey] })[oldKey]
      }
      // console.log(sidebar)
    }
    return sidebar
  },
}
