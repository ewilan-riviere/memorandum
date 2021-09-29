<template>
  <img
    :src="source"
    :title="title"
    :alt="noAlt ? '' : title"
    @error="errorOnLoad"
  />
</template>

<script>
export default {
  name: 'AppImg',
  props: {
    src: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: 'Image',
    },
    noAlt: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: false,
      source: null,
      default: '/documentation/logo/default.webp',
    }
  },
  methods: {
    errorOnLoad() {
      this.error = true
      this.source = this.default
    },
  },
}
</script>
