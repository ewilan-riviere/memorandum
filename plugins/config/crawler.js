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
      .only(['path', 'hierarchy', 'slug', 'created_at'])
      .fetch()

    const subjects = []

    for (const guide of guides) {
      if (guide.hierarchy && guide.hierarchy.category !== undefined) {
        const subject = `/${guide.hierarchy.category}/${guide.hierarchy.domain}/${guide.hierarchy.subject}`

        const index = subjects.findIndex((x) => x === subject)
        // here you can check specific property for an object whether it exist in your array or not

        if (index === -1) {
          subjects.push(subject)
        }
      }
      const route = `${guide.path}`
      routes.push(route)
    }
    routes.push(...subjects)

    // Tout se passe bien, je résous ma Promise en renvoyant les routes ajoutées par ma fonction.
    resolve(routes)
  })
}
