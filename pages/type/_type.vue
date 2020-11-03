<template>
  <div>
    <main-layout>
      <div slot="aside">
        <nav-pages :pages="pages" route-param="type"></nav-pages>
      </div>
      <div slot="main" class="pl-4">
        <div v-for="page in pages" :key="page.id" class="my-10">
          <div class="text-2xl">
            {{ page.label }}
          </div>
          <div
            v-for="entity in page.entities"
            :key="entity.id"
            class="p-2 my-5 bg-gray-200 rounded-sm"
          >
            <div class="text-xl">
              {{ entity.label }}
            </div>
            <div
              v-for="(guide, guideId) in entity.guides"
              :key="guideId"
              class="my-1"
            >
              {{ guideId + 1 }} {{ guide.title }}
            </div>
          </div>
        </div>
      </div>
      <div slot="toc"></div>
    </main-layout>
  </div>
</template>

<script>
import NavPages from '@/components/layout/NavPages.vue'

export default {
  name: 'TypeSlug',
  components: {
    NavPages,
  },
  async asyncData({ $content, params }) {
    const content = await $content(`documentation/${params.type}`, {
      deep: true,
    })
      .only(['title'])
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
    }
  },
}
</script>
