const locales = require('./config/available-locales')
const head = require('./config/head')
const themeConfig = require('./config/themeConfig')
const plugins = require('./config/plugins')

module.exports = (ctx) => ({
  dest: '',
  locales,
  head,
  // theme: '@vuepress/vue',
  extend: '@vuepress/theme-default',
  themeConfig,
  plugins,
  extraWatchFiles: ['.vuepress/config/nav/en.js', '.vuepress/config/nav/fr.js'],
  /**
   * ==============
   *  Tailwind CSS
   * ==============
   */
  postcss: {
    plugins: [require('tailwindcss'), require('autoprefixer')],
  },
  /**
   * ====================================
   *  SVG loader for icon-base component
   * ====================================
   */
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  },
})
