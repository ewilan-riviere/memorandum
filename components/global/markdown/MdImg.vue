<template>
  <div class="flex">
    <div
      v-if="imgFound"
      class="relative p-2 rounded-md shadow-md"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <div
        class="transition-transform duration-300 cursor-pointer zoom"
        @click="openInTab"
      >
        <div
          :class="hover ? 'opacity-100' : 'opacity-0'"
          class="absolute top-0 right-0 z-10 p-3 leading-5 transition-opacity duration-300 bg-gray-300 bg-opacity-95"
        >
          Click on image
          <br />
          to open it in new tab
        </div>
        <img
          :src="`/documentation/${path}/${source}`"
          :alt="source"
          class="mx-auto my-auto"
          @error="handleImgError"
        />
      </div>
      <small v-if="from" class="mt-2"
        >From
        <a :href="from" target="_blank" rel="noopener noreferrer">
          {{ domain_from_url(from) }}
        </a>
      </small>
    </div>
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
    from: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      path: null,
      imgFound: true,
      hover: false,
    }
  },
  mounted() {
    this.getPath()
  },
  methods: {
    openInTab() {
      window.open(`/documentation/${this.path}/${this.source}`)
    },
    domain_from_url(url) {
      let result
      let match
      if (
        (match = url.match(
          /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im
        ))
      ) {
        result = match[1]
        if ((match = result.match(/^[^.]+\.(.+\..+)$/))) {
          result = match[1]
        }
      }
      return result
    },
    handleImgError() {
      console.error('img error')
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

<style lang="postcss" scoped>
img {
  margin: 0 auto !important;
}
.zoom:hover {
  transform: scale(1.025);
}
</style>
