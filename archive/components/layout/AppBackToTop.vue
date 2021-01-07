<template>
  <transition name="fade">
    <div
      v-if="displayBackToTop"
      v-scroll-to="'#__nuxt'"
      class="fixed bottom-0 right-0 p-2 mb-5 mr-5 transition-colors duration-300 bg-gray-200 bg-opacity-50 rounded-md shadow-md cursor-pointer md:p-3 hover:bg-gray-300 group"
    >
      <icon
        name="back-to-top"
        :size="30"
        class="hidden text-gray-700 transition-colors duration-300 md:block group-hover:text-gray-700"
      />
      <icon
        name="back-to-top"
        :size="25"
        class="block text-gray-700 transition-colors duration-300 md:hidden group-hover:text-gray-700"
      />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      displayBackToTop: false,
    }
  },

  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    scrollTo() {
      return window.scrollTo({
        bottom: document.querySelector('#__nuxt'),
        behavior: 'smooth',
      })
    },
    handleScroll() {
      if (window.scrollY > 150) {
        this.displayBackToTop = true
      } else {
        this.displayBackToTop = false
      }
    },
  },
}
</script>
