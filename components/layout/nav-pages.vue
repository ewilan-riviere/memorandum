<template>
  <nav>
    <ul class="space-y-6">
      <li v-for="block in pages" :key="block.id">
        <h2 class="text-lg font-semibold title font-quicksand w-max">
          {{ $t(block.title) }}
        </h2>
        <ul>
          <li>
            <nuxt-link
              v-for="category in block.list"
              :key="category.id"
              :to="{
                name: 'type-slug',
                params: {
                  title: block.title,
                  type: category.list,
                },
              }"
              class="flex items-center justify-between px-2 py-2 mt-1 space-x-2 text-sm font-medium leading-5 text-gray-600 transition-colors duration-100 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:text-gray-900 focus:bg-gray-200 dark:focus:bg-gray-700"
            >
              <div class="flex items-center space-x-2">
                <component
                  :is="icon(category.list)"
                  class="w-6 h-6 text-gray-800 dark:text-gray-200"
                />
                <span>{{ $t(category.list) }}</span>
              </div>
              <span
                v-if="category.number"
                class="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full text-gray-600 bg-gray-200 dark:bg-gray-600 dark:group-hover:bg-gray-700 dark:text-gray-200 group-hover:bg-gray-200 group-focus:bg-gray-300 transition ease-in-out duration-150"
              >
                {{ category.number }}
              </span>
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
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
.title::after {
  @apply border-b border-purple-600 mt-1 mb-2 rounded block w-4/5;
  content: ' ';
}
</style>
