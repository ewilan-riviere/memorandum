---
title: Components
description: 'Useful components to copy'
---

::alert{type="info"}
Theses components require [**tailwindcss.com**](https://tailwindcss.com)
::

## Icon to load SVG

<!-- <spoiler label="icon.vue"> -->

```vue [icon.vue]
<template>
  <span :class="`icon-${name}`" class="svg-icon">
    <client-only>
      <component
        :is="svgComponent"
        v-if="svgExist && name"
        :width="size"
        :height="ratio ? '100%' : size"
        :class="[svg, { 'fill-current': !stroke }]"
      >
      </component>
      <span v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          :width="size"
          :height="ratio ? '' : size"
          class="fill-current error"
        >
          <path
            d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"
          />
        </svg>
      </span>
    </client-only>
  </span>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Icon',
  props: {
    /**
     * SVG filename from @/assets/icons/ like 'github' for 'github.svg'
     */
    name: {
      type: String,
      default: null,
    },
    /**
     * Size of Icon
     */
    size: {
      type: [Number, String],
      default: 18,
    },
    /**
     * Additional classes directly for <svg />
     */
    svg: {
      type: String,
      default: '',
    },
    /**
     * If SVG is not square, add this like <icon name="..." ratio /> to respect ratio
     */
    ratio: {
      type: Boolean,
      default: false,
    },
    /**
     * For SVG if designed by <svg stroke-width="..." />
     */
    stroke: {
      type: Boolean,
      default: false,
    },
    /**
     * Default icon if not found
     */
    default: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      svgComponent: '',
      svgExist: false, // init component with SVG not exist
    }
  },
  watch: {
    name(newValue, oldValue) {
      this.icon() // if 'name' change, update component
    },
  },
  mounted() {
    this.icon() // init component at mounted() hook, when icons-loader set components
  },
  methods: {
    icon() {
      // reset svgExist
      this.svgExist = false
      // set svg component like icons-loader create it
      const svg = `icon-${this.name}`
      // check if component exist
      if (Vue.options.components[svg] === undefined) {
        console.error(
          `${this.$parent._name} with Icon component\nSVG doesn't exist: ${this.name}.svg`
        )
        if (this.default) {
          this.svgExist = true
          this.svgComponent = `icon-${this.default}`
        }
      } else {
        // if exist, display it
        this.svgExist = true
        this.svgComponent = svg
      }
    },
  },
}
</script>
<style lang="css" scoped>
.error {
  animation: error 2s infinite;
}
@keyframes error {
  0% {
    color: black;
  }
  50% {
    color: red;
  }
  100% {
    color: black;
  }
}
</style>
```

<!-- </spoiler> -->

## Icon SVG loader

```bash
yarn add svg-inline-loader --dev
```

```vue
<template>
  <div v-html="svg"></div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
    primary: {
      type: String,
      default: 'text-gray-500',
    },
    secondary: {
      type: String,
      default: 'text-gray-600',
    },
  },
  computed: {
    svg() {
      return require(`!svg-inline-loader!../assets/icons/icon-${this.icon}.svg`)
    },
  },
  watch: {
    primary() {
      this.proxyClasses('primary')
    },
    secondary() {
      this.proxyClasses('secondary')
    },
  },
  mounted() {
    this.proxyClasses('primary')
    this.proxyClasses('secondary')
  },
  methods: {
    proxyClasses(key) {
      const elements = this.$el.getElementsByClassName(key)
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList = `${key} fill-current ${this[key]}`
      }
    },
  },
}
</script>
```

## Loading

```vue
<template>
  <div class="absolute transform -translate-1/2 top-1/2 left-1/2">
    <svg
      class="w-5 h-5 mr-3 -ml-1 text-gray-800 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>
```

## Plugins

```js [nuxt.config.js]
export default {
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/icons-loader', ssr: false },
    { src: '~/plugins/global-loader' },
  ],
}
```

### Icons loader

```js [plugins/icons-loader.js]
import Vue from 'vue'

const components = require.context('@/assets/icons/.?inline', false, /\.svg$/)

components.keys().forEach((fileName) => {
  const componentConfig = components(fileName)
  const componentName = fileName.split('/').pop().split('.')[0]

  Vue.component(
    `icon-${componentName}`,
    componentConfig.default || componentConfig
  )
})
```

### Global components loader

```js [plugins/global-loader.js]
import Vue from 'vue'

const global = require.context('@/components/global', true, /[a-z]\w+\.(vue)$/)

global.keys().forEach((fileName) => {
  const componentConfig = global(fileName)
  const componentName = fileName.split('/').pop().split('.')[0]

  Vue.component(componentName, componentConfig.default || componentConfig)
})

const layout = require.context('@/components/layout', true, /[a-z]\w+\.(vue)$/)

layout.keys().forEach((fileName) => {
  const componentConfig = layout(fileName)
  const componentName = fileName.split('/').pop().split('.')[0]

  Vue.component(componentName, componentConfig.default || componentConfig)
})
```
