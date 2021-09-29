<template>
  <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
      <li v-for="guide in guides" :key="guide.id">
        <nuxt-link
          :to="guide.path"
          class="
            block
            hover:bg-gray-50
            dark:hover:bg-gray-700
            transition-colors
            duration-75
          "
        >
          <div class="px-4 py-4 flex items-center sm:px-6">
            <div
              class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between"
            >
              <div class="line-clamp-1">
                <div class="flex text-sm">
                  <p
                    class="
                      font-semibold
                      text-lg text-primary-600
                      dark:text-primary-300
                      line-clamp-1
                    "
                  >
                    {{ guide.title }}
                  </p>
                  <!-- <p class="ml-1 flex-shrink-0 font-normal text-gray-500">
                    in {{ guide.department }}
                  </p> -->
                </div>
                <div class="mt-2 flex">
                  <div
                    class="
                      flex
                      items-center
                      text-sm text-gray-500
                      dark:text-gray-400
                      line-clamp-1
                    "
                  >
                    {{ guide.description }}
                    <!-- <CalendarIcon
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      Closing on
                      {{ ' ' }}
                      <time :datetime="guide.closeDate">{{
                        guide.closeDateFull
                      }}</time>
                    </p> -->
                  </div>
                </div>
              </div>
              <div class="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                <div
                  class="
                    flex
                    overflow-hidden
                    -space-x-1
                    text-sm text-gray-500
                    dark:text-gray-400
                  "
                >
                  <!-- <img
                    v-for="applicant in guide.applicants"
                    :key="applicant.email"
                    class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    :src="applicant.imageUrl"
                    :alt="applicant.name"
                  /> -->
                  <time :datetime="guide.updatedAt">{{
                    $getDate(guide.updatedAt)
                  }}</time>
                </div>
              </div>
            </div>
            <div class="ml-5 flex-shrink-0">
              <svg-icon
                name="chevron-right"
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BlockGuidesList',
  props: {
    guides: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
