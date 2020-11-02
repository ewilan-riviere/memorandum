<template>
  <div class="min-h-screen">
    <div class="container mx-auto mt-40">
      <div class="my-10 text-2xl text-center font-quicksand">
        <div>AboutIndex</div>
      </div>
      <div class="container">
        <div class="flex mx-auto w-max-content">
          <icon name="tech-nuxtjs-logo" :size="200" />
          <icon name="tech-nuxt-content-logo" :size="200" />
        </div>
        <nuxt-content :document="page" class="mt-20" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutIndex',
  async asyncData({ $content }) {
    const page = await $content('about/index').fetch()

    return {
      page,
    }
  },
}
</script>
