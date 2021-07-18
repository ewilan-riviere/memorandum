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
    }
  },
  created() {
    this.source = this.$attrs['data-src']
  },
  methods: {
    errorOnLoad() {
      this.error = true
      this.source = '/documentation/logo/default.webp'
    },
  },
}
</script>
