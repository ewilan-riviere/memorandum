module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  theme: {
    fontFamily: {
      'roboto-medium': ['Roboto-Medium'],
      'ptsans-regular': ['PTSans-regular'],
      quicksand: ['Quicksand'],
    },
    extend: {
      screens: {
        xl: '1500px',
        lg: '1100px',
        md: '900px',
        sm: '400px',
      },
      colors: {
        'blue-useweb-light': '#5c8dc3',
        'blue-useweb': '#4a81bd',
        'blue-useweb-dark': '#4274aa',
      },
      backgroundImage: {},
      opacity: {},
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/ui')],
}
