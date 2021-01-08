<template>
  <div
    class="fixed top-0 bottom-0 left-0 z-50 transition duration-500 ease-in-out transform shadow-xl sm:duration-700"
    :class="$store.state.sidebarOpened ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="w-screen h-full max-w-md">
      <div class="flex flex-col h-full bg-white divide-y divide-gray-200">
        <div class="flex-1">
          <div class="flex flex-col justify-between flex-1">
            <button
              aria-label="Close panel"
              class="fixed top-0 right-0 p-5 transition-colors duration-300 ease-in-out hover:bg-gray-200"
              @click="hide"
            >
              <icon name="cross" :size="20" class="text-black" />
            </button>
            <div class="p-5">
              <logo />
              <div class="mt-5">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'ChaptersSwitch',
  directives: {
    ClickOutside,
  },
  data() {
    return {
      opacity: false,
      currentChapterNumber: 0,
    }
  },
  computed: {
    routes() {
      return [{ label: 'Accueil', routeName: 'home' }].concat(
        this.$store.state.routes
      )
    },
  },
  methods: {
    hide() {
      this.$store.commit('closeSidebar')
      setTimeout(() => {
        this.$store.commit('setLayerVisible', false)
      }, 150)
    },
    toggleSidemenu() {
      if (!this.$store.state.sidebarOpened) {
        this.$store.commit('toggleLayerVisible')
        setTimeout(() => {
          this.$store.commit('toggleSidebar')
        }, 100)
      } else {
        this.$store.commit('toggleSidebar')
        setTimeout(() => {
          this.$store.commit('setLayerVisible', false)
        }, 250)
      }
    },
    changeChapter(item) {
      this.sidebarOpened = false
      this.$emit('change-chapter', item)
    },
    closeSidemenu() {
      this.$store.commit('setSidebarOpened', false)
      setTimeout(() => {
        this.$store.commit('setLayerVisible', false)
      }, 150)
    },
  },
}
</script>

<style lang="postcss" scoped>
.router-link-exact-active {
  @apply text-blue-useweb;
}

.router-link-active {
  @apply text-blue-useweb-light;
}
</style>
