<template>
  <span
    :class="[{ 'svg-baseline': baseline }, `icon-${name}`]"
    class="svg-icon"
  >
    <!-- eslint-disable vue/require-component-is -->
    <component
      :is="`icon-${name}`"
      :width="width"
      :height="height"
      :class="variant"
      class="fill-current"
    />
    <div
      v-if="text"
      class="position-relative"
    >
      <div class="text">
        {{ text }}
      </div>
    </div>

    <span
      v-if="badge"
      class="badge"
      v-text="badge"
    />
  </span>
</template>

<script>
export default {
  name: 'IconBase',
  props: {
    name: {
      type: String,
      required: true,
      default: 'github',
    },
    baseline: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: 18,
    },
    variant: {
      type: String,
      default: 'default',
    },
    badge: {
      type: [String, Number],
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="stylus" scoped>
.fill-current
  fill currentColor

.svg-icon
  position relative
  display inline-flex
  align-self center

  &.svg-baseline svg
    top 0.125em
    position relative

.text
  position absolute
  z-index 1
  top 50%
  left -3rem
  transform translate(-50%, -50%)

.badge
  font-size 0.7rem
  position absolute
  top -0.5rem
  right -0.5rem

</style>
