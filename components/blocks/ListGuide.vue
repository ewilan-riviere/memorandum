<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <div class="overflow-hidden bg-white shadow sm:rounded-md">
    <ul>
      <li v-for="(guide, guideId) in guides" :key="guideId">
        <nuxt-link
          :to="getRoute(guide)"
          class="block transition duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:bg-gray-50"
        >
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="flex items-center flex-1 min-w-0">
              <!-- <div class="flex-shrink-0">
                <client-only>
                  <img
                    class="w-12 h-12"
                    :src="`/documentation/logo/${guide.entity}.webp`"
                    alt=""
                    @error="imgError"
                  />
                </client-only>
              </div> -->
              <div class="min-w-0 px-4">
                <div>
                  <div
                    class="text-lg font-medium leading-5 text-indigo-600 truncate"
                  >
                    {{ guide.title }}
                  </div>
                  <div class="flex items-center my-1 text-gray-600">
                    <icon name="clock" stroke class="mr-1" />
                    {{ guide.readingTime.text }}
                  </div>
                  <div>
                    <p v-if="guide.description" v-html="guide.description"></p>
                    <span v-else class="italic text-gray-400">
                      No description
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <!-- Heroicon name: chevron-right -->
              <svg
                class="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListGuide',
  props: {
    guides: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    imgError(event) {
      event.target.src = require(`~/static/documentation/logo/guides.webp`)
    },
    getRoute(guide) {
      const path = guide.path.replace('/documentation/', '').split('/')
      const route = {
        name: 'content-slug',
        params: {
          type: path[0],
          category: path[1],
          entity: path[2],
          content: path[3],
        },
      }
      switch (path.length) {
        case 3:
          route.params = {
            type: path[0],
            // category: path[1],
            entity: path[1],
            content: path[2],
          }
          break

        default:
          route.params = {
            type: path[0],
            category: path[1],
            entity: path[2],
            content: path[3],
          }
          break
      }
      return route
    },
    time(time) {
      console.log(time)
      const format = new Date(time * 1000).toISOString().substr(11, 8)
      console.log(format)
      return format
    },
  },
}
</script>
