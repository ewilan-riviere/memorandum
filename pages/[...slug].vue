<script setup lang="ts">
// useMetadata({
//   title: 'Memorandum',
// })
useHead({
  title: 'Memorandum title',
  titleTemplate: '',
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
