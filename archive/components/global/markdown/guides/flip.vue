<template>
  <div class="my-4 flip">
    <div>
      <span>{{ demoText }}</span>
    </div>
    <div>
      <span class="flip_H">{{ demoText }}</span>
    </div>
    <div>
      <span class="flip_V">{{ demoText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Flip',
  data() {
    return {
      demoText: `Demo text ${this.decodeHTMLEntities('&#9986;')}`,
    }
  },
  methods: {
    decodeHTMLEntities(text) {
      const textArea = document.createElement('textarea')
      textArea.innerHTML = text
      return textArea.value
    },
    encodeHTMLEntities(text) {
      const textArea = document.createElement('textarea')
      textArea.textContent = text
      return textArea.innerHTML
    },
  },
}
</script>

<style lang="postcss" scoped>
.flip span {
  display: inline-block;
  font-size: 3rem;
}
.flip_H {
  transform: scale(-1, 1);
}
.flip_V {
  transform: scale(1, -1);
}
</style>
