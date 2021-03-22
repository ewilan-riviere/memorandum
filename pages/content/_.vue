<template>
  <div v-if="document">
    <layout-main
      :image="$slugify(document.pathsObj.entity)"
      :back-route="{
        name: 'type-slug',
        params: { type: document.pathsObj.type },
      }"
    >
      <div slot="aside">
        <nuxt-link
          v-for="otherdocument in otherDocuments"
          :key="otherdocument.id"
          :to="otherdocument.path"
          :class="
            otherdocument.title === document.title
              ? 'bg-primary-500 bg-opacity-25'
              : ''
          "
          class="block p-1 my-1 font-semibold transition-colors duration-300 rounded-md hover:bg-opacity-50 hover:bg-primary-500"
        >
          {{ otherdocument.position }}. {{ otherdocument.title }}
        </nuxt-link>
      </div>
      <div slot="title">
        <p
          class="text-base font-semibold leading-6 tracking-wide text-center text-indigo-600 uppercase"
        >
          {{ document.category }}
        </p>
        <h1
          class="mt-2 mb-8 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-800 sm:text-4xl sm:leading-10"
        >
          {{ document.title }}
        </h1>
      </div>
      <div slot="main" class="">
        <client-only>
          <vue-read-progress></vue-read-progress>
        </client-only>
        <transition name="fade">
          <article v-if="document" class="relative overflow-hidden bg-white">
            <div class="relative mx-auto prose prose-lg">
              <div
                v-if="document.description"
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
                  v-html="document.description"
                ></p>
              </div>
              <div class="flex items-center justify-between my-1 text-gray-600">
                <div class="flex items-center">
                  <icon name="clock" stroke class="mr-1" />
                  {{ document.readingTime.text }}
                </div>
                <div class="flex items-center">
                  <icon name="date" stroke class="mr-1" />
                  Last update: {{ $getDate(document.updatedAt) }}
                </div>
              </div>
              <div class="mx-auto mt-5 prose prose-lg text-gray-500">
                <client-only>
                  <!-- <nuxt-content :document="document" /> -->
                  <display-document :document="document" />
                </client-only>
              </div>
            </div>
          </article>
        </transition>
      </div>
      <div slot="toc">
        <table-of-content :toc="document.toc"></table-of-content>
      </div>
    </layout-main>
  </div>
</template>

<script>
export default {
  name: 'ContentSlugShort',
  // middleware({ app, params, redirect }) {
  //   if (params.pathMatch === 'index') {
  //     redirect(app.localePath('/'))
  //   }
  // },
  async asyncData({ $content, store, app, params, error }) {
    const path = `/${params.pathMatch || 'index'}`
    const [document] = await $content({ deep: true }).where({ path }).fetch()
    if (!document) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    const pathArray = document.path.split('/')
    pathArray.splice(0, 1)
    pathArray.splice(pathArray.length - 1, 1)
    const otherDocumentsPath = pathArray.join('/')
    const otherDocuments = await $content(otherDocumentsPath, {
      deep: true,
    })
      .only(['title', 'path', 'extension', 'position'])
      .sortBy('position')
      .fetch()

    // const [prev, next] = await $content({ deep: true })
    //   .only(['title', 'path', 'to'])
    //   .sortBy('position', 'asc')
    //   .surround(document.path, { before: 1, after: 1 })
    //   .fetch()

    return {
      document,
      otherDocuments,
      // prev,
      // next,
    }
  },
  head() {
    const title = this.document
      ? `${this.document.title} in ${this.document.category}`
      : 'unknown'
    const description = this.document
      ? this.document.description
        ? this.document.description
        : 'No description'
      : 'unknown'
    const image = this.document
      ? `${process.env.APP_URL}/documentation/logo/${this.$slugify(
          this.document.category
        )}.webp`
      : 'unknown'
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
