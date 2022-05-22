<script setup lang="ts">
const isDev = useNuxtApp()._legacyContext?.isDev

useMetadata()
</script>

<template>
  <NuxtLayout>
    <theme :class="{ 'debug-screens': isDev }">
      <NuxtPage />
    </theme>
  </NuxtLayout>
</template>
