module.exports = {
  mode: 'jit',
  purge: [
    'assets/**/*.css',
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js',
  ],
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
      colors: {
        primary: {
          100: '#e6cce6',
          200: '#cc99cc',
          300: '#b366b3',
          400: '#993399',
          500: '#800080',
          600: '#660066',
          700: '#4d004d',
          800: '#330033',
          900: '#1a001a',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2rem',
            },
          },
        },
        light: {
          css: {
            color: '#e5e7eb',
            h1: {
              color: '#f3f4f6',
            },
            h2: {
              color: '#f3f4f6',
            },
            h3: {
              color: '#f3f4f6',
            },
            strong: {
              color: '#e5e7eb',
            },
            blockquote: {
              color: '#e5e7eb',
            },
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
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
