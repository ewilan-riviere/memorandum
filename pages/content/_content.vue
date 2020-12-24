<template>
  <div>
    <main-layout
      :image="$slugify(article.pathsObj.entity)"
      :back-route="{
        name: 'type-slug',
        params: { type: article.pathsObj.type },
      }"
    >
      <div slot="aside">
        {{ article.pathsObj.entity }}
        <nuxt-link
          v-for="otherArticle in otherArticles"
          :key="otherArticle.id"
          :to="getRoute(otherArticle)"
          :class="
            otherArticle.title === article.title
              ? 'bg-primary-500 bg-opacity-25'
              : ''
          "
          class="block p-1 my-1 font-semibold transition-colors duration-300 rounded-md hover:bg-opacity-50 hover:bg-primary-500"
        >
          {{ otherArticle.position }}. {{ otherArticle.title }}
        </nuxt-link>
      </div>
      <div slot="title">
        <p
          class="text-base font-semibold leading-6 tracking-wide text-center text-indigo-600 uppercase"
        >
          {{ article.category }}
        </p>
        <h1
          class="mt-2 mb-8 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-800 sm:text-4xl sm:leading-10"
        >
          {{ article.title }}
        </h1>
      </div>
      <div slot="main" class="">
        <!-- <client-only>
          <read-progress></read-progress>
        </client-only> -->
        <transition name="fade">
          <article v-if="article" class="relative overflow-hidden bg-white">
            <div class="relative mx-auto prose prose-lg">
              <div
                v-if="article.description"
                class="relative mx-auto mb-6 text-lg font-medium leading-7 md:flex-grow max-w-prose"
              >
                <svg
                  class="absolute top-0 left-0 w-8 h-8 text-gray-200 transform -translate-y-2"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
                  />
                </svg>
                <p
                  class="relative pl-3 text-xl leading-8 text-gray-500"
                  v-html="article.description"
                ></p>
              </div>
              <div class="flex items-center justify-between my-1 text-gray-600">
                <div class="flex items-center">
                  <icon name="clock" stroke class="mr-1" />
                  {{ article.readingTime.text }}
                </div>
                <div class="flex items-center">
                  <icon name="date" stroke class="mr-1" />
                  Last update: {{ getDate(article.updatedAt) }}
                </div>
              </div>
              <div class="mx-auto prose prose-lg text-gray-500">
                <display-document :document="article" />
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
import DisplayDocument from '~/components/blocks/DisplayDocument.vue'
export default {
  name: 'ContentSlug',
  components: { DisplayDocument },
  // components: {
  //   ReadProgress: () =>
  //     import('vue-read-progress')
  //       .then((m) => m.default)
  //       .catch(),
  // },
  async asyncData({ $content, params, route }) {
    let basePath = 'documentation'
    if (route.name === 'content-slug-short') {
      basePath = ''
    }
    const path = `${basePath}/${route.fullPath}`
    const article = await $content(path).fetch()

    let fullPath = route.fullPath.split('/')
    fullPath.splice(0, 1)
    fullPath.pop()
    fullPath = fullPath.join('/')
    const otherArticles = await $content(`documentation/${fullPath}`, {
      deep: true,
    })
      .only(['title', 'path', 'extension', 'position'])
      .sortBy('position')
      .fetch()

    // otherArticles = otherArticles.filter(
    //   (otherArticle) => otherArticle.title !== article.title
    // )

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
    action(e) {
      console.log(e)
    },
    getDate(date) {
      let userLang = 'en-US'
      if (process.client) {
        userLang = navigator.language || navigator.userLanguage
      }
      const options = {
        year: 'numeric',
        // weekday: 'long',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric',
      }
      return new Date(date).toLocaleString(userLang, options)
    },
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
    const title = `${this.article.title} - ${this.article.category}`
    const description = this.article.description
      ? this.article.description
      : 'No description'
    const image = `${process.env.APP_URL}/documentation/logo/${this.$slugify(
      this.article.category
    )}.webp`
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: image,
        },
      ],
    }
  },
}
</script>
