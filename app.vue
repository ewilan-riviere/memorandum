<script setup lang="ts">
const isDev = useNuxtApp()._legacyContext?.isDev

useMetadata()
</script>

<template>
  <div :class="{ 'debug-screens': isDev }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
