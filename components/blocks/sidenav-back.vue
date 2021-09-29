<template>
  <nuxt-link
    :to="to"
    class="p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
  >
    <svg-icon name="arrow-sm-left" class="w-5 h-5 transform rotate-90" />
  </nuxt-link>
</template>

<script>
export default {
  name: 'SidenavBack',
  props: {
    to: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
