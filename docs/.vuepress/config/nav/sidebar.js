const sidebarMethods = require('./sidebarMethods')

module.exports = {
  getSidebar: (lang) => {
    let sidebar = {
      // '/api/': getApiSidebar(),
      '/guides/': sidebarMethods.getGuideSidebar('guides', 'advanced', 'vue'),
      // '/plugin/': getPluginSidebar('Plugin', 'Introduction', 'Official Plugins'),
      // '/theme/': getThemeSidebar('Theme', 'Introduction')
    }
    if (lang !== undefined) {
      renameKeys = (keysMap, obj) =>
        Object.keys(obj).reduce(
          (acc, key) => ({
            ...acc,
            ...{ [keysMap[key] || key]: obj[key] },
          }),
          {}
        )
      let rename = renameKeys(sidebar, { 'fr/guide': 'data' })
      console.log(rename)

      for (const link in sidebar) {
        console.log(link)
      }

      // headerNav.forEach(navLink => {
      //   navLink.link = `/${lang}${navLink.link}`
      //   console.log(navLink);
      // });
    }
    return sidebar
  },
}
