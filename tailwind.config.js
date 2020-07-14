/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  purge: ['./blog/.vuepress/components/**/*.vue'],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  variants: {},
  plugins: [require('tailwindcss'), require('autoprefixer')],
}

// module.exports = {
//   purge: ['./components/**/*.vue', './layouts/*.vue', './pages/**/*.vue'],
//   theme: {
//     extend: {
//       inset: {
//         '0': '0',
//         '1': '0.25rem',
//         '2': '0.5rem',
//         '3': '0.75rem',
//         '4': '1rem',
//         '5': '1.25rem',
//         '6': '1.5rem',
//         '8': '2rem',
//         '10': '2.5rem',
//         '12': '3rem',
//         '16': '4rem',
//         '20': '5rem',
//         '24': '6rem',
//         '32': '8rem',
//         '40': '10rem',
//         '48': '12rem',
//         '56': '14rem',
//         '64': '16rem'
//       },
//       colors: {
//         'white-body': '#f9fafd',
//         'blue-naviso': '#0971ce',
//         'blue-naviso-dark': '#6378ac',
//         'red-number': '#EC9F9F',
//         'green-number': '#AAEC9F',
//         'blue-number': '#A29FEC',
//         'green-historic': '#27FF00',
//         'blue-historic': '#0A00FF',
//         'red-historic': '#FF0000',
//         'blue-circle': '#F8FCFF',
//         'white-circle': '#0071CE'
//       },
//       fontSize: {
//         '7xl': '9rem'
//       },
//       height: {
//         '72': '22rem'
//       },
//       width: {
//         '72': '22rem'
//       },
//       opacity: {
//         '10': '0.10'
//       },
//       screens: {
//         xl: '1600px'
//       }
//     }
//   },
//   variants: {},
//   plugins: [require('tailwindcss'), require('autoprefixer')]
// }
