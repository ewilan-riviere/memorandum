<script setup lang="ts">
const isDev = useNuxtApp()._legacyContext?.isDev

useHead({
  title: 'Memorandum',
})
</script>

<template>
  <NuxtLayout>
    <theme :class="{ 'debug-screens': isDev }">
      <NuxtPage />
    </theme>
  </NuxtLayout>
</template>
