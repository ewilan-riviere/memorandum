<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <nav>
    <nuxt-link
      v-for="(page, pageId) in pages"
      :key="pageId"
      class="flex items-center justify-between px-3 py-2 mt-1 space-x-4 text-sm font-medium leading-5 text-gray-600 transition-colors duration-300 ease-in-out rounded-md cursor-pointer group hover:text-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:text-gray-900 focus:bg-gray-200"
      :class="{
        'bg-gray-300 dark:bg-gray-800': page.label === $route.params.category,
      }"
      :to="{
        name: 'type-slug',
        params: {
          title: $route.params.title,
          type: $route.params.type,
          category: page.label,
        },
      }"
    >
      <!-- <icon
        :name="`nav-${$slugify(page.label)}`"
        class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-500 transition duration-150 ease-in-out group-focus:text-gray-500"
        :size="26"
        default="nav-default"
      /> -->
      <div class="flex items-center space-x-2">
        <m-img
          class="object-cover w-12 h-12 rounded-full"
          :src="`/documentation/logo/${$slugify(page.label)}.webp`"
        />
        <span class="font-semibold truncate">
          {{ $t(page.label) }}
        </span>
      </div>
      <span
        v-if="page.number"
        class="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full text-gray-600 bg-gray-200 dark:bg-gray-600 dark:group-hover:bg-gray-700 dark:text-gray-200 group-hover:bg-gray-200 group-focus:bg-gray-300 transition ease-in-out duration-150"
      >
        {{ page.number }}
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
    pages: {
      type: Array,
      default: () => [],
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
      return string.charAt(0).toUpperCase() + string.slice(1)
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
