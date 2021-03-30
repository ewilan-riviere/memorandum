<template>
  <client-only>
    <img :src="src" alt="" @error="imgError" />
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
  mounted() {
    console.log(this.src)
  },
  methods: {
    imgError(event) {
      event.target.src = require(`~/static/documentation/logo/guides.webp`)
    },
  },
}
</script>
