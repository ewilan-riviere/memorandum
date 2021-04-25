import { $content } from '@nuxt/content'
require('dotenv').config()

export const getGeneratedRoutes = () => {
  // Attention, cette fonction DOIT retourner une Promise.
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // Je récupère les événements depuis mon API.
    const routes = []
    // const types = ['/development', '/games']
    // types.forEach((route) => {
    //   routes.push(route)
    // })

    const guides = await $content('documentation', { deep: true })
      .only(['path', 'slug', 'created_at'])
      .sortBy('category')
      .fetch()

    for (const guide of guides) {
      let route = `${guide.path}`
      route = route.replace('documentation/', '')
      routes.push(route)
    }

    // Tout se passe bien, je résous ma Promise en renvoyant les routes ajoutées par ma fonction.
    resolve(routes)
  })
}
