<template>
  <section>
    <a
      :href="link"
      target="_blank"
      rel="noopener noreferrer"
      class="w-full max-w-sm my-5 font-normal rounded-md shadow-md lg:max-w-full lg:flex"
    >
      <div
        class="flex-none h-48 overflow-hidden text-center bg-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l"
        :style="`background-image: url(/documentation/${path}/${id}.webp)`"
        title="Woman holding a mug"
      ></div>
      <div
        class="flex flex-col justify-between p-4 leading-normal bg-white rounded-b lg:rounded-b-none lg:rounded-r"
      >
        <div class="mb-8">
          <p class="flex items-center text-sm text-gray-600">
            <span v-if="love">❤️</span>
            <span v-if="pay">💰</span>
            <span v-if="medal">🏅</span>
          </p>
          <div class="mb-2 text-xl font-bold text-gray-900">
            {{ title }}
          </div>
          <p class="text-base italic text-gray-400 word-wraping" lang="en">
            {{ desc }}
          </p>
        </div>
      </div>
    </a>
  </section>
</template>

<script>
export default {
  name: 'TailwidnLibrary',
  props: {
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: 'No informations',
    },
    love: {
      type: Boolean,
      default: false,
    },
    pay: {
      type: Boolean,
      default: false,
    },
    medal: {
      type: Boolean,
      default: false,
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
      path.splice(0, 1)
      path = path.join('/')
      this.path = path
    },
  },
}
</script>

<style scoped>
section {
  all: revert;
}
</style>
