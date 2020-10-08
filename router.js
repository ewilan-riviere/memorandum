import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
import Guides from '~/pages/guides/index'
import GuidesSlug from '~/pages/guides/_slug'

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
        name: 'guides',
        path: '/guides',
        component: Guides,
      },
      {
        name: 'guides-slug',
        path: '/guides/:slug',
        component: GuidesSlug,
      },
    ],
    scrollBehavior(to) {
      if (to.hash) {
        return window.scrollTo({
          top: document.querySelector(to.hash).offsetTop,
          behavior: 'smooth',
        })
      }
      return window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  })
}
