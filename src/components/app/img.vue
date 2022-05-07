<script setup lang="ts">
defineProps<{
  src: string
}>()

const isLoaded = ref(false)

const load = () => {
  try {
    isLoaded.value = true
  } catch (error) {
  }
}
</script>

<template>
  <div class="relative">
    <img v-if="!isLoaded" src="/content/logo/default.webp" />
    <!-- <div v-if="!isLoaded" class="absolute inset-0 bg-gray-700 animate-pulse rounded-md"></div> -->
    <img :src="src" alt="" @load="load" :class="isLoaded ? '' : 'hidden'" />
  </div>
</template>
