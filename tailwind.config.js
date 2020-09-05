/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  purge: ['./docs/.vuepress/components/**/*.vue'],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  variants: {},
  plugins: [require('tailwindcss'), require('autoprefixer')],
}
