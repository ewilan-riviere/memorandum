<template>
  <div class="relative">
    <img
      v-if="imageNotExist"
      src="/icon.png"
      :alt="title"
      class="object-cover max-size"
    />
    <transition name="fade">
      <img
        v-if="loading"
        src="/icon.png"
        :alt="title"
        class="
          absolute
          inset-0
          transition-transform
          duration-300
          blur-sm
          max-size
          img
        "
      />
    </transition>
    <img
      v-lazy-load
      :class="[loading ? '' : '', picture]"
      :data-src="source"
      :alt="noAlt ? '' : title"
      :title="title"
      class="object-cover max-size img"
      @load="onImgLoad"
    />
  </div>
</template>

<script>
export default {
  name: 'AppImg',
  props: {
    color: {
      type: String,
      default: '#564fcc',
    },
    title: {
      type: String,
      default: 'Image',
    },
    picture: {
      type: String,
      default: null,
    },
    noAlt: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      imageNotExist: false,
      source: null,
    }
  },
  watch: {
    // src(newValue, oldValue) {
    //   this.loading = true
    // },
  },
  created() {
    if (!this.$attrs['data-src']) {
      this.imageNotExist = true
      console.log(this.$$attrs['data-src'])
    } else {
      this.source = this.$attrs['data-src']
      console.log(this.title)
    }
  },
  methods: {
    onImgLoad() {
      this.loading = false
    },
  },
}
</script>

<style lang="postcss" scoped>
.max-size {
  width: 98%;
  height: 98%;
}
</style>
