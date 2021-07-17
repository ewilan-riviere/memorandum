<template>
  <app-main>
    <template #aside>
      <app-categories-navigation
        :categories="categories"
        route-param="type"
      ></app-categories-navigation>
    </template>
    <template #content>
      <article class="pb-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <img src="/default.jpg" class="light-img" alt="Memorandum" />
          <div class="max-w-xl mx-auto mt-10 text-gray-500">
            <h1 class="text-3xl font-semibold text-center font-quicksand">
              Welcome to Memorandum
            </h1>
            <h2 class="mt-2 text-xl text-center font-quicksand">
              A custom documentation about technologies, frameworks & languages
              and my projects...
            </h2>
          </div>
          <div class="mx-auto mt-16 prose prose-lg text-gray-500">
            <display-document :document="welcome" />
          </div>
        </div>
      </article>
    </template>
  </app-main>
</template>

<script>
import { groupBy } from 'lodash'
import appMain from '~/components/layout/app-main.vue'
import AppCategoriesNavigation from '~/components/layout/app-categories-navigation.vue'

export default {
  name: 'PageIndex',
  components: {
    appMain,
    AppCategoriesNavigation,
  },
  async asyncData({ $content, store }) {
    const welcome = await $content('welcome', { deep: true }).fetch()
    let categories = {}
    if (!store.state.categories) {
      const documents = await $content('documentation', { deep: true })
        .only(['title', 'path', 'hierarchy'])
        .fetch()
      categories = {}
      categories = groupBy(documents, 'hierarchy.category')

      for (const key in categories) {
        if (Object.hasOwnProperty.call(categories, key)) {
          const category = categories[key]
          const subCategories = groupBy(category, 'hierarchy.subCategory')
          const subCategoriesOrdered = Object.keys(subCategories)
            .sort()
            .reduce((obj, key) => {
              obj[key] = subCategories[key]
              return obj
            }, {})
          categories[key] = subCategoriesOrdered
        }
      }

      const categoriesOrdered = Object.keys(categories)
        .sort()
        .reduce((obj, key) => {
          obj[key] = categories[key]
          return obj
        }, {})

      categories = categoriesOrdered
      // console.log(categories)

      store.commit('setCategories', categories)
    } else {
      categories = store.state.categories
    }

    return {
      welcome,
      categories,
    }
  },
  data() {
    return {
      pages: [],
      items: [],
    }
  },
}
</script>
