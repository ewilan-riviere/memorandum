<template>
  <div
    class="flex items-center justify-center w-full mx-auto mb-6 overflow-hidden text-3xl text-center text-white bg-black rounded-md codesandbox"
  >
    <iframe
      v-if="isIntersecting && src"
      :src="src"
      title="CodeSandbox editor"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      class="w-full overflow-hidden"
    />
    <span v-else>Loading CodeSandbox...</span>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isIntersecting: false,
    }
  },
  mounted() {
    if (!window.IntersectionObserver) {
      this.isIntersecting = true
      return
    }

    this.__observer = new window.IntersectionObserver((entries) => {
      entries.forEach(({ intersectionRatio, target: el }) => {
        if (intersectionRatio > 0) {
          this.isIntersecting = true
          this.__observer.disconnect()
          delete this.__observer
        }
      })
    })
    this.__observer.observe(this.$el)
  },
  beforeDestroy() {
    if (this.__observer) {
      this.__observer.disconnect()
      delete this.__observer
    }
  },
}
</script>

<style lang="postcss" scoped>
.codesandbox,
.codesandbox iframe {
  @apply w-full rounded-md overflow-hidden h-64;
  height: 500px;
}
</style>
