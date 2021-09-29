<template>
  <div
    :class="$store.state.sidebarOpened ? 'translate-x-0' : '-translate-x-full'"
    class="
      fixed
      top-0
      bottom-0
      left-0
      z-50
      transition
      duration-400
      ease-in-out
      transform
      shadow-xl
    "
  >
    <div class="w-screen h-full max-w-md">
      <div
        class="
          flex flex-col
          h-full
          bg-white
          divide-y divide-gray-200
          dark:bg-gray-900
        "
      >
        <div class="flex-1">
          <div class="flex flex-col justify-between flex-1">
            <button
              aria-label="Close panel"
              class="
                fixed
                top-0
                right-0
                p-5
                transition-colors
                duration-100
                ease-in-out
                hover:bg-gray-200
                dark:hover:bg-gray-700
              "
              @click="hide"
            >
              <svg-icon name="cross" class="text-black w-6 h-6" />
            </button>
            <div class="p-5">
              <app-logo />
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
import vClickOutside from 'v-click-outside'
import appLogo from './app-logo.vue'

export default {
  name: 'ChaptersSwitch',
  components: { appLogo },
  directives: {
    clickOutside: vClickOutside.directive,
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
  @apply text-blue-600;
}

.router-link-active {
  @apply text-blue-500;
}
</style>
