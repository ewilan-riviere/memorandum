<template>
  <div v-if="isVisible" class="markdown-document-reader">
    <nuxt-content :document="currentDocument" />
  </div>
</template>

<script>
import Vue from 'vue'
import AppCopyButton from '~/components/global/markdown/copy-button'

export default {
  name: 'DisplayDocument',
  props: {
    document: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isVisible: true,
    }
  },
  computed: {
    currentDocument() {
      return this.$store.state.currentDocument
    },
  },
  watch: {
    currentDocument(newCount, oldCount) {
      console.log('Store updated!')
      this.setCopy()
    },
  },
  mounted() {
    this.setCopy()
  },
  created() {
    this.$store.commit('setCurrentDocument', this.document)
  },
  methods: {
    setCopy() {
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
    hide() {
      this.isVisible = true
      setTimeout(() => {
        this.isVisible = false
      }, 300)
    },
  },
}
</script>

<style lang="postcss" scoped></style>
