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
    container: {
      center: true,
    },
    fontFamily: {
      'roboto-medium': ['Roboto-Medium'],
      'ptsans-regular': ['PTSans-regular'],
      quicksand: ['Quicksand'],
      'handlee-regular': ['Handlee-Regular'],
    },
    extend: {
      screens: {
        xl: '1280px',
        lg: '1050px',
        md: '750px',
        sm: '450px',
      },
      colors: {
        'blue-useweb-light': '#5c8dc3',
        'blue-useweb': '#4a81bd',
        'blue-useweb-dark': '#4274aa',
        'gray-nuxt': '#2F495E',
        'green-nuxt': '#00C58E',
      },
      backgroundImage: {},
      opacity: {},
      animation: {
        'bounce-slow': 'bounce-anim-slow 0.3s infinite',
      },
      keyframes: {
        'bounce-anim-slow': {
          '0%': {
            transform: 'translateY(0%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    animation: [
      'responsive',
      'motion-safe',
      'motion-reduce',
      'hover',
      'group-hover',
    ],
    translate: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/ui')],
}
