<template>
  <layout-page :entities="guides" type="guides">
    <template #document>
      <div class="article-header">
        <div class="relative w-full h-40">
          <div class="article-header__source" style="z-index: -1">
            <app-md-img
              :src="`/documentation/logo/${guide.hierarchy.subject}-banner.webp`"
              class="object-cover object-center w-full opacity-25 h-40"
            />
            <div
              class="absolute z-10 w-full text-2xl italic text-center"
              style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
            >
              <h2>
                {{ $t(guide.hierarchy.subject) }}
              </h2>
              <h1>
                {{ guide.title }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div class="py-4 lg:pt-8 lg:pb-8 lg:px-8">
        <div
          v-if="guide.description"
          class="
            relative
            mx-auto
            mb-6
            text-lg
            font-medium
            leading-7
            md:flex-grow
            mt-3
          "
        >
          <svg
            class="
              absolute
              top-0
              left-0
              w-8
              h-8
              text-gray-200
              transform
              -translate-y-2
              dark:text-gray-600
            "
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path
              d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
            />
          </svg>
          <p
            class="
              relative
              pl-3
              text-xl
              leading-8
              text-gray-500
              dark:text-gray-400
            "
            v-html="guide.description"
          ></p>
        </div>
        <div
          class="
            flex
            items-center
            justify-between
            my-1
            text-gray-600
            dark:text-gray-400
          "
        >
          <div v-if="guide.readingTime" class="flex items-center">
            <svg-icon name="clock" class="mr-1 w-6 h-6" />
            {{ guide.readingTime.text }}
          </div>
          <div class="flex items-center">
            <svg-icon name="date" class="mr-1 w-6 h-6" />
            Last update: {{ $getDate(guide.updatedAt) }}
          </div>
        </div>
      </div>
      <app-article-block :document="guide" />
    </template>
    <template #toc>
      <app-toc :toc="guide.toc" />
    </template>
  </layout-page>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

import AppCopyButton from '~/components/app/copy-button'

export default {
  name: 'PageSlug',
  // layout({ store }) {
  //   return store.state.settings.layout || 'default'
  // },
  middleware({ app, params, redirect }) {
    if (params.pathMatch === 'index') {
      // redirect(app.localePath('/'))
      redirect('/')
    }
  },
  async asyncData({ $content, store, app, params, error }) {
    // let path = `/${params.pathMatch || 'index'}`
    // path = path.replace(/\/$/, '')
    // const [document] = await $content({ deep: true }).where({ path }).fetch()

    // if (document) {

    //   return {
    //     document,
    //     otherDocuments,
    //   }
    // } else {
    //   return {
    //     document: {},
    //     otherDocuments: [],
    //   }
    // }
    // const path = `/${app.i18n.locale}/${params.pathMatch || 'index'}`
    const path = `/${params.pathMatch || 'index'}`
    const [guide] = await $content({ deep: true }).where({ path }).fetch()
    if (!guide) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    const pathArray = guide.path.split('/')
    pathArray.splice(0, 1)
    pathArray.splice(pathArray.length - 1, 1)
    const guidesPath = pathArray.join('/')
    const guides = await $content(guidesPath, {
      deep: true,
    })
      .only(['title', 'slug', 'path', 'extension', 'position'])
      .sortBy('position')
      .fetch()

    // const [prev, next] = await $content(app.i18n.locale, { deep: true })
    const [prev, next] = await $content({ deep: true })
      .only(['title', 'path', 'to'])
      .sortBy('position', 'asc')
      .surround(guide.path, { before: 1, after: 1 })
      .fetch()

    return {
      guide,
      prev,
      next,
      guides,
    }
  },
  data() {
    return {
      hierarchy: {},
      params: {},
      current: null,
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
    const meta = require('@/plugins/config/metadata')
    const title = `${this.$t(this.current)} for ${this.$t(
      this.hierarchy.subject
    )} in ${this.$t(this.hierarchy.domain)}`
    const image = `${this.$config.baseURL}/documentation/logo/${this.guide.hierarchy.subject}-banner.webp`
    return {
      title,
      meta: [
        ...dynamicMetadata({
          title,
          description: this.guide.description || meta.settings.description,
          url: this.$nuxt.$route.path,
          image,
        }),
      ],
    }
  },
  computed: {
    ...mapGetters(['settings']),
  },
  mounted() {
    // if (this.document.version) {
    //   localStorage.setItem(
    //     `document-${this.document.slug}-version`,
    //     this.document.version
    //   )
    // }
    let params = { ...this.$route.params }
    params = params.pathMatch.split('/')
    this.current = params[3]
    this.params = params
    this.hierarchy = {
      category: this.params[0],
      domain: this.params[1],
      subject: this.params[2],
    }

    setTimeout(() => {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')

      for (const block of blocks) {
        const CopyButton = Vue.extend(AppCopyButton)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    }, 100)
  },
}
</script>
