<template>
  <div class="relative">
    <transition name="fade">
      <div
        v-if="!loaded"
        class="absolute inset-0 bg-gray-800 rounded-md animate-pulse"
      ></div>
    </transition>
    <img
      :src="source"
      :title="title"
      :alt="noAlt ? '' : title"
      class="h-full w-full object-cover"
      @load="loading"
      @error="errorOnLoad"
    />
  </div>
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
      loaded: false,
    }
  },
  created() {
    this.source = this.$attrs['data-src']
  },
  methods: {
    loading() {
      this.loaded = true
    },
    errorOnLoad() {
      this.error = true
      this.source = this.default
    },
  },
}
</script>
