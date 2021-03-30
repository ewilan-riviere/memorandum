<template>
  <client-only>
    <img :src="src" :alt="`${name} picture`" @error="imgError" />
  </client-only>
</template>

<script>
export default {
  name: 'MImg',
  props: {
    src: {
      type: String,
      default: null,
    },
    default: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    name() {
      let name = this.src.split('/')
      name = name[name.length - 1]
      name = name.split('.')
      name = name[0]
      return name
    },
  },
  methods: {
    imgError(event) {
      if (this.default) {
        event.target.src = require(`~/static/images/default.webp`)
      } else {
        event.target.src = require(`~/static/documentation/logo/guides.webp`)
      }
    },
  },
}
</script>
