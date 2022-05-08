<script setup lang="ts">
const props = defineProps<{
  src?: string
  default?: string
}>()

const source = ref('')
const isLoaded = ref(false)
const attrs = useAttrs()
const placeholder = ref('/content/logo/default.webp')

const load = () => {
  isLoaded.value = true
}
const error = () => {
  isLoaded.value = false
}

onMounted(() => {
  if (props.src) {
    source.value = props.src
  }
  if (props.default) {
    placeholder.value = props.default
  }
})

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
    <img
      :src="source"
      alt=""
      :class="[isLoaded ? '' : 'hidden', attrs.class]"
      @load="load"
      @error="error"
    />
  </div>
</template>
