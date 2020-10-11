<template>
  <div>
    <main-layout>
      <div slot="aside">
        <category-collapse
          v-for="(category, categoryId) in $store.state.content"
          :key="categoryId"
          :ref="`collapse-${categoryId}`"
          class="mb-4"
          :expanded="categoryId === 0"
          @click.native="changeCollapse(categoryId)"
        >
          <h3
            slot="title"
            class="text-sm font-bold tracking-wider text-gray-500 uppercase lg:text-xs"
          >
            {{ $t(category.label) }}
          </h3>
          <ul slot="list" class="ml-2">
            <li
              v-for="guide in category.guides"
              :key="guide.id"
              class="text-gray-700 transition-colors duration-300 rounded-md dark:text-gray-300 hover:bg-green-200 hover:bg-opacity-50"
            >
              <nuxt-link
                :to="{
                  name: 'documentation-type',
                  params: {
                    type: guide.category,
                    link: guide.label,
                  },
                }"
                class="flex items-center justify-between px-2 py-1 font-medium rounded hover:text-primary-500"
              >
                {{ $t(guide.label) }}
              </nuxt-link>
            </li>
          </ul>
        </category-collapse>
      </div>
      <article slot="main" class="max-w-none lg:px-8">
        <h1 class="flex items-center justify-between">
          <div class="text-4xl font-quicksand title">Welcome</div>
        </h1>
        <div class="my-10 nuxt-content-container">
          <div class="my-4 text-gray-400">
            <img
              src="/icon-fit.png"
              alt=""
              class="object-cover w-2/5 my-1 text-sm"
            />
            <div class="flex items-center">
              <icon name="camera" :size="25" />
              <div class="ml-1">Memo, AI of Memorandum</div>
            </div>
          </div>
          <div
            class="prose nuxt-content md:word-wraping dark:prose-dark"
            lang="en"
          >
            Memorandum is a personal documentation about my projects and
            languages I like, I propose topics with examples, copy/paste code,
            boiler plates... all organized by your servant, Memo.
          </div>
          <list :items="bullets" class="mt-5"></list>
          <div class="mt-5 text-xl font-handlee-regular">
            <div class="ml-auto w-max-content">Ewilan Rivière</div>
          </div>
        </div>
      </article>
    </main-layout>
  </div>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout.vue'

export default {
  name: 'Home',
  components: {
    MainLayout,
  },
  async asyncData({ $content, store }) {
    // eslint-disable-next-line no-unused-vars
    let contentCategory = []
    if (store.state.content && store.state.content.length < 1) {
      const content = await $content('documentation', { deep: true })
        .only(['title', 'slug', 'date'])
        .sortBy('date', 'desc')
        .fetch()

      // setup categories with first part of path
      let subCategories = []
      content.forEach((guide) => {
        const path = guide.path.replace('/documentation/', '').split('/')
        const Category = {
          label: path[0],
          guides: [],
        }
        const SubCategory = {
          label: path[1],
          category: path[0],
        }
        contentCategory.push(Category)
        subCategories.push(SubCategory)
      })
      // delete duplicates
      contentCategory = contentCategory.filter(
        (v, i, a) => a.findIndex((t) => t.label === v.label) === i
      )
      // alphabetic sorting
      contentCategory.sort((a, b) => (a.label > b.label ? 1 : -1))

      // delete duplicates
      subCategories = subCategories.filter(
        (v, i, a) => a.findIndex((t) => t.label === v.label) === i
      )
      // alphabetic sorting
      subCategories.sort((a, b) => (a.label > b.label ? 1 : -1))

      // add subcategory to category
      subCategories.forEach((subCategory) => {
        for (let i = 0; i < contentCategory.length; i++) {
          const category = contentCategory[i]
          if (category.label === subCategory.category) {
            category.guides.push(subCategory)
          }
        }
      })

      store.commit('setContent', contentCategory)
    }
  },
  data() {
    return {
      collapseOpened: 0,
      bullets: [
        'Explicit topics with examples',
        'Copy and paste code',
        'Boiler plates',
        'Built with NuxtJS',
      ],
    }
  },
  methods: {
    changeCollapse(categoryId) {
      this.$refs[`collapse-${this.collapseOpened}`][0].toggle()
      this.collapseOpened = categoryId
    },
  },
}
</script>
