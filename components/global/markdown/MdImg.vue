<template>
  <div class="flex">
    <img
      v-if="imgFound"
      :src="`/documentation/${path}/${source}`"
      :alt="source"
      class="mx-auto rounded-md shadow-md"
      @error="handleImgError"
    />
    <div
      v-else
      class="p-5 mx-auto border border-red-400 rounded-md shadow-lg bg-gray-50"
    >
      <div>
        <div class="text-6xl text-center text-red-600">Image not found</div>
        <small>
          Search if image exist on:
          <span class="px-1 py-1 bg-gray-200">{{
            `static/documentation/${path}/${source}`
          }}</span>
        </small>
      </div>
    </div>
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
      imgFound: true,
    }
  },
  mounted() {
    this.getPath()
  },
  methods: {
    handleImgError() {
      console.log('img error')
      this.imgFound = false
    },
    getPath() {
      let path = this.$route.fullPath.split('/')
      path.splice(0, 1)
      path = path.join('/')
      this.path = path
    },
  },
}
</script>
