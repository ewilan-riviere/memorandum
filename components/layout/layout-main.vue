<template>
  <main class="container px-4 mx-auto lg:px-8">
    <sidebar ref="sidebar">
      <slot name="aside"></slot>
    </sidebar>
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
                  <h3
                    v-if="$route.name !== 'home'"
                    class="flex items-center px-3 py-1 mb-3 text-sm font-bold tracking-wider text-gray-500 uppercase transition-colors duration-300 border-l-2 border-gray-200 cursor-pointer rounded-tr-md rounded-br-md lg:text-xs group hover:border-gray-300 hover:bg-gray-100"
                    @click="
                      backRoute ? $router.push(backRoute) : $router.push('/')
                    "
                  >
                    <span>Back</span>
                    <icon
                      name="back-to-top"
                      :size="15"
                      class="ml-2"
                      svg-class="transition-transform duration-300 transform group-hover:-translate-y-1"
                    />
                  </h3>
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
          class="w-full lg:w-3/4"
        >
          <div v-if="image" class="text-on-img-tailwind">
            <div class="relative w-full">
              <div class="source" style="z-index: -1">
                <img
                  :src="`/documentation/logo/${image}-banner.webp`"
                  class="object-cover object-center w-full h-40 opacity-25"
                />
                <div
                  class="absolute z-10 w-full text-2xl italic text-center text-white"
                  style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
                >
                  <slot name="title"></slot>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-4 pb-10 lg:px-5 lg:pt-8">
            <slot name="main"></slot>
          </div>
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
  name: 'LayoutMain',
  props: {
    withBorders: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: null,
    },
    backRoute: {
      type: [Object, String],
      default: () => {},
    },
  },
}
</script>

<style lang="postcss" scoped>
.ps {
  height: 90vh;
}
.text-on-img-tailwind .source::after {
  @apply absolute top-0 left-0 right-0 bottom-0 w-full max-w-full bg-black bg-opacity-0;
  content: '';
}
</style>
