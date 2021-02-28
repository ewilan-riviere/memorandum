<template>
  <div>
    <div
      :class="expanded ? 'rounded-t-lg' : 'rounded-lg'"
      class="flex items-center px-4 py-2 mt-4 font-bold transition-colors duration-300 bg-gray-200 cursor-pointer hover:bg-gray-300"
      @click="switchSpoiler"
    >
      <icon
        name="arrow-right"
        :size="20"
        :class="{ rotate: expanded }"
        class="mr-2 transition-transform duration-300"
      />
      <div class="w-full">
        <span v-if="label" class="flex items-center justify-between">
          <div>
            {{ label }}
          </div>
          <small>
            {{ expanded ? 'Minimize' : 'Open' }}
          </small>
        </span>
        <span v-else>
          {{ expanded ? 'Minimize' : 'Open' }}
        </span>
      </div>
    </div>
    <transition-expand>
      <div v-if="expanded" class="p-3 bg-gray-200 rounded-b-lg">
        <slot></slot>
      </div>
    </transition-expand>
  </div>
</template>

<script>
import Vue from 'vue'
import AppCopyButton from '@/components/global/markdown/copy-button'
export default {
  name: 'Spoiler',
  props: {
    label: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      expanded: false,
    }
  },
  methods: {
    switchSpoiler() {
      this.expanded = !this.expanded
      this.setCopyBtn()
    },
    setCopyBtn() {
      setTimeout(() => {
        const blocks = document.getElementsByClassName('nuxt-content-highlight')

        for (const block of blocks) {
          const lastChild = block.lastChild
          if (lastChild.className === 'copy') {
            block.removeChild(lastChild)
          }

          const CopyButton = Vue.extend(AppCopyButton)
          const component = new CopyButton().$mount()
          block.appendChild(component.$el)
        }
      }, 100)
    },
  },
}
</script>

<style lang="postcss" scoped>
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
