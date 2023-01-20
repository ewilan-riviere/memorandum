export default defineNuxtConfig({
  content: {
    highlight: {
      preload: ['diff', 'json', 'js', 'ts', 'css', 'shell', 'html', 'md', 'yaml', 'php']
    }
  },
  extends: '@nuxt-themes/docus'
})
