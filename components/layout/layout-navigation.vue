<template>
  <div>
    <div v-if="$store.state.layerVisible">
      <div
        :class="$store.state.sidebarOpened ? 'opacity-75' : 'opacity-0'"
        class="fixed inset-0 z-40 transition-opacity duration-300 bg-black"
      ></div>
    </div>
    <navbar class="fixed z-30 block w-full h-16 navbar"></navbar>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'LayoutNavigation',
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

<style lang="postcss">
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
