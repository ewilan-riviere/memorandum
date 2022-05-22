<script setup lang="ts">
// import { useContent } from '@/src/composables/useContent'
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
// import { XIcon } from '@heroicons/vue/outline'

const props = defineProps<{
  opened: boolean
}>()

const sidebarOpen = ref(false)

watch(
  () => props.opened,
  (newVal) => {
    sidebarOpen.value = newVal
  }
)

// const { navigation } = useContent()
</script>

<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog
      as="div"
      class="fixed inset-0 flex z-40 lg:hidden"
      @close="sidebarOpen = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-gray-700 bg-opacity-75" />
      </TransitionChild>
      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div
          class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900 focus:outline-none"
        >
          <TransitionChild
            as="template"
            enter="ease-in-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="sidebarOpen = false"
              >
                <span class="sr-only">Close sidebar</span>
                <!-- <XIcon class="h-6 w-6 text-white" aria-hidden="true" /> -->
                close
              </button>
            </div>
          </TransitionChild>
          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex-shrink-0 flex items-center px-4">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg"
                alt="Workflow"
              />
            </div>
            <nav aria-label="Sidebar" class="mt-5">
              <!-- <div class="px-2 space-y-1">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-800 text-gray-100'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current
                        ? 'text-gray-400'
                        : 'text-gray-400 group-hover:text-gray-400',
                      'mr-4 h-6 w-6',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </div>
              <hr class="border-t border-gray-700 my-5" aria-hidden="true" />
              <div class="px-2 space-y-1">
                <a
                  v-for="item in secondaryNavigation"
                  :key="item.name"
                  :href="item.href"
                  class="text-gray-400 hover:bg-gray-700 hover:text-gray-100 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <component
                    :is="item.icon"
                    class="text-gray-400 group-hover:text-gray-400 mr-4 flex-shrink-0 h-6 w-6"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </div> -->
            </nav>
          </div>
          <div class="flex-shrink-0 flex border-t border-gray-700 p-4">
            <!-- <a href="#" class="flex-shrink-0 group block">
              <div class="flex items-center">
                <div>
                  <img
                    class="inline-block h-10 w-10 rounded-full"
                    :src="user.imageUrl"
                    alt=""
                  />
                </div>
                <div class="ml-3">
                  <p
                    class="text-base font-medium text-gray-300 group-hover:text-gray-100"
                  >
                    {{ user.name }}
                  </p>
                  <p
                    class="text-sm font-medium text-gray-400 group-hover:text-gray-300"
                  >
                    View profile
                  </p>
                </div>
              </div>
            </a> -->
          </div>
        </div>
      </TransitionChild>
      <div class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>
</template>
