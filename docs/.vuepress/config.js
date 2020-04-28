const { fs, path } = require('@vuepress/shared-utils')

module.exports = ctx => ({
  lang: 'en-US',
  title: 'Memorandum',
  description: 'Keep knowledge safe',
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['link', { href: 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/0.7.4/tailwind.min.css' }]
  ],
  theme: '@vuepress/vue',
  themeConfig: {
    repo: 'ewilan-riviere/memorandum',
    editLinks: false,
    smoothScroll: true,
    label: 'English',
    selectText: 'Languages',
    ariaLabel: 'Select language',
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    nav: require('./nav/en'),
    sidebar: {
      // '/api/': getApiSidebar(),
      '/guides/': getGuideSidebar('Guides', 'Web Server & VHost', 'Server','Linux','Raspberry & NAS', 'Git', 'Laravel'),
      '/games/': getGamesSidebar('Games', 'Oxygen Not Included'),
      '/safe/': getSafeSidebar('Safe', 'SSH'),
      // '/theme/': getThemeSidebar('Theme', 'Introduction')
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

function getGuideSidebar (main, webServer, server, linux, raspberry, git, laravel) {
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
        'server-auto-deploy',
        'ssh-management'
      ]
    },
    {
      title: linux,
      collapsable: true,
      children: [
        'linux-installation-basics',
        'linux-lemp',
        'linux-php',
        'js/eslint'
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
        'laravel-backpack',
        'laravel-translations',
        'laravel-vuejs-mail'
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

