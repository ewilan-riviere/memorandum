<script setup lang="ts">
import { useContentStore } from '~~/store/content'
import { slugify } from '~~/utils/methods'

const route = useRoute()

const store = useContentStore()
const document = ref()

const getContent = async () => {
  const contentQuery = queryContent(route.path)
  document.value = await contentQuery.findOne()
  store.setDocumentation(document.value)
}
await getContent()

const slug = computed(() => {
  let path = route.path
  let parse = path.split('/')
  parse.pop()
  let category = parse.pop()
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
  <article>
    <div v-if="document">
      <div>
        <!-- <app-img
          class="h-32 w-full object-cover lg:h-48"
          :src="`/content/banner/${slug}.webp`"
          default="/content/banner/default.webp"
        /> -->
      </div>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div class="flex">
            <!-- <app-img
              class="h-24 w-24 rounded-full ring-4 ring-gray-800 sm:h-32 sm:w-32 bg-gray-800"
              :src="`/content/logo/${slug}.webp`"
            /> -->
          </div>
          <div
            class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
          >
            <div class="block mt-6 min-w-0 flex-1">
              <h1 class="text-2xl font-bold text-gray-100 truncate">
                {{ document.title }}
              </h1>
            </div>
          </div>
        </div>
        <div class="block mt-6 min-w-0 flex-1">
          <h1 class="text-2xl font-bold text-gray-100 truncate">
            {{ document.description }}
          </h1>
        </div>
      </div>
    </div>

    <app-toc :toc="document.body.toc" />
    <div class="prose prose-invert px-8 xl:px-16 py-6 max-w-4xl mx-auto">
      <ContentRenderer :value="document" />
    </div>
  </article>
</template>
