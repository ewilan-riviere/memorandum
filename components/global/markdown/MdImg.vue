<template>
  <div class="flex">
    <img
      :src="`/documentation/${path}/${source}`"
      :alt="source"
      class="mx-auto rounded-md shadow-md"
    />
  </div>
</template>

<script>
export default {
  name: 'MdImg',
  props: {
    source: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      path: null,
    }
  },
  mounted() {
    this.getPath()
  },
  methods: {
    getPath() {
      let path = this.$route.fullPath.split('/')
      path.splice(-1, 1)
      path.splice(0, 1)
      path = path.join('/')
      this.path = path
    },
  },
}
</script>
