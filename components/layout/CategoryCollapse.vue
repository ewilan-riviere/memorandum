<template>
  <div>
    <div
      :class="{
        'bg-green-300 bg-opacity-50': opened,
      }"
    >
      <slot name="title"></slot>
    </div>
    <transition-expand>
      <div v-if="opened">
        <slot name="list"></slot>
      </div>
    </transition-expand>
  </div>
</template>

<script>
export default {
  name: 'CategoryCollapse',
  props: {
    label: {
      type: String,
      default: null,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      opened: false,
    }
  },
  mounted() {
    this.opened = this.expanded
  },
  methods: {
    open() {
      this.opened = true
    },
    false() {
      this.opened = false
    },
    toggle() {
      this.opened = !this.opened
    },
  },
}
</script>

<style scoped>
.rotate {
  transform: rotate(90deg);
}
.expand-enter-active,
.expand-leave-active {
  transition-property: opacity, height;
}
.expand-enter,
.expand-leave-to {
  opacity: 0;
}
</style>
