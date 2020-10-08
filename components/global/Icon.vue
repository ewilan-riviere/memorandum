<template>
  <span :class="`icon-${name}`" class="svg-icon">
    <client-only>
      <!-- eslint-disable vue/require-component-is -->
      <component
        :is="`icon-${name}`"
        :width="size ? size : width"
        :height="size ? size : height ? height : '100%'"
        :class="svgClass"
        class="fill-current"
      >
      </component>
    </client-only>
  </span>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
      default: 'nuxtjs',
    },
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: null,
    },
    size: {
      type: [Number, String],
      default: null,
    },
    svgClass: {
      type: String,
      default: '',
    },
  },
}
</script>
