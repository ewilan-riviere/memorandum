<template>
  <div>
    <div v-for="(item, i) in items" :key="i" class="flex mt-3">
      <icon-badge-check
        class="flex-shrink-0 w-6 h-6 mt-px mr-3 text-green-500"
      />
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
