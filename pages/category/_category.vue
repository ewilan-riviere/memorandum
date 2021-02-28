<template>
  <div>
    <layout-main>
      <div slot="aside">
        <!-- <nav-pages :pages="pages"></nav-pages> -->
      </div>
      <div slot="main">
        <!-- <div v-for="page in pages" :key="page.id">
          {{ page }}
        </div> -->
        {{ $route.params.slug }}
      </div>
      <div slot="toc"></div>
    </layout-main>
  </div>
</template>

<script>
export default {
  name: 'CategorySlug',
  async asyncData({ $content, params }) {
    const content = await $content(`documentation/${params.slug}`, {
      deep: true,
    })
      .only(['title'])
      .fetch()

    let pages = []
    content.forEach((markdownFile) => {
      const path = markdownFile.path.replace('/documentation/', '').split('/')
      const Page = {
        label: path[0],
        guides: [],
        number: 0,
        route: 'category-slug',
      }
      pages.push(Page)
    })

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

    // pages.unshift({ label: 'Home', iconStroke: false, route: 'home' })

    return {
      pages,
    }
  },
}
</script>
