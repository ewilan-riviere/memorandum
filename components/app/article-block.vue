<template>
  <div>
    <app-article :document="document" class="min-h-screen" />
  </div>
</template>

<script>
export default {
  name: 'ContentBlock',
  props: {
    document: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
