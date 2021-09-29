<template>
  <article class="prose prose-lg dark:prose-dark max-w-none lg:hyphenate">
    <client-only>
      <vue-read-progress :color="color"></vue-read-progress>
    </client-only>
    <!-- <h1 class="flex items-center justify-between">
      {{ document.title }}
    </h1> -->
    <nuxt-content v-if="document" :document="document" />
  </article>
</template>

<script>
import tailwind from '@/tailwind.config.js'
export default {
  name: 'AppContent',
  props: {
    document: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    color() {
      return tailwind.theme.extend.colors.primary[600]
    },
  },
}
</script>
