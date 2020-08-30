const dirTree = require('directory-tree')
const path = require('path')

// const fs = require('fs')

const getAllFiles = (guidePath) => {
  const dir = dirTree(path.join(__dirname, '../../../guides/' + guidePath), {
    extensions: /\.md/,
  })
  const files = []
  const directories = []
  dir.children.forEach((children) => {
    if (children.type === 'directory') {
      console.log(children.children)
      const subDirChildren = []
      children.children.forEach((subChildren) => {
        subDirChildren.push(
          path.parse(subChildren.name).name !== 'README'
            ? guidePath +
                children.name +
                '/' +
                path.parse(subChildren.name).name
            : guidePath + children.name + '/'
        )
      })
      const subDir = {
        title: children.name,
        collapsable: true,
        children: subDirChildren,
      }
      directories.push(subDir)
    } else {
      files.push(
        path.parse(children.name).name !== 'README'
          ? guidePath + path.parse(children.name).name
          : guidePath
      )
    }
  })
  directories.forEach((directory) => {
    files.push(directory)
    console.log(directory)
  })
  console.log(files)
  return files
}

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
        children: getAllFiles('linux/'),
      },
      {
        title: 'raspberry',
        collapsable: true,
        children: getAllFiles('raspberry/'),
      },
      {
        title: 'wip',
        collapsable: true,
        children: getAllFiles('wip/'),
      },
      {
        title: 'mail',
        collapsable: true,
        children: getAllFiles('mail/'),
      },
      {
        title: 'js',
        collapsable: true,
        children: getAllFiles('js/'),
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
        title: 'flutter',
        collapsable: true,
        children: getAllFiles('flutter/'),
      },
      {
        title: 'laravel',
        collapsable: true,
        children: [
          'laravel/',
          'laravel/relationships',
          'laravel/image-cache',
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
        title: 'strapi',
        collapsable: true,
        children: ['strapi/deployment'],
      },
      {
        title: 'c-sharp',
        collapsable: true,
        children: ['c-sharp/'],
      },
      {
        title: 'windows',
        collapsable: true,
        children: ['windows/', 'windows/wsl'],
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
      {
        title: 'Oxygen Not Included',
        collapsable: true,
        children: ['oni/', 'oni/asteroids'],
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
