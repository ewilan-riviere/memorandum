<template>
  <div :class="{ 'debug-screens': devMode }" class="bg-white dark:bg-gray-900">
    <layout-navigation />
    <Nuxt class="min-h-screen pt-16" />
    <layout-footer />
    <layout-back-to-top />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
  components: {
    LayoutBackToTop: () => import('~/components/layout/layout-back-to-top.vue'),
    LayoutFooter: () => import('~/components/layout/layout-footer.vue'),
    LayoutNavigation: () => import('~/components/layout/layout-navigation.vue'),
  },
  data() {
    return {
      devMode: process.env.NODE_ENV !== 'production',
    }
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
