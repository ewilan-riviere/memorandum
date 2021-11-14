<template>
  <nuxt-link :to="localePath(to)" class="p-3 rounded-md hover:bg-gray-800">
    <svg-icon name="arrow-sm-left" class="w-5 h-5 transform rotate-90" />
  </nuxt-link>
</template>

<script>
export default {
  name: 'SidenavBack',
  props: {
    to: {
      type: [String, Object],
      default: () => {},
    },
  },
}
</script>
