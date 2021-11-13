<template>
  <div
    v-if="prev || next"
    class="grid grid-cols-2 gap-2 lg:px-8 pt-4 border-t border-gray-800"
    :class="{
      'lg:border-t-0': settings.layout === 'single',
    }"
  ></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    ...mapGetters(['settings']),
  },
}
</script>
