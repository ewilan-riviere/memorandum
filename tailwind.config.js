/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
// const path = require('path')
// const plugin = require('tailwindcss/plugin')
// const defaultTheme = require('tailwindcss/defaultTheme')
// const selectorParser = require('postcss-selector-parser')
// const { getColors } = require('theme-colors')

module.exports = {
  mode: 'jit',
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        quicksand: 'Quicksand, sans-serif',
        'handlee-regular': 'Handlee-Regular, sans-serif',
        sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        mono: 'DM Mono, monospace',
      },
      // fontFamily: {
      //   sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      //   mono: ['DM Mono', ...defaultTheme.fontFamily.mono]
      // },
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
      maxHeight: {
        '(screen-16)': 'calc(100vh - 4rem)',
      },
      inset: {
        16: '4rem',
      },
      transitionProperty: {
        padding: 'padding',
      },
      // https://github.com/tailwindlabs/tailwindcss-typography#customizing-shared-styles
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.100'),
            '[class~="lead"]': {
              color: theme('colors.gray.100'),
            },
            a: {
              fontWeight: theme('fontWeight.semibold'),
              color: theme('colors.primary.300'),
            },
            'a:hover': {
              color: theme('colors.primary.500'),
            },
            p: {
              color: theme('colors.gray.100'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            h1: {
              fontFamily: theme('fontFamily.quicksand'),
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
              'margin-top': theme('margin.12') + ' !important',
              'margin-bottom': theme('margin.8') + ' !important',
              fontSize: theme('fontSize.xl'),
              fontFamily: theme('fontFamily.quicksand'),
              width: 'max-content',
            },
            'h2::after': {
              display: 'block',
              width: theme('width.4/5'),
              'margin-top': theme('margin.2') + ' !important',
              'margin-bottom': theme('margin.1') + ' !important',
              'border-radius': theme('borderRadius.md') + ' !important',
              'border-width': theme('borderWidth.2'),
              'border-color': theme('borderColor.primary.600'),
            },
            h3: {
              color: theme('colors.gray.100'),
              'margin-top': theme('margin.10') + ' !important',
              'margin-bottom': theme('margin.8') + ' !important',
              fontSize: theme('fontSize.xl'),
              fontFamily: theme('fontFamily.quicksand'),
              width: 'max-content',
            },
            'h3::after': {
              display: 'block',
              width: theme('width.4/5'),
              'margin-top': theme('margin.2') + ' !important',
              'margin-bottom': theme('margin.1') + ' !important',
              'border-width': theme('borderWidth.2'),
              'border-color': theme('borderColor.primary.600'),
              'border-style': 'dashed',
            },
            h4: {
              color: theme('colors.gray.100'),
              'margin-top': theme('margin.8') + ' !important',
              'margin-bottom': theme('margin.8') + ' !important',
              fontSize: theme('fontSize.xl.text') + ' !important',
              fontFamily: theme('fontFamily.quicksand'),
              width: 'max-content',
            },
            'h4::after': {
              display: 'block',
              width: theme('width.5/5'),
              'margin-top': theme('margin.2') + ' !important',
              'margin-bottom': theme('margin.1') + ' !important',
              'border-radius': theme('borderRadius.md') + ' !important',
              'border-width': theme('borderWidth.1'),
              'border-color': theme('borderColor.primary.600'),
              'border-style': 'solid',
            },
            h5: {
              color: theme('colors.gray.100'),
              'margin-top': theme('margin.8') + ' !important',
              'margin-bottom': theme('margin.8') + ' !important',
              fontSize: theme('fontSize.text.lg') + ' !important',
              fontFamily: theme('fontFamily.quicksand'),
              width: 'max-content',
            },
            code: {
              fontFamily: theme('fontFamily.mono'),
              padding: theme('padding.1'),
              borderRadius: theme('borderRadius.sm'),
              color: theme('colors.gray.300'),
              backgroundColor: theme('colors.gray.800'),
            },
            pre: {
              fontFamily: theme('fontFamily.mono'),
            },
            hr: {
              borderColor: theme('colors.gray.700'),
            },
            'ol > li::before': {
              color: theme('colors.gray.400'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.600'),
            },
            blockquote: {
              color: theme('colors.gray.400'),
              borderLeftColor: theme('colors.gray.700'),
            },
            'figure figcaption': {
              color: theme('colors.gray.400'),
            },
            'a code': {
              color: theme('colors.primary.500'),
            },
            thead: {
              color: theme('colors.gray.100'),
              borderBottomColor: theme('colors.gray.600'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.700'),
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
    require('tailwind-scrollbar'),
  ],
  purge: {
    content: [
      `assets/**/*.pcss`,
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
    ],
  },
}
