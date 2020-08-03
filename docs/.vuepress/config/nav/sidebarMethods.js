module.exports = {
  getApiSidebar: () => {
    return ['cli', 'node']
  },

  getGuides: () => {
    return [
      '',
      'git',
      {
        title: 'linux',
        collapsable: true,
        children: [
          'linux/welcome',
          'linux/setup',
          'linux/setup-apps',
          'linux/lamp',
          'linux/lemp',
          'linux/phpmyadmin',
          'linux/setup-troubles',
          'linux/ssh-management',
          {
            title: 'kde',
            collapsable: true,
            children: ['linux/kde/switch-hdmi'],
          },
        ],
      },
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
        title: 'visual-studio-code',
        collapsable: true,
        children: [
          'visual-studio-code/',
          'visual-studio-code/configuration',
          'visual-studio-code/eslint',
        ],
      },
      {
        title: 'php',
        collapsable: true,
        children: ['php/', 'php/cheatsheet', 'php/manage-array'],
      },
      {
        title: 'laravel',
        collapsable: true,
        children: [
          'laravel/',
          'laravel/relationships',
          'laravel/backpack',
          'laravel/cors-errors',
          'laravel/setup-dependencies',
          'laravel/translations',
          'laravel/vuejs-mail',
        ],
      },
      {
        title: 'css',
        collapsable: true,
        children: [
          'css/',
          {
            title: 'tailwind-css',
            collapsable: true,
            children: [
              'css/tailwind-css/',
              'css/tailwind-css/default-config',
              'css/tailwind-css/libraries',
            ],
          },
        ],
      },
      {
        title: 'server',
        collapsable: true,
        children: [
          'server/auto-deploy',
          'server/nodejs-pm2',
          'server/ssh-management',
        ],
      },
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
      'work-in-progress',
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

  getGames: () => {
    return [
      '',
      {
        title: 'Guild Wars',
        collapsable: true,
        children: ['guild-wars/welcome', 'guild-wars/maps'],
      },
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
