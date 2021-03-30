import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
import About from '~/pages/about'
import InComing from '~/pages/in-coming'
import TypeSlug from '~/pages/type/_type'
import Content from '~/pages/content/_'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: 'home',
        path: '/',
        component: Home,
      },
      {
        name: 'about',
        path: '/about',
        component: About,
      },
      {
        name: 'in-coming',
        path: '/in-coming',
        component: InComing,
      },
      {
        name: 'type-slug',
        path: '/:title/:type/:category?',
        component: TypeSlug,
      },
      {
        name: 'all',
        path: '/*',
        component: Content,
      },
    ],
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return { selector: to.hash }
      } else {
        setTimeout(() => {
          return window.scrollTo({ top: 0 })
        }, 100)
      }
    },
  })
}
