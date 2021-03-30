module.exports = {
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'assets/**/*.css',
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        quicksand: ['Quicksand'],
        'handlee-regular': ['Handlee-Regular'],
      },
      screens: {
        '2xl': '1600px',
        xl: '1280px',
        lg: '1050px',
        md: '750px',
        sm: '450px',
      },
      colors: {
        'primary-500': '#800080',
        'primary-700': '#660066',
        'primary-300': '#993299',
      },
    },
  },
  variants: {
    extends: {
      display: ['dark'],
      opacity: ['dark'],
      width: ['hover', 'focus'],
      textColor: ['responsive', 'hover', 'focus', 'group-hover', 'dark'],
      scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      boxShadow: ['dark'],
      translate: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      backgroundColor: ['hover', 'focus', 'group-hover', 'dark'],
      backgroundOpacity: ['dark'],
      borderColor: ['hover', 'focus', 'group-hover'],
      borderRadius: ['dark'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-debug-screens'),
  ],
}
