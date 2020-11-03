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
                  <h3
                    v-if="$route.name !== 'home'"
                    class="flex items-center px-3 py-1 mb-3 text-sm font-bold tracking-wider text-gray-500 uppercase transition-colors duration-300 border-l-2 border-gray-200 cursor-pointer rounded-tr-md rounded-br-md lg:text-xs group hover:border-gray-300 hover:bg-gray-100"
                    @click="$router.back()"
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
          class="w-full py-4 lg:px-5 lg:pt-8 lg:pb-4 lg:w-3/4"
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
import Vue from 'vue'
import AppCopyButton from '@/components/global/markdown/AppCopyButton'

export default {
  name: 'MainLayout',
  props: {
    withBorders: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    // const paragraphs = document.querySelectorAll('p')
    // paragraphs.forEach((paragraph) => {
    //   paragraph.setAttribute('lang', 'fr')
    // })
    // const titlesH2 = document.querySelectorAll('h2')
    // const titlesH3 = document.querySelectorAll('h3')
    // titlesH2.forEach((title) => {
    //   const id = title.getAttribute('id')
    //   title.setAttribute('id', `title-${this.$slugify(id)}`)
    // })
    // titlesH3.forEach((title) => {
    //   const id = title.getAttribute('id')
    //   title.setAttribute('id', `title-${this.$slugify(id)}`)
    // })

    setTimeout(() => {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')

      for (const block of blocks) {
        const CopyButton = Vue.extend(AppCopyButton)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    }, 100)
  },
}
</script>

<style>
.ps {
  height: 90vh;
}
</style>
