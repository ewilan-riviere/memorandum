<template>
  <button
    class="
      p-1
      transition-colors
      duration-100
      rounded-md
      hover:bg-gray-100 hover:bg-opacity-20
    "
    title="Changer le mode"
    @click="switchColorMode()"
  >
    <svg-icon
      v-if="colorMode === 'dark'"
      name="color/moon"
      class="w-6 h-6 text-cyan-uw"
    />
    <svg-icon v-else name="color/sun" class="w-6 h-6 text-cyan-uw" />
  </button>
</template>

<script>
export default {
  name: 'AppColorToggle',
  computed: {
    colorMode: {
      get() {
        return this.$colorMode.preference
      },
      set(newMode) {
        return newMode
      },
    },
  },
  watch: {
    colorMode(newCount, oldCount) {
      this.colorMode = this.$colorMode.preference
    },
  },
  mounted() {
    setTimeout(() => {
      this.colorMode = this.$colorMode.preference
    }, 100)
  },
  methods: {
    switchColorMode() {
      if (this.$colorMode.value === 'dark') {
        this.$colorMode.preference = 'light'
      } else {
        this.$colorMode.preference = 'dark'
      }
      this.colorMode = this.$colorMode.preference
    },
  },
}
</script>

<style lang="postcss" scoped>
.toggle {
  @apply h-6 w-11;
  /* height: 1.5rem; */
  /* width: 2.7rem; */
}
.toggle-inner {
  @apply h-5 w-5;
}
.icon-color {
  @apply h-4 w-4;
}
</style>
