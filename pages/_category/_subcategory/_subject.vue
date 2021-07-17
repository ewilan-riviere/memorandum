<template>
  <div>
    <app-main>
      <template #aside>
        <app-switch-categories
          :categories="categories"
          route-param="type"
          @select-category="selectCategory"
        ></app-switch-categories>
      </template>
      <template #content>
        <div class="">
          <div class="mb-5">
            <div class="flex items-center mb-3">
              <img
                class="object-cover w-10 h-10"
                :src="`/documentation/logo/${subject}.webp`"
                :alt="subject"
              />
              <h1
                class="
                  text-4xl
                  font-bold
                  rounded-md
                  font-quicksand
                  w-max
                  ml-3
                  text-gray-800
                  dark:text-gray-100
                "
              >
                {{ currentEntity.label || subject }}
              </h1>
            </div>
            <p
              v-if="currentEntity.description"
              class="
                max-w-full
                italic
                prose prose-lg
                hyphenate
                dark:text-gray-400
              "
            >
              {{ currentEntity.description }}
            </p>
            <div
              v-if="currentEntity.url"
              class="flex items-center mt-2 ml-auto w-max"
            >
              More information:
              <a
                :href="currentEntity.url"
                target="_blank"
                rel="noopener noreferrer"
                class="
                  block
                  ml-1
                  transition-colors
                  duration-100
                  border-b border-black
                  hover:text-gray-400 hover:border-gray-400
                "
              >
                {{ getDomain(currentEntity.url) }}
              </a>
            </div>
          </div>
          <div
            class="
              overflow-hidden
              bg-white
              shadow
              dark:bg-gray-800
              sm:rounded-md
            "
          >
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
              <li v-for="(document, id) in documents" :key="id">
                <nuxt-link
                  :to="document.path"
                  class="
                    block
                    transition-colors
                    duration-100
                    hover:bg-gray-100
                    dark:hover:bg-gray-700
                  "
                >
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div class="flex items-center flex-1 min-w-0">
                      <div class="flex-shrink-0">
                        <img
                          class="w-12 h-12 rounded-full"
                          src="/documentation/logo/guides.webp"
                          alt="Guides logo"
                        />
                      </div>
                      <div
                        class="flex-1 min-w-0 gap-1 px-4 md:grid md:grid-rows-2"
                      >
                        <div class="flex items-center justify-between">
                          <h2
                            class="
                              text-base
                              font-medium
                              text-indigo-600
                              truncate
                              dark:text-indigo-300
                            "
                          >
                            {{ id + 1 }}.
                            {{ document.title }}
                          </h2>
                          <p class="text-sm text-gray-400 dark:text-gray-300">
                            Updated at
                            <time :datetime="document.createdAt">{{
                              $getDate(document.createdAt)
                            }}</time>
                          </p>
                        </div>

                        <div
                          class="
                            text-sm text-gray-500
                            dark:text-gray-300
                            line-clamp-1
                          "
                        >
                          {{ document.description }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <!-- Heroicon name: solid/chevron-right -->
                      <svg
                        class="w-5 h-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <template #toc></template>
    </app-main>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
// eslint-disable-next-line no-unused-vars
import { groupBy } from 'lodash'
import appMain from '~/components/layout/app-main.vue'
import AppSwitchCategories from '~/components/layout/app-switch-categories.vue'

export default {
  name: 'TypeSlug',
  components: { appMain, AppSwitchCategories },
  // async middleware({ app, params, route, $content, redirect }) {
  //   if (route.params.category === undefined) {
  //     const content = await $content(
  //       `documentation/${params.title}/${params.type}`,
  //       {
  //         deep: true,
  //       }
  //     )
  //       .only(['title', 'path'])
  //       .fetch()

  //     let categories = []
  //     content.forEach((markdownFile) => {
  //       const path = markdownFile.path.replace('/documentation/', '').split('/')
  //       markdownFile.category = path[2]
  //       const Page = path[2]
  //       if (!categories.includes(Page)) {
  //         categories.push(Page)
  //       }
  //     })
  //     categories = categories.sort()
  //     const category = categories[0]

  //     redirect({
  //       name: 'type-slug',
  //       params: {
  //         title: route.params.title,
  //         type: route.params.type,
  //         category,
  //       },
  //     })
  //   }
  // },
  async asyncData({ $content, params }) {
    const [documents, categories] = await Promise.all([
      $content(
        `documentation/${params.category}/${params.subcategory}/${params.subject}`,
        {
          deep: true,
        }
      )
        .only([
          'title',
          'description',
          'path',
          'readingTime',
          'createdAt',
          'position',
        ])
        .sortBy('position')
        .fetch(),
      $content(`documentation/${params.category}/${params.subcategory}`, {
        deep: true,
      })
        .only(['title', 'path', 'hierarchy'])
        .fetch(),
    ])

    const newCategories = groupBy(categories, 'hierarchy.subject')
    const categoriesOrdered = Object.keys(newCategories)
      .sort()
      .reduce((obj, key) => {
        obj[key] = newCategories[key]
        return obj
      }, {})

    return {
      documents,
      categories: categoriesOrdered,
    }
  },
  data() {
    return {
      subject: this.$route.params.subject,
      switched: false,
    }
  },

  head() {
    const title = `${this.$t(this.subject)} - ${this.$t(
      this.$route.params.subcategory
    )}`

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Personal documentation, in nuxt/content, on several languages, frameworks and many other topics in web & mobile development.',
        },
        // Open Graph
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Personal documentation, in nuxt/content, on several languages, frameworks and many other topics in web & mobile development.',
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Personal documentation, in nuxt/content, on several languages, frameworks and many other topics in web & mobile development.',
        },
      ],
    }
  },

  computed: {
    currentEntity() {
      return this.$getEntity(this.$route.params.subject)
    },
  },
  methods: {
    overflow(text, maxLength = 50) {
      if (text) {
        let overflow = text
        if (text.length > maxLength) {
          overflow = text.substring(0, maxLength)
          overflow = `${overflow}...`
        }
        return overflow
      }
      return ''
    },
    getDomain(url) {
      const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)
      return matches && matches[1]
    },
    switchAccordion(id) {
      for (let i = 0; i < this.currentPage.entities.length; i++) {
        if (this.$refs[`collapse-${i}`].length) {
          this.$refs[`collapse-${i}`][0].false()
        }
      }
      if (
        this.currentOpened === id &&
        this.switched === false &&
        this.$refs[`collapse-${id}`].length
      ) {
        this.$refs[`collapse-${id}`][0].false()
        this.switched = true
      } else if (this.$refs[`collapse-${id}`].length) {
        this.$refs[`collapse-${id}`][0].open()
        this.switched = false
      }

      this.currentOpened = id
      setTimeout(() => {
        this.$scrollTo(`#collapse-${id}`, 500, { offset: -60 })
      }, 400)
    },
    selectCategory(data) {
      for (let i = 0; i < this.currentPage.entities.length; i++) {
        if (this.$refs[`collapse-${i}`].length) {
          this.$refs[`collapse-${i}`][0].false()
        }
      }
      const category = this.pages.filter((page) => page.label === data)
      this.currentPage = category[0]
      this.$scrollTo('#__nuxt', 500)
    },
  },
}
</script>

<style lang="postcss" scoped>
.rotate-arrow {
  transform: rotate(90deg);
}
</style>
