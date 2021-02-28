<template>
  <div>
    <layout-main>
      <div slot="aside">
        <nav-pages :pages="pages" route-param="type"></nav-pages>
      </div>
      <div slot="main">
        <article class="relative pb-10 overflow-hidden bg-white">
          <div class="relative px-4 sm:px-6 lg:px-8">
            <div class="mx-auto prose prose-lg text-gray-500">
              <display-document :document="welcome" />
            </div>
          </div>
        </article>
      </div>
      <div slot="toc"></div>
    </layout-main>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  async asyncData({ $content }) {
    const welcome = await $content('welcome', { deep: true }).fetch()
    const content = await $content('documentation', { deep: true })
      .only(['title', 'path'])
      .fetch()

    let pages = []
    content.forEach((markdownFile) => {
      const path = markdownFile.path.replace('/documentation/', '').split('/')
      const Page = {
        label: path[0],
        guides: [],
        number: 0,
        route: 'type-slug',
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
      welcome,
      pages,
    }
  },
  data() {
    return {
      items: [],
    }
  },
  head() {
    return {
      title: 'Memorandum',
      titleTemplate: '',
    }
  },
}
</script>
