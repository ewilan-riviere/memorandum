<script setup lang="ts">
  const props = defineProps<{
    src?: string
    default?: string
  }>()

  const source = ref('')
  const isLoaded = ref(false)
  const attrs = useAttrs()
  const placeholder = ref('/content/logo/default.webp')

  if (props.src) {
    source.value = props.src
  }
  if (props.default) {
    placeholder.value = props.default
  }

  const load = () => {
    try {
      isLoaded.value = true
    } catch (error) {}
  }
  const error = () => {
    isLoaded.value = false
  }

  watch(
    () => props.src,
    (newVal) => {
      if (props.src) {
        source.value = props.src
      }
    }
  )
</script>

<template>
  <div class="relative">
    <img v-if="!isLoaded" :src="placeholder" :class="attrs.class" />
    <!-- <div v-if="!isLoaded" class="absolute inset-0 bg-gray-700 animate-pulse rounded-md"></div> -->
    <img
      :src="source"
      alt=""
      @load="load"
      @error="error"
      :class="[isLoaded ? '' : 'hidden', attrs.class]"
    />
  </div>
</template>
