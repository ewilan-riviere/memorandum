module.exports = {
  getApiSidebar: () => {
    return [
      'cli',
      'node'
    ]
  },

  getGuideSidebar: (groupA, groupB) => {
    return [
      {
        title: groupA,
        collapsable: false,
        children: [
          '',
          // 'getting-started',
          // 'directory-structure',
          // 'basic-config',
          // 'assets',
          // 'markdown',
          // 'using-vue',
          // 'i18n',
          // 'deploy'
        ]
      },
      {
        title: groupB,
        collapsable: false,
        children: [
          // 'frontmatter',
          // 'permalinks',
          // 'markdown-slot',
          // 'global-computed'
        ]
      }
    ]
  },

  // const officalPlugins = fs
  //   .readdirSync(path.resolve(__dirname, '../plugin/official'))
  //   .map(filename => 'official/' + filename.slice(0, -3))
  //   .sort()

  getPluginSidebar: (pluginTitle, pluginIntro, officialPluginTitle) => {
    return [
      {
        title: pluginTitle,
        collapsable: false,
        children: [
          ['', pluginIntro],
          'using-a-plugin',
          'writing-a-plugin',
          'life-cycle',
          'option-api',
          'context-api'
        ]
      },
      // {
      //   title: officialPluginTitle,
      //   collapsable: false,
      //   children: officalPlugins
      // }
    ]
  },

  getThemeSidebar: (groupA, introductionA) => {
    return [
      {
        title: groupA,
        collapsable: false,
        sidebarDepth: 2,
        children: [
          ['', introductionA],
          'using-a-theme',
          'writing-a-theme',
          'option-api',
          'default-theme-config',
          'blog-theme',
          'inheritance'
        ]
      }
    ]
  }
}
