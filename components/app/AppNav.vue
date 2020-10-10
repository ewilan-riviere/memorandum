<template>
  <aside
    class="fixed inset-0 z-30 w-full mt-16 bg-white md:w-1/5 md:block md:relative md:mt-0 dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent"
    :class="{ block: menu, hidden: !menu }"
  >
    <div
      class="md:sticky md:top-16 overflow-y-auto h-full md:h-auto md:max-h-(screen-16)"
    >
      <ul class="p-4 md:py-8 md:pl-0 md:pr-8">
        <li class="mb-4 md:hidden">
          <AppSearch />
        </li>

        <li
          v-for="(docs, category, index) in categories"
          :key="category"
          class="mb-4"
          :class="{ 'md:mb-0': index === Object.keys(categories).length - 1 }"
        >
          <h3
            class="mb-2 text-sm font-bold tracking-wider text-gray-500 uppercase md:text-xs"
          >
            {{ category }}
          </h3>
          <ul>
            <li
              v-for="doc of docs"
              :key="doc.slug"
              class="text-gray-700 dark:text-gray-300"
            >
              <NuxtLink
                :to="'/'"
                class="flex items-center justify-between px-2 py-1 font-medium rounded hover:text-green-500"
                exact-active-class="text-green-500 bg-green-100 hover:text-green-500 dark:bg-green-900"
              >
                {{ doc.menuTitle || doc.title }}
                <client-only>
                  <span
                    v-if="isNew(doc)"
                    class="w-2 h-2 rounded-full opacity-75 animate-pulse bg-green-500"
                  />
                </client-only>
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li class="md:hidden">
          <h3
            class="mb-2 text-sm font-bold tracking-wider text-gray-500 uppercase md:text-xs"
          >
            More
          </h3>
          <div class="flex items-center ml-2">
            <a
              v-if="settings.twitter"
              :href="`https://twitter.com/${settings.twitter}`"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              name="Twitter"
              class="inline-flex mr-4 text-gray-700 dark:text-gray-300 hover:text-green-500"
            >
              <IconTwitter class="w-5 h-5" />
            </a>
            <a
              v-if="settings.github"
              :href="githubUrls.repo"
              target="_blank"
              rel="noopener noreferrer"
              title="Github"
              name="Github"
              class="inline-flex mr-4 text-gray-700 dark:text-gray-300 hover:text-green-500"
            >
              <IconGithub class="w-5 h-5" />
            </a>

            <!-- <AppLangSwitcher class="mr-4" /> -->
            <!-- <AppColorSwitcher /> -->
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  // computed: {
  //   ...mapGetters(['settings', 'githubUrls']),
  //   menu: {
  //     get() {
  //       return this.$store.state.menu.open
  //     },
  //     set(val) {
  //       this.$store.commit('menu/toggle', val)
  //     },
  //   },
  //   categories() {
  //     return this.$store.state.categories[this.$i18n.locale]
  //   },
  // },

  data() {
    return {
      settings: {
        twitter: 'twitter-link',
        github: 'github-link',
      },
      githubUrls: {
        repo: 'repo-link',
      },
      menu: false,
      categories: [],
    }
  },
  async created() {
    const categories = await this.getPosts()
    console.log(categories)
    this.categories = categories
  },
  methods: {
    async getPosts() {
      const categories = await this.$content('posts').fetch()
      return categories
    },
    isNew(document) {
      if (process.server) {
        return
      }
      if (!document.version || document.version <= 0) {
        return
      }

      const version = localStorage.getItem(`document-${document.slug}-version`)
      if (document.version > Number(version)) {
        return true
      }

      return false
    },
  },
}
</script>
