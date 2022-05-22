import { VueUseNuxtOptions } from '@vueuse/nuxt'
import { ModuleOptions } from '@nuxt/schema'

const tailwindcss: Partial<ModuleOptions> = {
  exposeConfig: true,
}
const vueuse: VueUseNuxtOptions = {
  ssrHandlers: true,
}
const content: Partial<ModuleOptions> = {
  markdown: {
    remarkPlugins: [
      // 'remark-emoji'
    ],
    toc: { depth: 3, searchDepth: 3 },
  },
  highlight: {
    preload: [
      'apache',
      'bash',
      'blade',
      'dart',
      'diff',
      'dotenv',
      'css',
      'html',
      'groovy',
      'js',
      'json',
      'nginx',
      'php',
      'powershell',
      'ps1',
      'ruby',
      'vue',
      'vue-html',
      'vim',
      'yaml',
      'xml',
    ],
    theme: 'vitesse-dark',
  },
}

/**
 * https://vue-schema-org.netlify.app/guide/setup/nuxt.html#_2-configure-the-module
 */
let schemaOrg = {
  // set to your production domain
  canonicalHost: 'https://nuxtjs.org',
}

const modules: ModuleOptions = {
  content: content,
  tailwindcss: tailwindcss,
  vueuse: vueuse,
  schemaOrg: schemaOrg,
}

export default modules
