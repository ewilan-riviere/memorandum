import { $content } from '@nuxt/content'
require('dotenv').config()

export const getGeneratedRoutes = () => {
  // Attention, cette fonction DOIT retourner une Promise.
  return new Promise(async (resolve, reject) => {
    // Je récupère les événements depuis mon API.
    const routes = []
    const staticRoutes = ['/', '/about', '/in-coming']
    staticRoutes.forEach((route) => {
      routes.push(route)
    })

    const types = ['/development', '/games']
    types.forEach((route) => {
      routes.push(route)
    })

    const guides = await $content('documentation', { deep: true })
      .only(['path', 'slug', 'created_at'])
      .sortBy('category')
      .fetch()

    for (const guide of guides) {
      const route = `${guide.path}`
      routes.push(route)
    }

    const notes = await $content('notes', { deep: true })
      .only(['path', 'slug', 'created_at'])
      .sortBy('position')
      .fetch()

    for (const note of notes) {
      const route = `${note.path}`
      routes.push(route)
    }

    // Tout se passe bien, je résous ma Promise en renvoyant les routes ajoutées par ma fonction.
    resolve(routes)
  })
}
