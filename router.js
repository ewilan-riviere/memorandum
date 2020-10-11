import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
import DocumentationType from '~/pages/documentation/_type'
import DocumentationSlug from '~/pages/documentation/_slug'
import DocumentationMd from '~/pages/documentation/_md'
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
        name: 'documentation-type',
        path: '/documentation/:type',
        component: DocumentationType,
      },
      {
        name: 'documentation-slug',
        path: '/documentation/:type/:category?/:slug',
        component: DocumentationSlug,
      },
      {
        name: 'documentation-md',
        path: '/documentation/:type/:category?/:slug/:md',
        component: DocumentationMd,
      },
      {
        name: 'guides',
        path: '/guides',
        component: Guides,
      },
      {
        name: 'guides-slug',
        path: '/guides/:category/:subCategory',
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
