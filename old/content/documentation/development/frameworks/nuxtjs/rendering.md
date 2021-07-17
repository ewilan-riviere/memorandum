---
title: Rendering mode
description: 'SSR or full static ?'
position: 5
category: 'NuxtJS'
---

## About configuration

More about

- [**PM2**](/documentation/development/servers/auto-deploy/pm2)
- [**NGINX**](/documentation/development/servers/nginx/examples#to-two-apps-on-same-domains-pm2-edition)

### Server-Side Rendering - SSR

```js[nuxt.config.js]
export default {
  ssr: true, // default to 'true'
  target: 'server', // default to 'server'
}
```

You need to use `yarn build` to compile and `yarn start` to serve application, on server your can use **PM2** to execute this and **NGINX** with reverse proxy.

### Static Site Generation - SSG

```js[nuxt.config.js]
export default {
  ssr: true, // default to 'true'
  target: 'static',
  generate: {
    crawler: true, // default to 'true'
    routes: getGeneratedRoutes, // Optional for generate async routes, see below
  },
}
```

You need to use `yarn generate` to compile and you can server directly `dist/` directory with **NGINX** configuration or `yarn start` on your local to serve it.

#### Single Page Application - SPA

Nuxt won't compile code, just create HTML page with Ajax call for each page, it's really slow and not useful for production.

```js[nuxt.config.js]
export default {
  ssr: false,
  target: 'static',
}
```

#### About generated routes

I use often nuxt/content into my project and I use a route with wildcard to get content directly from file architecture into content dir

```js[nuxt.config.js]
// Create a new js file to get all async routes
import { getGeneratedRoutes } from './plugins/routes/routes'

export default {
  ssr: true, // default to 'true'
  target: 'static',
  generate: {
    crawler: true, // default to 'true'
    routes: getGeneratedRoutes, // Optional for generate async routes, see below
  },
}
```

Here, an example to generate all routes

```js[plugins/routes/routes]
import { $content } from '@nuxt/content'
require('dotenv').config()

export const getGeneratedRoutes = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const routes = []
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

    resolve(routes)
  })
}
```
