<script setup lang="ts">
const isDev = useNuxtApp()._legacyContext?.isDev

useMetadata()
</script>

<template>
  <div :class="{ 'debug-screens': isDev }">
    <Html lang="en" />
    <Meta property="og:image" content="/cover.jpg" />
    <Meta name="twitter:card" content="summary_large_image" />
    <layout>
      <NuxtPage />
    </layout>
  </div>
</template>

<style lang="postcss">
body {
  @apply bg-gray-900 text-white;
}
</style>
