const { fs, path } = require('@vuepress/shared-utils')

module.exports = ctx => ({
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Memorandum',
      description: 'Keep knowledge safe'
    },
    // '/fr/': {
    //   lang: 'fr-FR',
    //   title: 'Memorandum',
    //   description: 'Génrateur de sites statiques grâce à Vue'
    // }
  },
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
  ],
  theme: '@vuepress/vue',
  themeConfig: {
    repo: 'ewilan-riviere/memorandum',
    editLinks: false,
    // #697 Provided by the official algolia team.
    // algolia: ctx.isProd ? ({
    //   apiKey: '3a539aab83105f01761a137c61004d85',
    //   indexName: 'vuepress'
    // }) : null,
    smoothScroll: true,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          // '/api/': getApiSidebar(),
          '/guides/': getGuideSidebar('Guides', 'Web Server & VHost', 'Server','Raspberry & NAS', 'Git', 'Laravel'),
          '/games/': getGamesSidebar('Games', 'Oxygen Not Included'),
          '/safe/': getSafeSidebar('Safe', 'SSH'),
          // '/theme/': getThemeSidebar('Theme', 'Introduction')
        }
      },
      // '/fr/': {
        // label: 'Français',
        // selectText: 'Français',
        // ariaLabel: '选择语言',
        // editLinkText: '在 GitHub 上编辑此页',
        // lastUpdated: '上次更新',
        // nav: require('./nav/zh'),
        // sidebar: {
          // '/zh/api/': getApiSidebar(),
          // '/zh/guide/': getGuideSidebar('指南', '深入'),
          // '/zh/plugin/': getPluginSidebar('插件', '介绍', '官方插件'),
          // '/zh/theme/': getThemeSidebar('主题', '介绍')
        // }
      // }
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@dovyp/vuepress-plugin-clipboard-copy', true]
  ],
  extraWatchFiles: [
    '.vuepress/nav/en.js',
    '.vuepress/nav/fr.js'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@images': 'docs/.vuepress/images'
      }
    }
  },
  markdown: {
    // lineNumbers: true,
    anchor: { permalink: false }
  }
})

function getGuideSidebar (main, webServer, server, raspberry, git, laravel) {
  return [
    {
      title: main,
      collapsable: false,
      children: [
        '',
        'create-local-network',
        'digital-ocean-init',
        'windows-new-terminal',
        'important-links'
      ]
    },
    {
      title: server,
      collapsable: true,
      children: [
        'server-nodejs-pm2',
        'server-auto-deploy'
      ]
    },
    {
      title: webServer,
      collapsable: true,
      children: [
        'web-server-nginx',
        'web-server-nginx-new-subdomain',
        'web-server-apache'
      ]
    },
    {
      title: git,
      collapsable: true,
      children: [
        'git-conflict-end-of-file'
      ]
    },
    {
      title: laravel,
      collapsable: true,
      children: [
        'laravel-cors-error',
        'laravel-backpack'
      ]
    },
    {
      title: raspberry,
      collapsable: true,
      children: [
        'raspberry-as-media-center',
        'raspberry-manipulation',
      ]
    }
  ]
}
function getGamesSidebar (main, oxygenNotIncluded) {
  return [
    {
      title: main,
      collapsable: false,
      children: [
        ''
      ]
    },
    {
      title: oxygenNotIncluded,
      collapsable: true,
      children: [
        'oni-useful-links'
      ]
    }
  ]
}
function getSafeSidebar (main, ssh) {
  return [
    {
      title: main,
      collapsable: false,
      children: [
        ''
      ]
    },
    {
      title: ssh,
      collapsable: true,
      children: [
        'ssh-keys'
      ]
    }
  ]
}

