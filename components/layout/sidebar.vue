<script setup lang="ts">
// import { useContent } from '@/src/composables/useContent'
// import {
//   Dialog,
//   DialogOverlay,
//   TransitionChild,
//   TransitionRoot,
// } from '@headlessui/vue'
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
  <div>sidebar</div>
  <!-- <TransitionRoot as="template" :show="sidebarOpen">
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
                close
              </button>
            </div>
          </TransitionChild>
          <navigation />
        </div>
      </TransitionChild>
      <div class="flex-shrink-0 w-14" aria-hidden="true">
      </div>
    </Dialog>
  </TransitionRoot> -->
</template>
