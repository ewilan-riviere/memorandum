<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const attrs = useAttrs()
const currentIcon = computed(() =>
  defineAsyncComponent({
    loader: () => import(`@/components/svg/${props.name}.svg`),
    loadingComponent: {
      template: `<span></span>`,
    },
    errorComponent: {
      template: `<span>error</span>`,
    },
    delay: 200,
    timeout: 3000,
    suspensible: true,
  })
)
</script>

<template>
  <span>
    <component :is="currentIcon" :class="attrs.class" />
  </span>
</template>
