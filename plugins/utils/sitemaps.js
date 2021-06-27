const { $content } = require('@nuxt/content')
require('dotenv').config()

export default (meta) => {
  return [
    {
      path: '/sitemaps/sitemap.xml',
      exclude: ['**'],
      routes() {
        return getRoutes()
      },
    },
    {
      path: '/sitemaps/documentation.xml',
      exclude: ['**'],
      routes: () => {
        return getContentRoutes()
      },
    },
  ]
}

function getRoutes() {
  // Attention, cette fonction DOIT retourner une Promise.
  return new Promise((resolve, reject) => {
    // Je récupère les événements depuis mon API.
    const routes = []
    const staticRoutes = [
      {
        url: '',
        changefreq: 'weekly',
        priority: 1,
      },
    ]
    staticRoutes.forEach((route) => {
      routes.push(route)
    })
    routes.concat(staticRoutes)

    // Tout se passe bien, je résous ma Promise en renvoyant les routes ajoutées par ma fonction.
    resolve(routes)
  })
}

function getContentRoutes() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const guides = await $content('documentation', { deep: true })
      .only(['path', 'slug', 'created_at'])
      .sortBy('category')
      .fetch()
    const routes = []

    for (const guide of guides) {
      const route = {
        url: `${guide.path}`,
        lastmodISO: guide.created_at,
        priority: 0.6,
      }
      routes.push(route)
    }
    resolve(routes)
  })
}
