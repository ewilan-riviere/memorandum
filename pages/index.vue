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
    }
  },
}
</script>
