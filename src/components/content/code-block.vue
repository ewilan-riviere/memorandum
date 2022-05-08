<script setup lang="ts">
defineProps<{
  label: string
  active?: boolean
}>()
</script>

<template>
  <div class="code-block" :class="[active && 'active']">
    <slot />
  </div>
</template>

<style scoped>
.code-block {
  display: none;
}
.code-block.active {
  display: block;
}
</style>
