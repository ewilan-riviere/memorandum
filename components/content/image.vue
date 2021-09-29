<template>
  <picture class="flex">
    <div
      v-if="imgFound"
      class="relative p-2 mx-auto rounded-md"
      @mouseover="zoom ? (hover = true) : ''"
      @mouseleave="zoom ? (hover = false) : ''"
    >
      <div
        :class="{ 'cursor-pointer zoom': zoom }"
        class="transition-transform duration-100"
        @click="openInTab"
      >
        <div
          v-if="zoom"
          :class="hover ? 'opacity-100' : 'opacity-0'"
          class="
            absolute
            top-0
            right-0
            z-10
            p-3
            leading-5
            transition-opacity
            duration-100
            bg-gray-300 bg-opacity-95
            dark:bg-gray-700
          "
        >
          Click on image
          <br />
          to open it in new tab
        </div>
        <img
          :src="fullPath"
          :alt="metadata ? metadata : source"
          class="mx-auto my-auto shadow-sm"
          @error="handleImgError"
        />
        <legend v-if="legend" class="mt-2 mb-3 text-sm italic text-center">
          {{ legend }}
        </legend>
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
      class="
        p-5
        mx-auto
        border border-red-400
        rounded-md
        shadow-lg
        bg-gray-50
        dark:bg-gray-900 dark:text-gray-50
      "
    >
      <div>
        <div class="text-6xl text-center text-red-600">Image not found</div>
        <div class="my-3 text-lg text-center">
          {{ metadata ? metadata : source }}
        </div>
        <small>
          Search if image exist on:
          <span class="px-1 py-1 bg-gray-200 dark:bg-gray-700">{{
            `static/documentation/${path}/${source}`
          }}</span>
        </small>
      </div>
    </div>
  </picture>
</template>

<script>
export default {
  name: 'AppImg',
  props: {
    source: {
      type: String,
      default: null,
    },
    from: {
      type: String,
      default: null,
    },
    metadata: {
      type: String,
      default: null,
    },
    zoom: {
      type: Boolean,
      default: false,
    },
    legend: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      path: null,
      imgFound: true,
      hover: false,
      fullPath: null,
    }
  },
  mounted() {
    this.getPath()
    this.fullPath = `/documentation/${this.path}/${this.source}`
  },
  methods: {
    openInTab() {
      window.open(this.fullPath)
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
      console.error(`<MdImg />\nImage not found, check path ${this.path}`)
      this.imgFound = false
    },
    getPath() {
      let path = this.$route.fullPath.split('/')
      path.splice(0, 1)
      path.splice(path.length - 1, 1)
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
