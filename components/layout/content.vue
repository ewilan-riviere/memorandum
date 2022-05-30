<script setup lang="ts">
import { useContentStore } from '~~/store/content'
import { slugify } from '~~/utils/methods'

const route = useRoute()

const store = useContentStore()
const content = ref()
const loading = ref(false)

const getContent = async () => {
  loading.value = true
  const contentQuery = queryContent(route.path)
  content.value = await contentQuery.findOne()
  store.setDocumentation(content.value)
  loading.value = false
}
await getContent()

const slug = computed(() => {
  const path = route.path
  const parse = path.split('/')
  parse.pop()
  const category = parse.pop()
  if (category) {
    return slugify(category)
  }
})

watch(
  () => route.path,
  async (newVal) => {
    await getContent()
  }
)
</script>

<template>
  <article class="relative">
    <div
      v-if="loading"
      class="fixed z-50 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <app-loading />
    </div>
    <div v-if="loading" class="bg-gray-900 opacity-90 inset-0 fixed z-40"></div>
    <div>
      <div>
        <app-lazy-img
          class="h-32 w-full object-cover lg:h-48"
          :src="`/content/banner/${slug}.webp`"
          default="/content/banner/default.webp"
        />
      </div>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div class="flex">
            <app-lazy-img
              class="h-24 w-24 rounded-full ring-4 ring-gray-800 sm:h-32 sm:w-32 bg-gray-800"
              :src="`/content/logo/${slug}.webp`"
            />
          </div>
          <div
            class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
          >
            <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
              <h1 class="text-2xl font-bold text-gray-100 truncate">
                {{ content.title }}
              </h1>
            </div>
          </div>
        </div>
        <div class="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
          <h1 class="text-2xl font-bold text-gray-100 truncate">
            {{ content.title }}
          </h1>
        </div>
      </div>
    </div>

    <div class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {{ content.description }}
    </div>

    <div class="flex px-4 lg:px-8 xl:px-16 py-6">
      <div class="xl:flex mx-auto w-max">
        <app-toc :toc="content.body.toc" class="order-2" />
        <div
          class="prose prose-lg prose-invert w-full xl:max-w-4xl order-1 xl:mr-5"
        >
          <ContentRenderer :value="content">
            <template #not-found>
              <h1 class="text-2xl">Page not found</h1>
            </template>
          </ContentRenderer>
        </div>
      </div>
    </div>
  </article>
</template>
