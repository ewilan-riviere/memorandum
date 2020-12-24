import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
import About from '~/pages/about'
import InComing from '~/pages/in-coming'
import TypeSlug from '~/pages/type/_type'
import ContentSlug from '~/pages/content/_content'
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
        path: '/:type',
        component: TypeSlug,
      },
      // {
      //   name: 'category-slug',
      //   path: '/:type/:category',
      //   component: CategorySlug,
      // },
      {
        name: 'content-slug',
        path: '/:type/:category?/:entity/:content',
        component: ContentSlug,
      },
      {
        name: 'all',
        path: '/*',
        component: Content,
      },
      // {
      //   name: 'documentation-type',
      //   path: '/documentation/:type',
      //   component: DocumentationType,
      // },
      // {
      //   name: 'documentation-slug',
      //   path: '/documentation/:type/:category?/:slug',
      //   component: DocumentationSlug,
      // },
      // {
      //   name: 'documentation-md',
      //   path: '/documentation/:type/:category?/:slug/:md',
      //   component: DocumentationMd,
      // },
      // {
      //   name: 'guides',
      //   path: '/guides',
      //   component: Guides,
      // },
      // {
      //   name: 'guides-slug',
      //   path: '/guides/:category/:subCategory',
      //   component: GuidesSlug,
      // },
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
