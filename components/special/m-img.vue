<template>
  <client-only>
    <img :src="image" :alt="`${name}`" />
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
  data() {
    return {
      defaultLogo: '/documentation/logo/guides.webp',
      defaultBanner: '/images/default.webp',
    }
  },
  computed: {
    image() {
      try {
        return require(`~/static${this.src}`)
      } catch (e) {
        return this.defaultLogo
      }
    },
    name() {
      let name = this.src.split('/')
      name = name[name.length - 1]
      name = name.split('.')
      name = name[0]
      return name
    },
  },
}
</script>
