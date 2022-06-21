const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{vue,js,ts,jsx,tsx,php,md}'],
  theme: {
    container: {
      padding: '1.25rem',
      center: true,
    },
    screens: {
      sm: '360px',
      md: '600px',
      lg: '900px',
      xl: '1300px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        primary: {
          100: '#e2e0ff',
          200: '#c4c1ff',
          300: '#a7a1ff',
          400: '#8982ff',
          500: '#6c63ff',
          600: '#564fcc',
          700: '#413b99',
          800: '#2b2866',
          900: '#161433',
        },
      },
      fontFamily: {
        handlee: ['Handlee'],
        firacode: ['FiraCode'],
      },
      keyframes: {
        life: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        life: 'life 1900ms linear forwards',
      },
      typography: ({ theme }) => ({
        primary: {
          css: {
            h1: {
              fontFamily: 'Handlee',
            },
            h2: {
              fontFamily: 'Handlee',
            },
            code: {
              fontFamily: 'FiraCode',
            },
            blockquote: {
              fontFamily: 'Handlee',
            },
            '--tw-prose-body': theme('colors.white'),
            '--tw-prose-headings': theme('colors.primary[400]'),
            '--tw-prose-lead': theme('colors.primary[400]'),
            '--tw-prose-links': theme('colors.primary[400]'),
            '--tw-prose-bold': theme('colors.primary[400]'),
            '--tw-prose-counters': theme('colors.primary[400]'),
            '--tw-prose-bullets': theme('colors.primary[400]'),
            '--tw-prose-hr': theme('colors.primary[300]'),
            '--tw-prose-quotes': theme('colors.primary[400]'),
            '--tw-prose-quote-borders': theme('colors.primary[300]'),
            '--tw-prose-captions': theme('colors.primary[400]'),
            '--tw-prose-code': theme('colors.primary[400]'),
            '--tw-prose-pre-code': theme('colors.primary[100]'),
            '--tw-prose-pre-bg': theme('colors.gray[800]'),
            '--tw-prose-th-borders': theme('colors.primary[300]'),
            '--tw-prose-td-borders': theme('colors.primary[200]'),
            '--tw-prose-invert-body': theme('colors.primary[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.primary[300]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.primary[400]'),
            '--tw-prose-invert-bullets': theme('colors.primary[600]'),
            '--tw-prose-invert-hr': theme('colors.primary[700]'),
            '--tw-prose-invert-quotes': theme('colors.primary[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.primary[700]'),
            '--tw-prose-invert-captions': theme('colors.primary[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.primary[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.primary[600]'),
            '--tw-prose-invert-td-borders': theme('colors.primary[700]'),
          },
        },
      }),
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.main-content': {
          '@apply container !max-w-7xl lg:pt-6 pt-5 text-black dark:text-white':
            {},
        },
        '.main-block': {
          '@apply mx-auto max-w-md px-6 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8':
            {},
        },
        '.content-min-height': {
          '@apply min-h-[70vh]': {},
        },
        '.internal-link': {
          '@apply text-gray-900 transition-colors duration-100 underline underline-offset-2 dark:border-gray-100 dark:hover:border-gray-400 hover:border-gray-400 dark:text-gray-100 hover:text-gray-400 dark:hover:text-gray-400 !important':
            {},
        },
        '.word-wraping': {
          'text-align': 'justify',
          '-webkit-hyphens': 'auto',
          '-moz-hyphens': 'auto',
          '-ms-hyphens': 'auto',
          hyphens: 'auto',
        },
        '.display-grid': {
          '@apply grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-hidden':
            {},
        },
        '.text-gray': {
          '@apply text-gray-500 dark:text-gray-400': {},
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.prose-title-h1': {
          '@apply inline-block text-primary-400 font-semibold after:w-4/5 after:block after:border-b-2 after:border-primary-400 after:rounded-md':
            {},
        },
        '.prose-title-h2': {
          '@apply inline-block text-primary-400 font-semibold after:w-4/5 after:block after:border-b-2 after:border-primary-400 after:rounded-md mt-16':
            {},
        },
        '.prose-title-h3': {
          '@apply inline-block text-primary-400 font-semibold border-b-2 border-primary-400':
            {},
        },
        '.prose-title-h4': {
          '@apply inline-block text-primary-400 font-semibold border-b-2 border-primary-400 border-dashed':
            {},
        },
        '.debug-screens': {
          '@apply before:bottom-0 before:left-0 before:fixed before:px-1 before:text-sm before:bg-black before:text-white before:shadow-xl sm:before:content-["screen:sm"] md:before:content-["screen:md"] lg:before:content-["screen:lg"] xl:before:content-["screen:xl"] 2xl:before:content-["screen:2xl"] before:content-["screen:none"]':
            {},
          '&:before': {
            'z-index': '2147483647',
          },
        },
      })
    }),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
