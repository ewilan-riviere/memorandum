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
          <div class="text-2xl">
            {{ selectedCategory.label }}
          </div>
          <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
          <div class="overflow-hidden bg-white shadow sm:rounded-md">
            <ul>
              <category-collapse
                v-for="(entity, entityId) in selectedCategory.entities"
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
                    <div class="flex items-center flex-1 min-w-0">
                      <div class="flex-shrink-0">
                        <client-only>
                          <img
                            class="w-12 h-12"
                            :src="`/images/documentation/${entity.label}.png`"
                            alt=""
                            @error="imgError"
                          />
                        </client-only>
                      </div>
                      <div class="min-w-0 px-4">
                        <div>
                          <div
                            class="text-lg font-medium leading-5 text-indigo-600 truncate"
                          >
                            {{ entity.label }}
                          </div>
                          <div>
                            <!-- <p v-if="guide.description" v-html="guide.description"></p>
                    <span v-else class="italic text-gray-400">
                      No description
                    </span> -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <!-- Heroicon name: chevron-right -->
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
      .only(['title', 'description'])
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
      this.$scrollTo('#__nuxt', 500)
    },
    imgError(event) {
      event.target.src = require(`~/static/images/documentation/guides.png`)
    },
    selectCategory(data) {
      for (let i = 0; i < this.selectedCategory.entities.length; i++) {
        this.$refs[`collapse-${i}`][0].false()
      }
      const category = this.pages.filter((page) => page.label === data)
      this.selectedCategory = category[0]
    },
  },
}
</script>

<style scoped>
.rotate-arrow {
  transform: rotate(90deg);
}
</style>
