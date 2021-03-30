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
  },
  data() {
    return {
      name: null,
    }
  },
  mounted() {
    console.log(this.src)
    let name = this.src.split('/')
    name = name[name.length - 1]
    name = name.split('.')
    name = name[0]
    this.name = name
  },
  methods: {
    imgError(event) {
      event.target.src = require(`~/static/documentation/logo/guides.webp`)
    },
  },
}
</script>
