<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <div>
    <section class="bg-indigo-800 bg-opacity-75">
      <div class="max-w-screen-xl mx-auto md:px-2 lg:px-4">
        <div
          class="px-4 py-5 sm:px-6 md:flex md:flex-col md:py-6 md:pl-0 md:pr-4 lg:pr-6"
        >
          <div class="md:flex-shrink-0">
            <svg
              class="hidden"
              fill="none"
              height="40"
              viewBox="0 0 105 40"
              role="img"
              aria-labelledby="svg-tuple"
            >
              <title id="svg-tuple">Tuple</title>
              <path
                fill="#B4C6FC"
                fill-rule="evenodd"
                d="M18 1L0 7v19.5l6 2V34l18 6V8.5l-6 2V1zM8 29.167L18 32.5V12.608l4-1.333v25.95L8 32.558v-3.391z"
                clip-rule="evenodd"
              />
              <path
                fill="#B4C6FC"
                d="M42.9 28V17.45h-3.51v-3.392h11.486v3.393h-3.53V28H42.9zM59.481 28.254c-4.075 0-6.376-2.028-6.376-6.006v-8.19h4.407v8.014c0 1.814.39 2.71 1.97 2.71 1.56 0 1.95-.896 1.95-2.73v-7.994h4.445v8.15c0 4.193-2.496 6.046-6.396 6.046z"
              />
              <path
                fill="#B4C6FC"
                fill-rule="evenodd"
                d="M68.965 14.058V28h4.407v-4.543h1.346c3.607 0 5.538-1.638 5.538-4.544v-.078c0-2.983-1.716-4.777-5.733-4.777h-5.558zm4.407 6.435h.916c1.17 0 1.775-.527 1.775-1.56v-.078c0-1.073-.605-1.502-1.755-1.502h-.936v3.14z"
                clip-rule="evenodd"
              />
              <path
                fill="#B4C6FC"
                d="M82.563 14.058V28h9.497v-3.412h-5.07v-10.53h-4.427zM94.562 28V14.058h9.906v3.393h-5.499v1.97h4.368v3.1h-4.368v2.086h5.811V28H94.562z"
              />
            </svg>
          </div>
          <blockquote
            class="mt-8 border-transparent md:flex-grow md:flex md:flex-col"
          >
            <div class="text-xl font-bold text-white font-quicksand">
              {{ title }}
            </div>
            <a :href="link" target="_blank" rel="noopener noreferrer">
              on {{ getDomain }}
            </a>
            <div
              class="relative text-lg font-medium leading-7 text-white md:flex-grow"
            >
              <svg
                class="absolute top-0 left-0 w-8 h-8 text-gray-400 transform -translate-x-3 -translate-y-2"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path
                  d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
                />
              </svg>
              <p class="relative" v-html="getExcerpt(excerpt)"></p>
            </div>
            <footer class="mt-8">
              <div class="flex items-center">
                <div>
                  <div class="text-lg italic font-medium leading-6 text-white">
                    By {{ author }}
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
    <div ref="content" class="p-5 bg-gray-100">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Citation',
  props: {
    title: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      excerpt: null,
    }
  },
  computed: {
    getDomain() {
      return new URL(this.link).hostname
    },
  },
  mounted() {
    this.excerpt = this.$refs.content.children[0].innerHTML
  },
  methods: {
    getExcerpt(text) {
      if (text) {
        const more = text.length > 80
        const excerpt = text.replace(/^(.{80}[^\s]*).*/, '$1')
        return `${excerpt}${more ? '...' : ''}`
      }
    },
  },
}
</script>

<style scoped>
blockquote {
  all: revert;
}
a {
  color: white !important;
}
</style>
