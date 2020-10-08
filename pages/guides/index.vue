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
        {{ welcome[0].title }}
        <nuxt-content :document="welcome[0]" />
      </div>
      <div class="col-span-1 pt-6 border-l border-gray-300">
        <div class="fixed">toc</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuidesIndex',
  async asyncData({ $content }) {
    const welcome = await $content('guides').fetch()

    return {
      welcome,
    }
  },
}
</script>
