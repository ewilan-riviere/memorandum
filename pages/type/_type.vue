<template>
  <div>
    <main-layout>
      <div slot="aside">
        <switch-categories
          :pages="pages"
          route-param="type"
          @select-category="selectCategory"
        ></switch-categories>
      </div>
      <div slot="main" class="">
        <div class="">
          <h2
            class="p-2 mb-5 ml-2 text-2xl font-bold rounded-md font-quicksand title w-max-content"
          >
            {{ $t(selectedCategory.label) }}
          </h2>
          <div class="overflow-hidden bg-white shadow sm:rounded-md">
            <ul>
              <category-collapse
                v-for="(entity, entityId) in selectedCategory.entities"
                :id="`collapse-${entityId}`"
                :key="entityId"
                :ref="`collapse-${entityId}`"
                class="cursor-pointer"
                :class="{
                  'bg-green-400 bg-opacity-50': currentOpened === entityId,
                }"
                @click.native="switchAccordion(entityId)"
              >
                <div
                  slot="title"
                  class="block transition duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:bg-gray-50"
                >
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div
                      class="flex items-center justify-between flex-1 min-w-0"
                    >
                      <div class="flex items-center">
                        <div class="flex-shrink-0">
                          <client-only>
                            <img
                              class="w-12 h-12"
                              :src="`/documentation/logo/${$slugify(
                                entity.label
                              )}.webp`"
                              alt=""
                              @error="imgError"
                            />
                          </client-only>
                        </div>
                        <div class="min-w-0 px-4">
                          <div>
                            <div
                              class="text-lg font-semibold leading-5 text-gray-800 truncate"
                            >
                              {{ $t(entity.label) }}
                            </div>
                            <div></div>
                          </div>
                        </div>
                      </div>
                      <!-- <div>
                        {{ $o(entity.label).description }}
                        {{ $o(entity.label).link }}
                      </div> -->
                    </div>
                    <div>
                      <svg
                        class="w-5 h-5 text-gray-400 transition-transform duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        :class="{ 'rotate-arrow': currentOpened === entityId }"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div slot="list" class="ml-2">
                  <list-guide :guides="entity.guides"></list-guide>
                </div>
              </category-collapse>
            </ul>
          </div>
        </div>
      </div>
      <div slot="toc"></div>
    </main-layout>
  </div>
</template>

<script>
import SwitchCategories from '@/components/layout/SwitchCategories.vue'
// eslint-disable-next-line no-unused-vars
import groupBy from 'lodash/groupBy'
import ListGuide from '@/components/blocks/ListGuide.vue'

export default {
  name: 'TypeSlug',
  components: {
    SwitchCategories,
    ListGuide,
  },
  async asyncData({ $content, params }) {
    const content = await $content(`documentation/${params.type}`, {
      deep: true,
    })
      .only(['title', 'description', 'path', 'readingTime'])
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

    return {
      pages,
      selectedCategory: pages[0],
    }
  },
  data() {
    return {
      currentOpened: null,
      switched: false,
    }
  },
  methods: {
    switchAccordion(id) {
      for (let i = 0; i < this.selectedCategory.entities.length; i++) {
        this.$refs[`collapse-${i}`][0].false()
      }
      if (this.currentOpened === id && this.switched === false) {
        this.$refs[`collapse-${id}`][0].false()
        this.switched = true
      } else {
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
      for (let i = 0; i < this.selectedCategory.entities.length; i++) {
        this.$refs[`collapse-${i}`][0].false()
      }
      const category = this.pages.filter((page) => page.label === data)
      this.selectedCategory = category[0]
      this.$scrollTo('#__nuxt', 500)
    },
  },
  head() {
    const title = `${this.$t(this.selectedCategory.label)} - ${this.$t(
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
}
</script>

<style scoped>
.rotate-arrow {
  transform: rotate(90deg);
}
</style>
