<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <nav>
    <nuxt-link
      v-for="(page, pageKey) in categories"
      :key="pageKey"
      class="flex items-center justify-between h-12 px-3 py-2 mt-1 space-x-4 text-sm font-medium leading-5 text-gray-600 transition-colors duration-300 ease-in-out rounded-md cursor-pointer group hover:text-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:text-gray-900 focus:bg-gray-200"
      :class="{
        'bg-gray-300 dark:bg-gray-800': pageKey === $route.params.subject,
      }"
      :to="{
        name: 'category-subcategory-subject',
        params: {
          category: $route.params.category,
          subcategory: $route.params.subcategory,
          subject: pageKey,
        },
      }"
    >
      <div class="flex items-center space-x-2">
        <div class="w-6 aspect-w-1 aspect-h-1">
          <m-img
            class="object-contain"
            :src="`/documentation/logo/${pageKey}.webp`"
          />
        </div>
        <span class="font-semibold truncate">
          {{ $t(pageKey) }}
        </span>
      </div>
      <span
        class="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full text-gray-600 bg-gray-200 dark:bg-gray-600 dark:group-hover:bg-gray-700 dark:text-gray-200 group-hover:bg-gray-200 group-focus:bg-gray-300 transition ease-in-out duration-150"
      >
        {{ page.length }}
      </span>
    </nuxt-link>
  </nav>
</template>

<script>
import mImg from '../special/m-img.vue'
export default {
  name: 'NavPages',
  components: { mImg },
  props: {
    categories: {
      type: Object,
      default: () => {},
    },
    routeParam: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selected: 0,
    }
  },
  methods: {
    capitalizeFirstLetter(string) {
      if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
    },
    select(category, id) {
      this.selected = id
      this.$emit('select-category', category)
    },
  },
}
</script>

<style lang="postcss">
/* .router-link-exact-active {
  @apply bg-gray-300;
}
.router-link-active {
  @apply bg-gray-300;
} */
</style>
