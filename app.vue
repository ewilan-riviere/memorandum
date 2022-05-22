<script setup lang="ts">
const isDev = useNuxtApp()._legacyContext.isDev
</script>

<template>
  <theme :class="{ 'debug-screens': isDev }">
    <NuxtPage />
  </theme>
</template>
