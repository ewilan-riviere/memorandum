---
title: Vue Router Essentials
description: 'The tools that Vue uses to navigate between pages'
position: 4
---

In this lesson we’re going to introduce you to the tools that Vue uses to navigate between pages (or views) in our application. We’ll cover:

* What is Client-Side Routing?
* What is a single page application?
* How is Vue Router setup in a Vue application?
* Then we’ll customize the routes in our example app

---

## **Server-Side vs Client-Side Routing**

When it comes to websites, typically we connect our page together with links. A link gets clicked, it calls back to the server for the next page, and that page gets loaded.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1603835608514.jpg?alt=media&token=3005400a-08eb-4e44-8b55-bfaf0b706e95](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1603835608514.jpg?alt=media&token=3005400a-08eb-4e44-8b55-bfaf0b706e95)

We call this “Server-Side Routing” because the client is making a request to the server on every URL change.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F2.opt.1603835634883.jpg?alt=media&token=7dbbd0f9-2443-4942-b044-71ccc79de855](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F2.opt.1603835634883.jpg?alt=media&token=7dbbd0f9-2443-4942-b044-71ccc79de855)

When it comes to Vue, many choose client-side routing, meaning that the routing happens in the browser itself using JavaScript.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F3.opt.1603835634884.jpg?alt=media&token=436ffcea-e024-4ebb-b51d-fefbfffca84e](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F3.opt.1603835634884.jpg?alt=media&token=436ffcea-e024-4ebb-b51d-fefbfffca84e)

In many cases, the view of our app that we need to show has already been loaded into the browser, so we don’t need to reach out to the server for it. Vue Router simply updates what part of the app that is currently being displayed.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F4.opt.gif?alt=media&token=d8f79fe9-dc02-4b1d-8ee5-91fd87e953db](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F4.opt.gif?alt=media&token=d8f79fe9-dc02-4b1d-8ee5-91fd87e953db)

In fact, with routing like this, our app is functioning as a Single Page Application. So what exactly does that mean?

---

## Single Page Applications

A **Single Page Application** (SPA) is a web app that loads from a single page and dynamically updates that page as the user interacts with the app. In our case, everything is being loaded from the **index.html** file of our project. In lesson 2, we looked at that file and saw that it contained this `div` with the id of `#app`.

📄

**📁public/index.html**

```html
<div id="app"></div>
```

We also took a look at **main.js** and learned that when our app is created, it’s being mounted to that `div` with the id of `#app`.

📄**main.js**

```jsx
createApp(App)
.use(store)
.use(router)
.mount('#app')
```

In other words, the **index.html** file is the “single page” of our single page application, where all of the application code is mounted. So Vue Router enables client-side routing so we can navigate around and display different “views” of our app.

---

## **package.json**

All of our application’s dependencies are tracked inside our **package.json** file. If we take a quick look inside here, we see that the Vue CLI already inserted Vue Router as a dependency because we selected to add it when we configured our project.

```json
"dependencies": {
    "core-js": "^3.6.5",
    "vue": "^3.0.0-0",
    "vue-router": "^4.0.0-0"
},
```

This is telling our application to use a version of vue-router that is compatible with version 4.0.0-0 of vue-router. (Your version number may be different depending on when you take this course)

When we created the project with the CLI, it ran `npm install` for us, which went out to NPM, and installed the vue-router library inside our application’s **node\_modules** directory.

Now let’s take a look inside the **router** directory to see how Vue Router is working.

---

## How Vue Router is configured

Inside the router directory, we find the index.js for our router. At the top of this file, we are importing the vue-router library.

**📁src/router/index.js**

```jsx
import { createRouter, createWebHistory } from 'vue-router'
```

And then we import a component we’ll use in our routes:

```jsx
import Home from '../views/Home.vue'
```

And then we use this route:

```jsx
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        ...// Skipping this part, which we will come back to later
    }
]
```

