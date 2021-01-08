<template>
  <div class="bg-white dark:bg-gray-900">
    <layout-navigation />
    <Nuxt class="min-h-screen pt-16" />
    <layout-footer />
    <layout-back-to-top />
    <client-only>
      <tailwind-helper sneak />
    </client-only>
  </div>
</template>

<script>
// import AppFooter from '@/components/layout/AppFooter'
import settings from '~/content/settings.json'
import LayoutBackToTop from '~/components/layout/layout-back-to-top.vue'
import LayoutFooter from '~/components/layout/layout-footer.vue'
import LayoutNavigation from '~/components/layout/layout-navigation.vue'

export default {
  name: 'LayoutDefault',

  components: {
    LayoutBackToTop,
    LayoutFooter,
    LayoutNavigation,
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

<style lang="postcss">
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
