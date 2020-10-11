<template>
  <main class="container px-4 mx-auto lg:px-8">
    <div class="relative flex flex-wrap">
      <aside
        class="fixed inset-0 z-30 hidden w-full mt-16 bg-white lg:w-1/5 lg:block lg:relative lg:mt-0 dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent"
      >
        <div
          class="lg:sticky lg:top-16 overflow-y-auto h-full lg:h-auto lg:max-h-(screen-16)"
        >
          <client-only>
            <perfect-scrollbar>
              <ul class="p-4 lg:py-8 lg:pl-0 lg:pr-8">
                <transition name="fade">
                  <li
                    v-if="$route.name !== 'home'"
                    class="flex items-center p-2 pl-2 mb-2 font-bold transition-colors duration-300 border-l-2 border-transparent cursor-pointer hover:bg-opacity-25 hover:border-green-400 rounded-tr-md rounded-br-md hover:bg-green-300"
                    @click="$router.back()"
                  >
                    <h3
                      class="flex items-center text-sm font-bold tracking-wider text-gray-500 uppercase lg:text-xs"
                    >
                      <icon name="arrow-left" :size="15" />
                      <span class="ml-2">Back</span>
                    </h3>
                  </li>
                </transition>
                <slot name="aside"></slot>
              </ul>
            </perfect-scrollbar>
          </client-only>
        </div>
      </aside>
      <div class="flex flex-wrap-reverse w-full lg:w-4/5">
        <div
          :class="{
            'lg:border-l lg:border-r dark:border-gray-800': withBorders,
          }"
          class="w-full py-4 lg:pt-8 lg:pb-4 lg:w-3/4"
        >
          <slot name="main"></slot>
        </div>
        <div class="relative block w-full lg:w-1/4">
          <div
            class="lg:sticky lg:top-16 overflow-y-auto h-full lg:h-auto lg:max-h-(screen-16)"
          >
            <slot name="toc"></slot>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'MainLayout',
  props: {
    withBorders: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style>
.ps {
  height: 90vh;
}
</style>
