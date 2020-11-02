<template>
  <span :class="`icon-${name}`" class="svg-icon">
    <client-only>
      <component
        :is="`icon-${name}`"
        :width="size"
        :height="ratio ? 'unset' : size"
        :class="[svg, { 'fill-current': !stroke }]"
      >
      </component>
    </client-only>
  </span>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    /**
     * SVG filename from @/assets/icons/ like 'github' for 'github.svg'
     */
    name: {
      type: String,
      required: true,
      default: 'github',
    },
    /**
     * Size of Icon
     */
    size: {
      type: [Number, String],
      default: 18,
    },
    /**
     * Additional classes directly for <svg />
     */
    svg: {
      type: String,
      default: '',
    },
    /**
     * If SVG is not square, add this like <icon name="..." ratio /> to respect ratio
     */
    ratio: {
      type: Boolean,
      default: false,
    },
    /**
     * For SVG if designed by <svg stroke-width="..." />
     */
    stroke: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
