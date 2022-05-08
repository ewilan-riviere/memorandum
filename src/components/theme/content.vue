<script setup lang="ts">
import { useContentStore } from '@/src/stores/content'
import { MailIcon, PhoneIcon } from '@heroicons/vue/solid'

const store = useContentStore()
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
            <div
              class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <button
                type="button"
                class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <MailIcon
                  class="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Message</span>
              </button>
              <button
                type="button"
                class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <PhoneIcon
                  class="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Call</span>
              </button>
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

    <div class="prose prose-invert px-16 py-6 max-w-full">
      <slot />
    </div>
  </article>
</template>
