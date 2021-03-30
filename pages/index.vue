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
              <img
                src="/open-graph.jpg"
                class="light-img"
                width="1280"
                height="640"
                alt=""
              />
            </div>
            <div class="max-w-xl mx-auto mt-10 text-gray-500">
              <h1 class="text-3xl font-semibold text-center font-quicksand">
                Welcome to Memorandum
              </h1>
              <h2 class="mt-2 text-xl text-center font-quicksand">
                A custom documentation about technologies, frameworks &
                languages and my projects...
              </h2>
            </div>
            <div class="mx-auto mt-16 prose prose-lg text-gray-500">
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
import { getPages } from '~/plugins/pages'

export default {
  name: 'HomeIndex',
  async asyncData({ $content, $store }) {
    const welcome = await $content('welcome', { deep: true }).fetch()

    return {
      welcome,
    }
  },
  data() {
    return {
      pages: [],
      items: [],
    }
  },
  head() {
    return {
      title: 'Memorandum',
      titleTemplate: '',
      link: [
        {
          rel: 'canonical',
          href: `${process.env.APP_URL}`,
        },
      ],
    }
  },
  async created() {
    await getPages(this.$content, this.$store)
    if (this.$store.state.pages) {
      this.pages = this.$store.state.pages
    }
  },
}
</script>
