<template>
  <div>
    <main-layout>
      <div slot="aside">
        <nuxt-link
          v-for="article in otherArticles"
          :key="article.id"
          :to="getRoute(article)"
          class="block p-1 my-1 font-semibold transition-colors duration-300 rounded-md hover:bg-opacity-50 hover:bg-primary-500"
        >
          {{ article.title }}
        </nuxt-link>
      </div>
      <div slot="main" class="pl-4">
        <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
        <!-- This component requires Tailwind CSS >= 1.5.1 and @tailwindcss/ui >= 0.4.0 -->
        <transition name="fade">
          <article v-if="article" class="relative overflow-hidden bg-white">
            <div class="relative">
              <div class="mx-auto mb-6 text-lg max-w-prose">
                <p
                  class="text-base font-semibold leading-6 tracking-wide text-center text-indigo-600 uppercase"
                >
                  {{ article.category }}
                </p>
                <h1
                  class="mt-2 mb-8 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl sm:leading-10"
                >
                  {{ article.title }}
                </h1>
                <p
                  class="text-xl leading-8 text-gray-500"
                  v-html="article.description"
                ></p>
              </div>
              <div class="mx-auto prose prose-lg text-gray-500">
                <nuxt-content :document="article" />
              </div>
            </div>
          </article>
        </transition>
      </div>
      <div slot="toc">
        <app-toc :toc="article.toc"></app-toc>
      </div>
    </main-layout>
  </div>
</template>

<script>
export default {
  name: 'ContentSlug',
  async asyncData({ $content, params, route }) {
    const path = `documentation/${route.fullPath}`
    const article = await $content(path).fetch()

    let fullPath = route.fullPath.split('/')
    fullPath.splice(0, 1)
    fullPath.pop()
    fullPath = fullPath.join('/')
    let otherArticles = await $content(`documentation/${fullPath}`, {
      deep: true,
    })
      .only(['title'])
      .sortBy('position')
      .fetch()

    otherArticles = otherArticles.filter(
      (otherArticle) => otherArticle.title !== article.title
    )

    return {
      article,
      otherArticles,
    }
  },
  data() {
    return {
      currentArticle: {},
    }
  },
  methods: {
    setCurrentArticle() {
      this.currentArticle = this.article
    },
    getRoute(guide) {
      const path = guide.path.replace('/documentation/', '').split('/')
      const route = {
        name: 'content-slug',
        params: {
          type: path[0],
          category: path[1],
          entity: path[2],
          content: path[3],
        },
      }
      switch (path.length) {
        case 3:
          route.params = {
            type: path[0],
            // category: path[1],
            entity: path[1],
            content: path[2],
          }
          break

        default:
          route.params = {
            type: path[0],
            category: path[1],
            entity: path[2],
            content: path[3],
          }
          break
      }
      return route
    },
  },
  head() {
    return {
      title: `${this.article.title} - ${this.article.category}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.article.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.article.description,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.article.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.article.description,
        },
      ],
    }
  },
}
</script>
