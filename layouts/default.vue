<template>
  <div :class="{ 'debug-screens': devMode }" class="bg-white dark:bg-gray-900">
    <div class="min-h-screen">
      <app-navbar />
      <Nuxt />
    </div>
    <app-footer />
    <app-back-to-top />
  </div>
</template>

<script>
import AppFooter from '~/components/layout/app-footer.vue'
import AppBackToTop from '~/components/layout/app-back-to-top.vue'
import appNavbar from '~/components/layout/app-navbar.vue'
export default {
  name: 'LayoutDefault',
  components: { appNavbar, AppFooter, AppBackToTop },
  data() {
    return {
      devMode: process.env.NODE_ENV !== 'production',
    }
  },
}
</script>
