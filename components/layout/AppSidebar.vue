<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <div>
    <!-- <div class="fixed top-0 left-0 z-50">
      <div
        v-click-outside="hide"
        class="p-3 mt-1 ml-1 font-bold transition-colors duration-300 bg-gray-100 rounded-md shadow-md cursor-pointer md:p-5 md:mt-3 md:ml-3 group hover:bg-gray-200"
        @click="toggleSidemenu"
      >
        <logo :size="30" />
      </div>
    </div> -->
    <div
      class="fixed top-0 bottom-0 left-0 z-50 transition duration-500 ease-in-out transform shadow-xl sm:duration-700"
      :class="
        $store.state.sidebarOpened ? 'translate-x-0' : '-translate-x-full'
      "
    >
      <div class="w-screen h-full max-w-md">
        <div class="flex flex-col h-full bg-white divide-y divide-gray-200">
          <div class="flex-1">
            <div class="flex flex-col justify-between flex-1">
              <button
                aria-label="Close panel"
                class="fixed top-0 right-0 p-5 transition-colors duration-300 ease-in-out hover:bg-gray-200"
                @click="toggleSidemenu"
              >
                <icon name="cross" :size="20" class="text-black" />
              </button>
              <div
                class="px-5 py-3 text-5xl transition-colors duration-300 font-dancing-script hover:bg-gray-200 w-max-content"
              >
                blogtech
              </div>
              <nuxt-link
                v-for="route in routes"
                :key="route.id"
                :to="{ name: route.routeName }"
                :class="{
                  'hover:bg-gray-200': route.routeName !== $route.name,
                }"
                class="px-5 py-3 my-1 font-bold text-gray-500 transition duration-150 ease-in-out"
                @click.native="closeSidemenu"
              >
                {{ route.label }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChaptersSwitch',
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
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
  },
  methods: {
    toggleSidemenu() {
      if (!this.$store.state.sidebarOpened) {
        this.$store.commit('toggleLayerVisible')
        setTimeout(() => {
          this.$store.commit('toggleSidebarOpened')
        }, 100)
      } else {
        this.$store.commit('toggleSidebarOpened')
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
      }, 250)
    },
  },
}
</script>

<style scoped>
.router-link-exact-active {
  @apply text-blue-useweb;
}

.router-link-active {
  @apply text-blue-useweb-light;
}
</style>
