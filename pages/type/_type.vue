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
          <category-collapse
            v-for="(entity, entityId) in selectedCategory.entities"
            :key="entityId"
            class="p-2 my-5 rounded-sm"
            :expanded="entityId === 0"
          >
            <h3
              slot="title"
              class="text-sm font-bold tracking-wider text-gray-500 uppercase lg:text-xs"
            >
              <!-- {{ $t(category.label) }} -->
              {{ entity.label }}
            </h3>
            <div slot="list" class="ml-2">
              <list-guide :guides="entity.guides"></list-guide>
            </div>
          </category-collapse>
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
  methods: {
    selectCategory(data) {
      const category = this.pages.filter((page) => page.label === data)
      this.selectedCategory = category[0]
    },
  },
}
</script>
