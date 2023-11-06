export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: ['@nuxt-themes/docus'],
  devtools: { enabled: true },
  css: ['assets/app.css'],
  content: {
    highlight: {
      preload: ['diff', 'json', 'js', 'ts', 'css', 'shell', 'html', 'md', 'yaml', 'php', 'docker', 'powershell', 'c', 'lua', 'dart', 'groovy'],
    },
  },
  modules: [],
  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false,
      },
    },
  },
})
