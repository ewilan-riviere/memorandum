<template>
  <div>
    <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
    <nav
      class="transition duration-300 bg-white border-b border-gray-200"
      :class="{ shadow: scrolling }"
    >
      <div class="container h-16 mx-auto">
        <div class="grid h-full grid-cols-5">
          <div class="col-span-1 my-auto">
            <div class="flex items-center flex-shrink-0">
              <nuxt-link class="flex group" :to="{ name: 'home' }">
                <icon name="logo-light" :width="160" />
              </nuxt-link>
            </div>
          </div>
          <div class="col-span-3 my-auto">
            <search></search>
          </div>
          <div class="col-span-1 my-auto">links</div>
        </div>
        <!-- <div class="flex ">
          
          <div class="flex w-full ml-10">
            <nuxt-link
              v-for="route in $store.state.routes"
              :key="route.id"
              :to="{ name: route.routeName }"
              class="inline-flex items-center px-1 pt-1 mr-5 text-lg font-medium leading-5 text-gray-900 transition duration-150 ease-in-out border-b-2 border-transparent focus:outline-none focus:border-blue-useweb font-quicksand hover:border-blue-useweb-light"
            >
              {{ route.label }}
            </nuxt-link>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0"></div>
        </div> -->
      </div>
    </nav>
  </div>
</template>

<script>
import Search from '@/components/layout/Search.vue'

export default {
  name: 'AppNavbar',
  components: {
    Search,
  },
  data() {
    return {
      scrolling: false,
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 50) {
        this.scrolling = true
      } else {
        this.scrolling = false
      }
    },
  },
}
</script>

<style scoped>
.router-link-exact-active {
  @apply border-blue-useweb;
}
.router-link-active {
  @apply border-blue-useweb;
}
</style>
