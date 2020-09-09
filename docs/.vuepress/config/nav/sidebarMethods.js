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
      'git/git',
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
        children: getAllFiles('vue/'),
      },
      {
        title: 'visual-studio-code',
        collapsable: true,
        children: getAllFiles('visual-studio-code/'),
      },
      {
        title: 'flutter',
        collapsable: true,
        children: getAllFiles('flutter/'),
      },
      {
        title: 'laravel',
        collapsable: true,
        children: getAllFiles('laravel/'),
      },
      {
        title: 'css',
        collapsable: true,
        children: getAllFiles('css/'),
      },
      {
        title: 'strapi',
        collapsable: true,
        children: getAllFiles('strapi/'),
      },
      // {
      //   title: 'c-sharp',
      //   collapsable: true,
      //   children: ['c-sharp/'],
      // },
      {
        title: 'windows',
        collapsable: true,
        children: getAllFiles('windows/'),
      },
      {
        title: 'server',
        collapsable: true,
        children: getAllFiles('server/'),
      },
      {
        title: 'web-server',
        collapsable: true,
        children: getAllFiles('web-server/'),
      },
    ]
  },

  getGames: () => {
    return [
      '',
      {
        title: 'Guild Wars',
        collapsable: true,
        children: getAllFiles('guild-wars/'),
      },
      {
        title: 'Oxygen Not Included',
        collapsable: true,
        children: getAllFiles('oni/'),
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
