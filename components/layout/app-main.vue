<template>
  <main class="container px-4 mx-auto lg:px-8">
    <app-sidebar ref="sidebar">
      <slot name="aside"></slot>
    </app-sidebar>
    <div class="relative flex flex-wrap">
      <aside
        class="
          fixed
          inset-0
          z-30
          hidden
          w-full
          bg-white
          lg:w-1/5 lg:block lg:relative lg:mt-0
          dark:bg-gray-900
          lg:bg-transparent lg:dark:bg-transparent
          pt-12
        "
      >
        <div class="sticky top-16">
          <ul
            class="lg:pl-0 lg:pr-8 overflow-y-auto scrollbar-thin"
            style="height: 85vh"
          >
            <app-back-to-top />
            <div class="pt-6">
              <slot name="aside"></slot>
            </div>
          </ul>
        </div>
      </aside>
      <div class="flex flex-wrap-reverse w-full lg:w-4/5">
        <div
          :class="{
            'lg:border-l lg:border-r dark:border-gray-800': withBorders,
          }"
          class="w-full lg:w-3/4"
        >
          <div v-if="$slots.title" class="text-on-img-tailwind pt-16">
            <div class="relative w-full h-40">
              <div class="source" style="z-index: -1">
                <md-img
                  :src="`/documentation/logo/${image}-banner.webp`"
                  class="object-cover object-center w-full opacity-25 h-40"
                />
                <div
                  class="
                    absolute
                    z-10
                    w-full
                    text-2xl
                    italic
                    text-center text-white
                  "
                  style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
                >
                  <slot name="title"></slot>
                </div>
              </div>
            </div>
          </div>
          <div :class="hasTitleSlot ? 'pt-6' : 'pt-20'" class="pb-10 lg:px-5">
            <slot name="content"></slot>
          </div>
        </div>
        <div class="relative block w-full lg:w-1/4">
          <div
            class="
              lg:sticky lg:top-16
              overflow-y-auto
              h-full
              lg:h-auto lg:max-h-(screen-16)
            "
          >
            <slot name="toc"></slot>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AppBackToTop from './app-back-to-top.vue'
import AppSidebar from './app-sidebar.vue'

export default {
  name: 'LayoutMain',
  components: {
    AppSidebar,
    AppBackToTop,
  },
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
  computed: {
    hasTitleSlot() {
      return !!this.$slots.title
    },
  },
}
</script>

<style lang="postcss" scoped>
/* .text-on-img-tailwind .source::after {
  @apply absolute top-0 left-0 right-0 bottom-0 w-full max-w-full bg-black bg-opacity-0;
  content: '';
} */
</style>
