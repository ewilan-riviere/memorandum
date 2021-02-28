<template>
  <div v-if="isVisible" class="markdown-document-reader">
    <nuxt-content :document="currentDocument" />
  </div>
</template>

<script>
import Vue from 'vue'
import AppCopyButton from '@/components/global/markdown/copy-button'
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
      currentDocument: this.document,
    }
  },
  watch: {
    document(newValue, OldValue) {
      this.currentDocument = this.document
      this.setCopyBtn()
    },
  },
  mounted() {
    this.setCopyBtn()

    const paragraphs = document.querySelectorAll('p')
    paragraphs.forEach((paragraph) => {
      paragraph.setAttribute('lang', 'en')
    })

    const titlesH2 = document.querySelectorAll('h2')
    const titlesH3 = document.querySelectorAll('h3')
    const toc = document.querySelectorAll('.scrollactive-item')

    titlesH2.forEach((title) => {
      const id = title.getAttribute('id')
      title.setAttribute('id', `to-${this.$slugify(id)}`)
    })
    titlesH3.forEach((title) => {
      const id = title.getAttribute('id')
      title.setAttribute('id', `to-${this.$slugify(id)}`)
    })
    toc.forEach((scrollItem) => {
      let href = scrollItem.getAttribute('href')
      href = href.replace('#', '')
      scrollItem.setAttribute('href', `#to-${this.$slugify(href)}`)
    })
  },
  created() {
    this.$store.commit('setCurrentDocument', this.document)
  },
  methods: {
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
