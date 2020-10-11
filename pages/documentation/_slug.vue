<template>
  <div>
    <main-layout>
      <div slot="aside">
        <li class="mb-4">
          <h3
            class="mb-2 text-sm font-bold tracking-wider text-gray-500 uppercase lg:text-xs"
          >
            {{ $t($route.params.slug) }}
          </h3>
          <ul>
            <li
              v-for="(guide, guideId) in guides"
              :key="guideId"
              :class="{
                'bg-green-300 bg-opacity-50': guide.slug === currentGuide.slug,
              }"
              class="my-1 text-gray-700 transition-colors duration-300 rounded-md cursor-pointer dark:text-gray-300 hover:bg-green-200 hover:bg-opacity-50"
              @click="changeGuide(guide)"
            >
              <span
                class="flex items-center justify-between px-2 py-1 font-medium rounded hover:text-primary-500"
              >
                {{ $t(guide.title ? guide.title : guide.slug) }}
              </span>
            </li>
          </ul>
        </li>
      </div>
      <article slot="main" class="max-w-none lg:px-8">
        <transition name="fade">
          <div v-if="currentGuide">
            <h1 class="flex items-center justify-between">
              <div class="text-4xl font-quicksand title">
                {{
                  currentGuide.title ? currentGuide.title : currentGuide.slug
                }}
              </div>
            </h1>
            <div class="my-10 nuxt-content-container">
              <nuxt-content :document="currentGuide" />
            </div>
          </div>
        </transition>
      </article>
      <div slot="toc">
        <nav class="py-4 lg:py-8 lg:pl-8 lg:pr-2">
          <h3
            class="mb-3 text-sm font-bold tracking-wider text-gray-500 uppercase lg:mb-2 lg:text-xs"
          >
            On this page
          </h3>
          <ul class="scrollactive-nav">
            <li
              v-for="link of currentGuide.toc"
              :key="link.id"
              :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
              class="text-gray-700 border-t border-dashed dark:text-gray-300 dark:border-gray-800 first:border-t-0"
            >
              <NuxtLink
                :to="`#${link.id}`"
                class="block py-2 text-sm duration-300 ease-in-out scrollactive-item transition-padding hover:pl-1 text-primary-500"
              >
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </main-layout>
  </div>
</template>

<script>
export default {
  name: 'GuidesSlug',
  // eslint-disable-next-line require-await
  async asyncData({ $content, params }) {
    const guides = await $content(
      `documentation/${params.type}/${params.category}/${params.slug}`,
      {
        deep: true,
      }
    )
      .sortBy('slug')
      .fetch()

    return { guides }
  },
  data() {
    return {
      currentGuide: {},
    }
  },
  mounted() {
    if (this.guides[0] === undefined) {
      this.currentGuide = this.guides
    } else {
      this.currentGuide = this.guides[0]
    }
  },
  methods: {
    changeGuide(guide) {
      this.currentGuide = false
      setTimeout(() => {
        this.currentGuide = guide
      }, 250)
    },
  },
  head() {
    return {
      title: `${this.$t(
        this.$route.params.category.charAt(0).toUpperCase() +
          this.$route.params.category.slice(1)
      )}: ${this.$t(
        this.$route.params.slug.charAt(0).toUpperCase() +
          this.$route.params.slug.slice(1)
      )} · Documentation for ${this.$t(
        this.$route.params.type.charAt(0).toUpperCase() +
          this.$route.params.type.slice(1)
      )}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Ma description personnalisée',
        },
      ],
    }
  },
}
</script>
