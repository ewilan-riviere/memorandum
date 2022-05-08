<script setup lang="ts">
import { useContent } from '@/src/composables'
import { useContentStore } from '@/src/stores/content'

const store = useContentStore()
const content = useContent()
const route = useRoute()

const subject = content.getFileFromRoute(route.path)
console.log(subject)

store.setFile(subject)

watch(
  () => route.path,
  (newVal) => {
    content.getFileFromRoute(newVal)
    store.setFile(subject)
  }
)
</script>

<template>
  <article>
    <!-- Profile header -->
    <div>
      <div>
        <app-img
          class="h-32 w-full object-cover lg:h-48"
          :src="`/content/banner/${store.subject.slug}.webp`"
          default="/content/banner/default.webp"
        />
      </div>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div class="flex">
            <app-img
              class="h-24 w-24 rounded-full ring-4 ring-gray-800 sm:h-32 sm:w-32 bg-gray-800"
              :src="`/content/logo/${store.subject.slug}.webp`"
            />
          </div>
          <div
            class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
          >
            <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
              <h1 class="text-2xl font-bold text-gray-100 truncate">
                {{ store.file.title }}
              </h1>
            </div>
          </div>
        </div>
        <div class="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
          <h1 class="text-2xl font-bold text-gray-100 truncate">
            {{ store.file.title }}
          </h1>
        </div>
      </div>
    </div>

    <content-toc :toc="store.file.toc" />
    <div class="prose prose-invert px-16 py-6 max-w-4xl mx-auto">
      <slot />
    </div>
  </article>
</template>
