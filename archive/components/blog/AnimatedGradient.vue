<template>
  <div :style="animatedGradient"></div>
</template>

<script>
export default {
  props: {
    colors: {
      type: Array,
      default: () => ['#EE7752', '#E73C7E', '#23A6D5', '#23D5AB'],
    },
    time: { type: String, default: '25s' },
    degree: { type: String, default: '120deg' },
    progress: { type: Number, default: 100 },
  },
  computed: {
    animatedGradient() {
      const [first, second] = this.colors
      const colors = [...this.colors, first, second]
      return `
                animation: movingGradient ${this.time} linear infinite;
                background-size: ${colors.length * 100}% 100%;
                background-image: linear-gradient(${this.degree}, ${colors.join(
        ', '
      )});
                width: ${this.progress}%;
                transition: width .3s linear;
            `
    },
  },
}
</script>

<style lang="postcss">
@keyframes movingGradient {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