The `path` indicates the actual route, in terms of the URL, that the user will be taken to. In this first route, there’s only the `/`, meaning this is the root, the homepage of our application, and what people see when they go to our domain at [example.com](http://example.com/).

The `name` allows us to give this route a name so we can use that name throughout our application to refer to this route (more on this later in the course).

The `component` allows us to specify which component to render at that route. Note that `Home` was imported at the top of the file. So as it is, the Home component will be rendered whenever the browser’s URL ends with a `/` with nothing after it.

Taking a look at the second route object, we can see it has a different path:

**📁src/router/index.js**

```jsx
{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
}
```

When the browser’s URL ends with `/about`, the `About` component will be rendered.

You probably noticed it’s also importing the component differently. Rather than importing it at the top of the file like we did with `Home`, we are instead importing it only when the route is actually called. As it says in the comments, this will generate a separate `about.js` file, which will only be loaded into someone’s browser once they navigate to `/about`. This is a performance optimization that isn’t necessary in our simple, small application. But as an application grows, it can be useful to split out how it’s loaded to different JavaScript files, which only get loaded when they are needed.

---

Further down the file, we use `createRouter` to create the router, telling it to use the browser’s History API (we selected this as an option when we configured the project with Vue CLI), and sending in the `routes` we created above, before finally exporting it from this file.

**📁src/router/index.js**

```jsx
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
```

You can learn more about [History Mode here](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations).

So we’ve defined the two different views that our app is going to be able to navigate between, but we actually haven’t yet loaded this router into our Vue instance. Remember, our entire application gets loaded from our **main.js**, and if we look inside this file we can see that we’re importing our **./router/index.js** file, which is bringing in what we exported from **router.js**.

📄**main.js**

```jsx
import router from './router' // <-- This imports index.js from the /router directory
```

And in **main.js** you’ll notice that we tell our Vue instance to use the router we’ve imported:

📄**main.js**

```jsx
createApp(App) .use(router) .mount('#app')
```

So far so good. Now we are understanding how the router is set up. But where is the functionality added to allow the user to navigate to different parts of the app?

---

## Built-in Vue Router Components

Looking within **App.vue**, we’ll find a `div` with the id of `#nav`. And inside of it there are some `router-link`s, which are global, Vue Router-specific components we have access to.

```html
<div id="nav">
<router-link to="/">Home</router-link> |
<router-link to="/about">About</router-link>
</div>
```

And below them is this other Vue Router component:

```html
<router-view />
```

**So what’s happening here?**

`<router-link>` is a component (from the vue-router library) whose job is to link to a specific route. You can think of them like an embellished anchor tag, where the `to` attribute behaves similar to `href`.

`<router-view />` is essentially a placeholder where the contents of our “view” component will be rendered onto the page.

When a user clicks on the Home link, where are they taken _to_? That answer lies within the `to` attribute: `<router-link to="/">`

They are taken to `/`, which means that according to the route that is set up in **router.js**, the Home component will be loaded.

**📁src/router/index.js**

```jsx
{
    path: '/',
    name: 'Home',
    component: Home
}
```

But where, exactly, will it be loaded? The answer is: in the `<router-view />`

Again, that is just a placeholder that is replaced by the “view” component we route to, such as Home or About.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F5.opt.1603835660556.jpg?alt=media&token=6c9083bc-cc1c-43a8-8f02-299e3eaa4e80](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F5.opt.1603835660556.jpg?alt=media&token=6c9083bc-cc1c-43a8-8f02-299e3eaa4e80)

---

## Seeing it happening live

Although the Vue DevTools aren’t ready for the new Vue 3 version of Vue Router, we can see this behavior by looking at it within a Vue 2 app:

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F6.gif?alt=media&token=ce6c779a-211f-4e1f-8010-ff3e0fb775dc](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F6.gif?alt=media&token=ce6c779a-211f-4e1f-8010-ff3e0fb775dc)

If we call up the Vue Devtools we can see our `router-link` components, and as we switch pages we can see the About or Home components getting switched out as needed.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F7.gif?alt=media&token=157b678d-586d-43b5-a511-2ffc3ff1395c](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F7.gif?alt=media&token=157b678d-586d-43b5-a511-2ffc3ff1395c)

Also, if we look into the network panel of our browser, we can see that indeed our application is loaded once, and no subsequent requests are asked of the server. All our templates are loaded into our browser, and we are indeed doing client-side routing.

---

---

## Customizing our Example App

Now that we understand the foundations of Vue Router, we’re ready to start cuztomizing the routes within our example app. Our task list includes:

1. Rename Home.vue to EventList.vue
2. Customize route for EventList
3. Update About.vue
4. Reconfigure About route

---

## Rename Home.vue to EventList.vue

In the last lesson, we transformed the **Home.vue** component into an event list, so let’s rename things to match that new reality, changing the name of the file itself to **EventList.vue** and the `name` of the component as well.

**📁src/views/EventList.vue**

```jsx
export default {
name: 'EventList',
...
}
```

---

## Customize route for EventList

Now that the file has been renamed, we’ll need to change our import statement in our router file, and amend the route object itself.

**📁src/router/index.js**

```jsx
import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList.vue' // imported renamed SFC

const routes = [
    {
        path: '/',
        name: 'EventList',
        component: EventList
    },
    ...
]
```

---

## Update About.vue

Now let’s add some personalization to the About page to fit our example app, adding this text description.

```html
<template>
    <div class="about">
        <p>A site for events to better the world.</p>
    </div>
</template>
```

---

## Reconfigure About route

Since we don’t need to be using route-level code-splitting for our app, we’ll simplify the About route object, like so:

**📁src/router/index.js**

```jsx
{
    path: '/About',
    name: 'About',
    component: About
}
```

At this point, our newly customized router file looks like this:

**📁src/router/index.js**

```jsx
import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import About from '../views/About.vue'


export default new Router({
    routes: [
        {
            path: '/',
            name: 'EventList',
            component: EventList
        },
        {
            path: '/About',
            name: 'About',
            component: About
        }
    ]
})

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
```

---

### A final step

Because we’re now displaying that event list on what used to be our “Home” page, let’s update the inner HTML of the `router-link` for that view.

📄**App.vue**

```html
<template>
    <div id="app">
        <div id="nav">
            <router-link :to="/">Events</router-link> |
            <router-link :to="/about">About</router-link> |
        </div>
        <router-view />
    </div>
</template>
```

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F8.opt.1603835678916.jpg?alt=media&token=b148fd0a-53d0-4980-aef5-c300fb906b5f](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F8.opt.1603835678916.jpg?alt=media&token=b148fd0a-53d0-4980-aef5-c300fb906b5f)

---

## **Up Next**

In our next lesson, we’ll learn how to fetch our events as external data we pull in through an API call using Axios.
