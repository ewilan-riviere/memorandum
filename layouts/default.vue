<template>
  <div>
    <navigation></navigation>
    <Nuxt class="pt-16" />
    <app-footer></app-footer>
    <back-to-top />
    <client-only>
      <tailwind-helper />
    </client-only>
  </div>
</template>

<script>
import AppFooter from '@/components/layout/AppFooter'
import BackToTop from '@/components/layout/BackToTop'
import Navigation from '@/components/layout/Navigation.vue'

export default {
  name: 'LayoutDefault',

  components: {
    AppFooter,
    BackToTop,
    Navigation,
  },
}
</script>
