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
import settings from '~/content/settings.json'

export default {
  name: 'LayoutDefault',

  components: {
    AppFooter,
    BackToTop,
    Navigation,
  },
  data() {
    return {
      settings,
    }
  },
  created() {
    this.configSettings()
  },
  methods: {
    configSettings() {
      if (
        Object.keys(this.$store.state.settings).length === 0 &&
        this.$store.state.settings.constructor === Object
      ) {
        this.$store.commit('setSettings', settings)
      }
    },
  },
}
</script>

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
