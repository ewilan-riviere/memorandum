<script setup lang="ts">
const isDev = useNuxtApp()._legacyContext?.isDev

useHead({
  title: 'Memorandum',
})
</script>

<template>
  <theme :class="{ 'debug-screens': isDev }">
    <NuxtPage />
  </theme>
</template>
