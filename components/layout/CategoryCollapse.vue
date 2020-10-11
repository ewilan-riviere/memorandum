<template>
  <div>
    <div
      :class="{
        'pl-2 bg-green-300 bg-opacity-50 border-green-600': opened,
      }"
      class="flex items-center p-2 mb-2 font-bold transition-colors duration-300 bg-gray-100 border-l-2 border-gray-400 cursor-pointer rounded-tr-md rounded-br-md hover:bg-gray-200"
      @click="opened = !opened"
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
