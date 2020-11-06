<template>
  <div>
    <div v-if="$store.state.layerVisible">
      <div
        :class="$store.state.sidebarOpened ? 'opacity-75' : 'opacity-0'"
        class="fixed inset-0 z-40 transition-opacity duration-300 bg-black"
      ></div>
    </div>
    <div
      class="fixed z-30 block w-full h-16 navbar md:hidden navbar-shadow"
      :class="{ 'hidden-navbar': !showNavbar }"
    >
      <div
        class="relative z-30 flex justify-between h-16 text-white bg-opacity-95 bg-blue-useweb-light"
      >
        <div
          v-click-outside="closeSidemenu"
          class="p-4 transition-colors duration-300 cursor-pointer hover:bg-blue-useweb"
          @click="toggleSidemenu"
        >
          <icon name="menu-design" :size="30" />
        </div>
        <div
          class="text-4xl text-center transition-colors duration-300 font-dancing-script"
          :class="{ 'hover:bg-blue-useweb': $route.name !== 'home' }"
        >
          <nuxt-link
            v-if="$route.name !== 'home'"
            class="px-4"
            :to="{ name: 'home' }"
            >Memorandum</nuxt-link
          >
          <span v-else>Memorandum</span>
        </div>
        <div
          class="p-4 transition-colors duration-300 cursor-pointer hover:bg-blue-useweb"
        >
          <icon name="three-dots-menu" :size="30" class="my-auto" />
        </div>
      </div>
    </div>
    <!-- navbar  -->
    <app-sidebar ref="sidebar"></app-sidebar>
    <app-navbar
      class="fixed z-30 hidden w-full h-16 navbar md:block"
    ></app-navbar>
  </div>
</template>

<script>
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'Navigation',
  components: {
    AppSidebar,
    AppNavbar,
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
      scroll: false,
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleSidemenu() {
      this.$refs.sidebar.toggleSidemenu()
    },
    closeSidemenu() {
      if (this.$store.state.layerVisible) {
        this.$refs.sidebar.closeSidemenu()
      }
    },
    handleScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition > 100) {
        this.scroll = true
      } else {
        this.scroll = false
      }
      if (currentScrollPosition < 0) {
        return
      } // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    },
  },
}
</script>

<style>
.navbar-shadow {
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.5);
}
.navbar {
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
}
.navbar.hidden-navbar {
  box-shadow: none !important;
  transform: translate3d(0, -100%, 0);
}
</style>
