import { $content } from '@nuxt/content'

export default () => {
  // Attention, cette fonction DOIT retourner une Promise.
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // Je récupère les événements depuis mon API.
    const routes = []
    // const types = ['/development', '/games']
    // types.forEach((route) => {
    //   routes.push(route)
    // })

    const guides = await $content({ deep: true })
      .only(['path', 'slug', 'created_at'])
      .fetch()

    for (const guide of guides) {
      const route = `${guide.path}`
      routes.push(route)
    }

    // Tout se passe bien, je résous ma Promise en renvoyant les routes ajoutées par ma fonction.
    resolve(routes)
  })
}
