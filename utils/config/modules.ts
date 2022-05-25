import { VueUseNuxtOptions } from '@vueuse/nuxt'
import { ModuleOptions, NuxtModule } from '@nuxt/schema'

interface NuxtConfig {
  ['content']?: typeof import('@nuxt/content').default extends NuxtModule<
    infer O
  >
    ? Partial<O>
    : Record<string, any>
  ['tailwindcss']?: typeof import('@nuxtjs/tailwindcss').default extends NuxtModule<
    infer O
  >
    ? Partial<O>
    : Record<string, any>
}

const content: NuxtConfig['content'] = {
  highlight: {
    preload: [
      'apache',
      'bash',
      'cmd',
      'dart',
      'diff',
      'css',
      'html',
      'groovy',
      'ini',
      'js',
      'javascript',
      'json',
      'latex',
      'lua',
      'nginx',
      'php',
      'powershell',
      'ps1',
      'ruby',
      'tex',
      'typescript',
      'ts',
      'sass',
      'scss',
      'sql',
      'vue',
      'vue-html',
      'vim',
      'yaml',
      'xml',
    ],
    // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
    theme: 'vitesse-dark',
  },
  markdown: {
    remarkPlugins: [
      // 'remark-emoji'
    ],
    toc: { depth: 3, searchDepth: 3 },
  },
  navigation: {
    fields: ['navTitle'],
  },
}
const tailwindcss: NuxtConfig['tailwindcss'] = {
  exposeConfig: true,
}
const vueuse: VueUseNuxtOptions = {
  ssrHandlers: true,
}

const modules: ModuleOptions = {
  content: content,
  tailwindcss: tailwindcss,
  vueuse: vueuse,
}

export default modules
