module.exports = {
  getApiSidebar: () => {
    return ['cli', 'node']
  },

  getGuideSidebar: () => {
    return [
      '',
      'git',
      {
        title: 'vue',
        collapsable: true,
        children: [
          'vue/welcome',
          {
            title: 'vuepress',
            collapsable: true,
            children: ['vue/vuepress/inheritance'],
          },
        ],
      },
      {
        title: 'server',
        collapsable: false,
        children: [
          'server/auto-deploy',
          'server/nodejs-pm2',
          'server/ssh-management',
          {
            title: 'web-server',
            collapsable: true,
            children: [
              'server/web-server/welcome',
              {
                title: 'apache',
                collapsable: true,
                children: ['server/web-server/apache/apache'],
              },
              {
                title: 'nginx',
                collapsable: true,
                children: [
                  'server/web-server/nginx/setup',
                  'server/web-server/nginx/add-new-subdomain',
                  'server/web-server/nginx/boiler-plates',
                ],
              },
            ],
          },
        ],
      },
      // 'vue',
      // 'vue/vuepress',
      // 'vue/vuepress/inheritance',
      // {

      // {
      //   title: 'vuepress',
      //   collapsable: false,
      //   children: [
      //   ]
      // }

      // {
      //   title: 'vuepress',
      //   collapsable: false,
      //   children: [
      //     'vue/vuepress/',
      //     'vue/vuepress/inheritance',
      //   ]
      // }

      // 'vue',
      // {
      //   title: vue,
      //   collapsable: true,
      //   children: [
      //     'vue/vuepress/',
      //     'vue/vuepress/inheritance'
      //   ],
      // },
      // 'getting-started',
      // 'directory-structure',
      // 'basic-config',
      // 'assets',
      // 'markdown',
      // 'using-vue',
      // 'i18n',
      // 'deploy'
      // ]
      // },
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
          'context-api',
        ],
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
          'inheritance',
        ],
      },
    ]
  },
}
