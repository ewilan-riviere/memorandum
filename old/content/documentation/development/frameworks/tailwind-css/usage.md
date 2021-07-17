---
title: Usage
description: 'How to use'
position: 7
category: 'Tailwind CSS'
---
## Breakpoints

[**tailwindcss.com/docs/breakpoints**](https://tailwindcss.com/docs/breakpoints)

```js[tailwind.config.js]
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
    // ...
  }
  // ...
}
```

## Dark mode

[**tailwindcss.com/docs/dark-mode**](https://tailwindcss.com/docs/dark-mode)

```js[tailwind.config.js]
module.exports = {
  darkMode: 'media',
  // ...
}
```

```html[index.html]
<div class="bg-white dark:bg-gray-800">
  <h1 class="text-gray-900 dark:text-white">Dark mode is here!</h1>
  <p class="text-gray-600 dark:text-gray-300">
    Lorem ipsum...
  </p>
</div>
```

### With Nuxt color-mode

[**color-mode.nuxtjs.org**](https://color-mode.nuxtjs.org)

```bash
yarn add --dev @nuxtjs/color-mode
```

```js[nuxt.config.js]
export default {
  // ...
  buildModules: [
    // ...
    '@nuxtjs/color-mode',
  ],
  // ...
  colorMode: {
    classSuffix: ''
  }
}
```

```js[tailwind.config.js]
module.exports = {
  darkMode: 'class',
  // ...
}
```

<alert type="warning" title="Warning">

If you override `variants` without `extends`, you will override `dark` and dark mode won't works

<vue-code-info ext="bad">

```js[tailwind.config.js]
module.exports = {
  darkMode: 'class',
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
}
```

</vue-code-info>

<vue-code-info ext="good">

```js[tailwind.config.js]
module.exports = {
  darkMode: 'class',
  variants: {
    extends: {
      textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    }
  },
}
```

</vue-code-info>

</alert>

## Import custom fonts

[**tailwindcss.com/docs/font-family**](https://tailwindcss.com/docs/font-family)

```css[app.css]
@font-face {
  font-family: "PTSans-Regular";
  src: url("../fonts/pt-sans/PTSans-Regular.ttf");
}
```

```js[tailwind.config.js]
module.exports = {
  theme: {
    fontFamily: {
      'ptsans-regular': ['PTSans-regular'],
    },
  }
}
```

```html[index.html]
<div class="font-ptsans-regular">
  Lorem ipsum...
</div>
```

Add custom font will override default fonts, you can add them like this

```js[tailwind.config.js]
module.exports = {
  theme: {
    fontFamily: {
      'ptsans-regular': ['PTSans-regular'],
      sans: [
        'system-ui',
        'BlinkMacSystemFont',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
      serif: [
        'Constantia',
        'Lucida Bright',
        'Lucidabright',
        'Lucida Serif',
        'Lucida',
        'DejaVu Serif',
        'Bitstream Vera Serif',
        'Liberation Serif',
        'Georgia',
        'serif',
      ],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
  }
}
```

---

- [**tailwindcss.com/docs/customizing-colors**](https://tailwindcss.com/docs/customizing-colors)

```js[tailwind.config.js]
const colors = require('tailwindcss/colors')

module.exports = {
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
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      red: colors.rose,
    }
    // EXTEND THEME
    extend: {
      screens: {
        xl: '1280px',
        lg: '1050px',
        md: '750px',
        sm: '450px',
      },
      colors: {
        'primary-500': '#800080',
        'primary-700': '#660066',
        'primary-300': '#993299',
        'blue-useweb-light': '#5c8dc3',
        'blue-useweb': '#4a81bd',
        'blue-useweb-dark': '#4274aa',
        'gray-nuxt': '#2F495E',
        'green-nuxt': '#00C58E',
      },
      backgroundImage: theme => ({
        'hero-pattern': "url('/img/hero-pattern.svg')",
      })
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
    extends: {
      textColor: ['responsive', 'hover', 'focus', 'group-hover', 'dark'],
      scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      animation: [
        'responsive',
        'motion-safe',
        'motion-reduce',
        'hover',
        'group-hover',
      ],
      translate: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      backgroundColor: ['hover', 'focus', 'group-hover', 'dark'],
      borderColor: ['hover', 'focus', 'group-hover', 'dark'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```
