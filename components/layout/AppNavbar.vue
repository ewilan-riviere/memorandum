<template>
  <nav
    class="fixed top-0 z-40 w-full bg-white border-b dark:border-gray-800 dark:bg-gray-900"
  >
    <div class="container flex-1 px-4 mx-auto lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center pr-4 lg:w-1/5">
          <nuxt-link
            :to="{ name: 'home' }"
            aria-current="page"
            aria-label="Nuxt Content Logo"
            class="flex-1 flex-shrink-0 text-xl font-bold nuxt-link-exact-active nuxt-link-active"
          >
            <LogoMemo></LogoMemo>
            <!-- <img
                src="/logo-light.svg"
                alt="Nuxt Content"
                class="h-8 max-w-full light-img"
              />
              <img
                src="/logo-dark.svg"
                alt="Nuxt Content"
                class="h-8 max-w-full dark-img"
              /> -->
          </nuxt-link>
        </div>
        <div class="justify-center flex-1 hidden w-4/6 lg:flex">
          <div class="relative flex flex-col justify-between w-full">
            <div class="relative w-full">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-5 h-5 text-gray-500"
                  >
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <input
                    id="search"
                    v-model="query"
                    placeholder="Ask to Memo..."
                    type="search"
                    autocomplete="off"
                    value=""
                    class="block w-full py-2 pl-10 pr-3 leading-5 text-gray-700 placeholder-gray-500 truncate transition-colors duration-300 bg-gray-200 border border-transparent rounded-md dark:text-white dark-focus:text-white focus:border-gray-300 dark-focus:border-gray-700 focus:outline-none focus:bg-white dark-focus:bg-gray-900 dark:bg-gray-800"
                  />

                  <transition v-if="query" name="fade">
                    <ul
                      v-if="Array.isArray(articles) && articles.length"
                      v-click-outside="hideSearch"
                      class="absolute w-full p-3 bg-white border-b-2 border-l-2 border-r-2 border-gray-200 shadow-xl rounded-b-md"
                    >
                      <li
                        v-for="article of articles"
                        :key="article.slug"
                        class="my-1 transition-colors duration-300 hover:bg-gray-200"
                      >
                        <NuxtLink
                          :to="getContentParams(article)"
                          class="flex justify-between p-2"
                          @click.native="articles = []"
                        >
                          <div>
                            <div class="text-sm font-semibold text-gray-500">
                              {{ article.category }}
                            </div>
                            <div class="text-lg font-bold">
                              {{ article.title ? article.title : article.slug }}
                            </div>
                            <div>
                              <p
                                v-if="article.description"
                                v-html="article.description"
                              ></p>
                              <span v-else class="italic text-gray-400">
                                No description
                              </span>
                            </div>
                          </div>
                          <img
                            src="/documentation/logo/guides.webp"
                            class="h-20"
                            alt=""
                          />
                        </NuxtLink>
                      </li>
                    </ul>
                    <div
                      v-else
                      v-click-outside="hideSearch"
                      class="absolute w-full p-3 bg-gray-200 border-b-2 border-l-2 border-r-2 border-gray-200 shadow-xl rounded-b-md"
                    >
                      {{ articles }}
                    </div>
                  </transition>
                </div>
              </div>
            </div>
            <ul
              class="absolute top-0 z-10 flex-1 w-full overflow-hidden bg-white border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-700"
              style="margin-top: 37px; display: none"
            >
              <!---->
            </ul>
          </div>
        </div>
        <div class="flex items-center justify-between pl-8 lg:w-1/5">
          <span
            class="mr-4 text-base font-semibold leading-none text-gray-700 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500"
          >
            v{{ this.$store.state.settings.version }}
          </span>
          <div class="flex items-center">
            <nuxt-link
              v-tooltip="'About'"
              :to="{ name: 'about' }"
              class="px-2 text-gray-700 transition-colors duration-300 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500"
            >
              <icon name="help-stroke" stroke />
            </nuxt-link>
            <a
              v-tooltip="'Twitter'"
              :href="`https://twitter.com/${this.$store.state.settings.twitter}`"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              name="Twitter"
              class="px-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500"
            >
              <icon name="twitter-stroke" stroke />
            </a>
            <a
              v-tooltip="'GitHub'"
              :href="`https://github.com/${this.$store.state.settings.github}/${this.$store.state.settings['github-repository']}`"
              target="_blank"
              rel="noopener noreferrer"
              title="Github"
              name="Github"
              class="px-2 text-gray-700 transition-colors duration-300 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500"
            >
              <icon name="github-stroke" stroke />
            </a>
            <button
              aria-label="Menu"
              class="p-2 -mr-2 text-gray-700 rounded-md lg:hidden dark:text-gray-300 focus:outline-none"
            >
              <svg
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'AppNavbar',
  directives: {
    ClickOutside,
  },
  data() {
    return {
      query: '',
      articles: [],
    }
  },
  watch: {
    async query(query) {
      if (query.length >= 3) {
        if (!query) {
          this.articles = []
          return
        }

        const articles = await this.$content('documentation', { deep: true })
          .only(['title', 'slug', 'description', 'category', 'path'])
          .sortBy('category', 'asc')
          .limit(6)
          .search(query)
          .fetch()

        this.articles = articles
      } else {
        this.articles = 'Type 3 characters or more...'
      }
    },
  },
  methods: {
    getContentParams(article) {
      const path = article.path.replace('/documentation/', '').split('/')
      const params = {
        type: path[0],
        category: path[1],
        entity: path[2],
        content: path[3],
      }
      const link = {
        name: 'content-slug',
        params,
      }
      return link
    },
    hideSearch() {
      this.articles = []
      this.query = ''
    },
  },
}
</script>
