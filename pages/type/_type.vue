<template>
  <div>
    <layout-main>
      <div slot="aside">
        <switch-categories
          :pages="pages"
          route-param="type"
          @select-category="selectCategory"
        ></switch-categories>
      </div>
      <div slot="main" class="">
        <div class="">
          <h1
            class="p-2 mb-5 ml-2 text-2xl font-bold rounded-md font-quicksand title w-max"
          >
            {{ $t(currentPage.label) }}
          </h1>
          <div
            class="overflow-hidden bg-white shadow dark:bg-gray-800 sm:rounded-md"
          >
            <ul>
              <div class="overflow-hidden bg-white shadow sm:rounded-md">
                <ul class="divide-y divide-gray-200">
                  <li
                    v-for="document in currentPage.entities"
                    :key="document.id"
                  >
                    <nuxt-link
                      :to="document.path"
                      class="block hover:bg-gray-50"
                    >
                      <div class="flex items-center px-4 py-4 sm:px-6">
                        <div class="flex items-center flex-1 min-w-0">
                          <div class="flex-shrink-0">
                            <client-only>
                              <img
                                class="w-12 h-12"
                                :src="`/documentation/logo/${$slugify(
                                  currentPage.label
                                )}.webp`"
                                alt=""
                                @error="imgError"
                              />
                            </client-only>
                          </div>
                          <div
                            class="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4"
                          >
                            <div
                              class="my-auto text-sm font-medium text-indigo-600 truncate"
                            >
                              {{ document.title }}
                            </div>
                            <div class="hidden md:block">
                              <div class="text-sm text-gray-900">
                                Created at
                                <time :datetime="document.createdAt">{{
                                  $getDate(document.createdAt)
                                }}</time>
                              </div>
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
            </ul>
          </div>
        </div>
      </div>
      <div slot="toc"></div>
    </layout-main>
  </div>
</template>

<script>
import SwitchCategories from '@/components/layout/switch-categories.vue'
// eslint-disable-next-line no-unused-vars
import groupBy from 'lodash/groupBy'
import LayoutMain from '@/components/layout/layout-main.vue'

export default {
  name: 'TypeSlug',
  components: {
    SwitchCategories,
    LayoutMain,
  },
  async middleware({ app, params, route, $content, redirect }) {
    if (route.params.category === undefined) {
      const content = await $content(`documentation/${params.type}`, {
        deep: true,
      })
        .only(['title', 'path'])
        .fetch()

      let categories = []
      content.forEach((markdownFile) => {
        const path = markdownFile.path.replace('/documentation/', '').split('/')
        markdownFile.category = path[1]
        const Page = path[1]
        if (!categories.includes(Page)) {
          categories.push(Page)
        }
      })
      categories = categories.sort()
      const category = categories[0]

      redirect({
        name: 'type-slug',
        params: {
          type: route.params.type,
          category,
        },
      })
    }
  },
  async asyncData({ $content, params }) {
    const content = await $content(`documentation/${params.type}`, {
      deep: true,
    })
      .only([
        'title',
        'description',
        'path',
        'readingTime',
        'createdAt',
        'position',
      ])
      .sortBy('position')
      .fetch()

    const pages = []
    // get main categories like Frameworks, Languages...
    // define category and entity for each file
    content.forEach((markdownFile) => {
      const path = markdownFile.path.replace('/documentation/', '').split('/')
      markdownFile.category = path[1]
      markdownFile.entity = path[2]
      const Page = {
        label: path[1],
        title: markdownFile.title,
        entities: [],
        number: 0,
        route: 'category-slug',
      }
      pages.pushIfNotExist(Page, function (e) {
        return e.label === Page.label
      })
    })

    // console.log(groupBy(content, 'category'))

    // alphabetic sorting
    pages.sort((a, b) => (a.label > b.label ? 1 : -1))

    // if 'frameworks' from pages.label === 'frameworks' of file category
    // add entity name like 'flutter' to 'entities' if not exist in this array
    content.forEach((markdownFile) => {
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        if (page.label === markdownFile.category) {
          const entity = {
            label: markdownFile.entity,
            title: markdownFile.title,
            path: markdownFile.path,
            position: markdownFile.position,
            createdAt: markdownFile.createdAt,
            guides: [],
          }
          page.entities.pushIfNotExist(entity, function (e) {
            return e.label === entity.label
          })
        }
        // push each file in category and entity
        page.entities.forEach((entity) => {
          if (entity.label === markdownFile.entity) {
            entity.guides.push(markdownFile)
          }
        })
        page.entities.sort((a, b) => (a.label > b.label ? 1 : -1))
      }
    })

    // set number of guides for each type
    pages.forEach((page) => {
      let pageNb = 0
      for (let i = 0; i < page.entities.length; i++) {
        const entities = page.entities[i]
        pageNb += entities.guides.length
      }
      page.number = pageNb
    })

    const currentPage = pages.find((page) => page.label === params.category)
    currentPage.entities.sort((a, b) =>
      a.position > b.position ? 1 : b.position > a.position ? -1 : 0
    )

    return {
      pages,
      currentPage,
    }
  },
  data() {
    return {
      currentOpened: null,
      switched: false,
    }
  },
  head() {
    const title = `${this.$t(this.currentPage.label)} - ${this.$t(
      this.$route.params.type
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
  methods: {
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
    imgError(event) {
      event.target.src = require(`~/static/documentation/logo/guides.webp`)
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
