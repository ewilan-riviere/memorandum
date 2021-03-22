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
                src="/logo/preview.png"
                class="light-img"
                width="1280"
                height="640"
                alt=""
              />
            </div>
            <div class="mx-auto mt-10 text-gray-500 max-w-prose">
              <h1 class="text-3xl font-semibold font-quicksand">
                Welcome to Memorandum, a documentation about my favorites
                frameworks & languages...
              </h1>
            </div>
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
  async created() {
    await getPages(this.$content, this.$store)
    if (this.$store.state.pages) {
      this.pages = this.$store.state.pages
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
}
</script>
