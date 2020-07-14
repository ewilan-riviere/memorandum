const locales = require('./config/locales')
const head = require('./config/head')
const themeConfig = require('./config/themeConfig')
const plugins = require('./config/plugins')

module.exports = ctx => ({
  dest: '../../vuepress',
  locales,
  head,
  theme: '@vuepress/vue',
  themeConfig,
  plugins,
  extraWatchFiles: [
    '.vuepress/config/nav/en.js',
    '.vuepress/config/nav/fr.js'
  ],
  /**
   * ==============
   *  Tailwind CSS
   * ==============
   */
  postcss: {
    plugins: [require('tailwindcss'), require('autoprefixer')],
  },
})
