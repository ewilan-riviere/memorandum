<template>
  <div class="w-1/2">
    <div
      class="relative flex p-4 mb-3 font-bold transition-colors duration-300 bg-red-300 rounded-md cursor-pointer hover:bg-red-400"
      @click="reveal = !reveal"
    >
      <div class="absolute" style="top: 40%; transform: translateY(-40%)">
        <span :class="reveal ? 'down' : 'right'" class="arrow"></span>
      </div>
      <div class="ml-5">
        {{ title }}
      </div>
    </div>
    <transition name="fade">
      <div v-if="reveal" class="flex">
        <div class="w-full">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HideReveal',
  props: {
    title: {
      type: String,
      default: 'Détails',
    },
  },
  data() {
    return {
      reveal: false,
    }
  },
}
</script>

<style lang="postcss" scoped>
.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transition: transform 0.3s;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
