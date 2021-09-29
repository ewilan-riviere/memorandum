<template>
  <layout-page :entities="categories" type="categories">
    <template #document>
      <div class="px-4 sm:px-6 lg:px-8">
        <img src="/default.jpg" class="rounded-md mt-8" alt="Memorandum" />
        <div class="max-w-xl mx-auto mt-10 text-gray-500 dark:text-gray-400">
          <h1 class="text-3xl font-semibold text-center font-quicksand">
            Welcome to Memorandum
          </h1>
          <h2 class="mt-2 text-xl text-center font-quicksand">
            A custom documentation about technologies, frameworks & languages
            and my projects...
          </h2>
        </div>
        <div class="prose prose-lg dark:prose-dark mx-auto max-w-full">
          <nuxt-content :document="welcome" />
        </div>
      </div>
    </template>
    <template #toc>
      <!-- <app-toc :toc="welcome.toc" /> -->
    </template>
  </layout-page>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { groupBy } from 'lodash'
export default {
  name: 'PageIndex',
  async asyncData({ $content, store }) {
    try {
      const welcome = await $content('welcome', { deep: true }).fetch()
      let categories = {}
      const listFromStore = store.state.pages.list
      if (!listFromStore) {
        const documents = await $content({ deep: true })
          .only(['title', 'path', 'hierarchy'])
          .fetch()
        categories = {}
        categories = groupBy(documents, 'hierarchy.category')

        for (const key in categories) {
          if (Object.hasOwnProperty.call(categories, key)) {
            const category = categories[key]
            const domains = groupBy(category, 'hierarchy.domain')
            const domainsOrdered = Object.keys(domains)
              .sort()
              .reduce((obj, key) => {
                obj[key] = domains[key]
                return obj
              }, {})
            categories[key] = domainsOrdered
          }
        }

        const categoriesOrdered = Object.keys(categories)
          .sort()
          .filter((e) => e !== 'undefined')
          .reduce((obj, key) => {
            obj[key] = categories[key]
            return obj
          }, {})
        categories = categoriesOrdered

        store.commit('pages/setList', categories)
      } else {
        categories = listFromStore
      }

      return {
        welcome,
        categories,
      }
    } catch (error) {
      return {
        welcome: {},
        categories: {},
      }
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
    const meta = require('@/plugins/config/metadata')
    const title =
      'Memorandum, personal development documentation with nuxt/content'
    return {
      title,
      meta: [
        ...dynamicMetadata({
          title,
          description: meta.settings.description,
          url: this.$nuxt.$route.path,
        }),
      ],
    }
  },
  computed: {
    ...mapGetters({
      pages: 'pages/getPages',
    }),
  },
  methods: {
    ...mapMutations({
      setPages: 'pages/setPages',
    }),
  },
}
</script>
