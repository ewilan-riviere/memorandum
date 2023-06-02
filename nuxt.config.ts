export default defineNuxtConfig({
  css: [
    'assets/app.css',
  ],
  content: {
    highlight: {
      preload: ['diff', 'json', 'js', 'ts', 'css', 'shell', 'html', 'md', 'yaml', 'php', 'docker'],
    },
  },
  extends: '@nuxt-themes/docus',
})
