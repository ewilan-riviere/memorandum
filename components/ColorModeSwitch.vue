<script setup lang="ts">
interface Props {
  size?: string
  spacing?: string
}
const { size = 'w-8 h-8', spacing = 'p-0' } = defineProps<Props>()

const colorMode = useColorMode()
const onClick = () =>
  colorMode.value === 'light'
    ? (colorMode.preference = 'dark')
    : (colorMode.preference = 'light')
</script>

<template>
  <button aria-label="Color Mode" class="inline-block" @click="onClick">
    <ColorScheme placeholder="...">
      <Icon v-if="colorMode.value === 'dark'" name="heroicons-outline:moon" />
      <Icon v-else name="heroicons-outline:sun" />
    </ColorScheme>
  </button>
</template>
