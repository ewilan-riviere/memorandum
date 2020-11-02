<template>
  <div>
    <main-layout>
      <div slot="aside">
        <nav-pages :pages="pages"></nav-pages>
      </div>
      <div slot="main">
        <div v-for="page in pages" :key="page.id">
          {{ page }}
        </div>
      </div>
      <div slot="toc"></div>
    </main-layout>
  </div>
</template>

<script>
import NavPages from '@/components/layout/NavPages.vue'

export default {
  name: 'HomeIndex',
  components: {
    NavPages,
  },
  async asyncData({ $content }) {
    const content = await $content('documentation', { deep: true })
      .only(['title'])
      .fetch()

    let pages = []
    content.forEach((markdownFile) => {
      const path = markdownFile.path.replace('/documentation/', '').split('/')
      const Page = {
        label: path[0],
        guides: [],
        number: 0,
      }
      pages.push(Page)
    })

    console.log(pages)
    const pagesAll = pages

    // delete duplicates
    pages = pages.filter(
      (v, i, a) => a.findIndex((t) => t.label === v.label) === i
    )
    // alphabetic sorting
    pages.sort((a, b) => (a.label > b.label ? 1 : -1))

    pagesAll.forEach((pageA) => {
      pages.forEach((page) => {
        if (pageA.label === page.label) {
          page.number += 1
        }
      })
    })

    console.log(pages)
    return {
      pages,
    }
  },
}
</script>
