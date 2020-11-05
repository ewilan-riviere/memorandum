<template>
  <div>
    <main-layout>
      <div slot="aside">
        <nav-pages :pages="pages" route-param="type"></nav-pages>
      </div>
      <div slot="main">
        <article class="relative pb-10 overflow-hidden bg-white">
          <div class="relative px-4 sm:px-6 lg:px-8">
            <div class="mx-auto prose prose-lg text-gray-500">
              <nuxt-content :document="welcome" />
            </div>
          </div>
        </article>
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
  head() {
    return {
      title: 'Memorandum',
      titleTemplate: '',
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
          content: 'Memorandum',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Personal documentation, in nuxt/content, on several languages, frameworks and many other topics in web & mobile development.',
        },
        { property: 'og:image', content: '/logo/preview.png' },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Memorandum',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Personal documentation, in nuxt/content, on several languages, frameworks and many other topics in web & mobile development.',
        },
        { property: 'twitter:image', content: '/logo/preview.png' },
      ],
    }
  },
}
</script>
