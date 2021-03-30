<template>
  <div>
    <layout-main>
      <div slot="main" class="">
        <article v-if="about" class="relative overflow-hidden bg-white">
          <div class="relative">
            <div class="mx-auto mb-6 text-lg max-w-prose">
              <p
                class="text-base font-semibold leading-6 tracking-wide text-center text-indigo-600 uppercase"
              >
                {{ about.category }}
              </p>
              <h1
                class="mt-2 mb-8 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl sm:leading-10"
              >
                {{ about.title }}
              </h1>
              <p
                class="text-xl leading-8 text-gray-500"
                v-html="about.description"
              ></p>
            </div>
            <div class="mx-auto prose prose-lg text-gray-500">
              <nuxt-content :document="about" />
            </div>
          </div>
        </article>
      </div>
      <div slot="toc">
        <table-of-content :toc="about.toc"></table-of-content>
      </div>
    </layout-main>
  </div>
</template>

<script>
export default {
  name: 'About',
  async asyncData({ $content }) {
    const about = await $content('about', { deep: true }).fetch()
    const notes = await $content('notes', { deep: true })
      .sortBy('position')
      .fetch()

    return {
      about,
      notes,
    }
  },
  methods: {},
}
</script>
