<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-5">
      <div class="col-span-1 pt-6 border-r border-gray-300">
        <div class="fixed">
          <div v-for="(guide, guideId) in welcome" :key="guideId">
            {{ guide.title }}
          </div>
        </div>
      </div>
      <div class="col-span-3 px-8 pt-6">
        {{ welcome.title }}
        <img
          :src="`/images/posts/covers/${welcome.image}`"
          :alt="welcome.title"
          class=""
        />
        <div class="mt-3">
          <div v-for="bullet in bullets" :key="bullet" class="block my-2">
            <div class="flex">
              <svg
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="flex-shrink-0 w-6 h-6 mt-px mr-3 text-green-500"
              >
                <path
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
              {{ bullet }}
            </div>
          </div>
        </div>
        <div class="flex mt-3">
          <icon name="bullet-point" :size="50" class="text-green-600" />
          Blazing fast hot reload in development
        </div>
        <nuxt-content :document="welcome" />
      </div>
      <div class="col-span-1 pt-6 border-l border-gray-300">
        <div class="fixed">toc</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  async asyncData({ $content }) {
    const welcome = await $content('welcome').fetch()

    return {
      welcome,
    }
  },
  data() {
    return {
      bullets: [
        'Explicit topics with examples',
        'Copy and paste code',
        'Boiler plates',
        'Organized by Memo',
      ],
    }
  },
}
</script>
