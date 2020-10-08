<template>
  <div
    v-if="prev || next"
    class="grid grid-cols-2 gap-2 pt-4 border-t lg:px-8 dark:border-gray-800"
    :class="{
      'lg:border-t-0': settings.layout === 'single',
    }"
  >
    <NuxtLink
      v-if="prev"
      :to="'/'"
      class="flex items-center justify-start font-bold text-primary-500 hover:underline"
    >
      <IconArrowLeft class="flex-shrink-0 w-4 h-4 mr-1" />
      <span class="truncate">{{ prev.title }}</span>
    </NuxtLink>
    <span v-else>&nbsp;</span>

    <NuxtLink
      v-if="next"
      :to="'/'"
      class="flex items-center justify-end font-bold text-primary-500 hover:underline"
    >
      <span class="truncate">{{ next.title }}</span>
      <IconArrowRight class="flex-shrink-0 w-4 h-4 ml-1" />
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
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
