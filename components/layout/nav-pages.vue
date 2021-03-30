<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <nav>
    <nuxt-link
      v-for="page in pages"
      :key="page.id"
      :to="{
        name: 'type-slug',
        params: {
          type: page.label,
        },
      }"
      class="flex items-center px-3 py-2 mt-1 space-x-2 text-sm font-medium leading-5 text-gray-600 transition-colors duration-300 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-300 focus:outline-none focus:text-gray-900 focus:bg-gray-200"
    >
      <!-- <icon
        :name="`nav-${$slugify(page.label)}`"
        class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-500 transition duration-150 ease-in-out group-focus:text-gray-500"
        :size="26"
        default="nav-default"
      /> -->
      <component :is="icon(page.label)" class="w-6 h-6 text-gray-800" />
      <div class="flex justify-between w-full">
        <span class="font-semibold truncate">
          {{ $t(page.label) }}
        </span>
        <span
          v-if="page.number"
          class="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full text-gray-600 bg-gray-200 group-hover:bg-gray-200 group-focus:bg-gray-300 transition ease-in-out duration-150"
        >
          {{ page.number }}
        </span>
      </div>
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  name: 'NavPages',
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
  methods: {
    icon(label) {
      let component = `icon-${label}`
      component = component.split('-')
      let newComponent = []
      component.forEach((part) => {
        newComponent.push(this.$capitalizeFirst(part))
      })
      newComponent = newComponent.join('')
      const isComponent = this.$options.components[newComponent]
      if (isComponent === undefined) {
        newComponent = 'IconDefault'
      }
      return newComponent
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
