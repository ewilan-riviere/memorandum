<template>
  <div>
    <main-layout>
      <div slot="aside"></div>
      <div slot="main" class="">
        <article v-if="inComing" class="relative overflow-hidden bg-white">
          <div class="relative">
            <div class="mx-auto mb-6 text-lg max-w-prose">
              <p
                class="text-base font-semibold leading-6 tracking-wide text-center text-indigo-600 uppercase"
              >
                {{ inComing.category }}
              </p>
              <h1
                class="mt-2 mb-8 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl sm:leading-10"
              >
                {{ inComing.title }}
              </h1>
              <p
                class="text-xl leading-8 text-gray-500"
                v-html="inComing.description"
              ></p>
            </div>
            <div class="mx-auto prose prose-lg text-gray-500">
              <nuxt-content :document="inComing" />
            </div>
          </div>
        </article>
      </div>
      <div slot="toc">
        <app-toc :toc="inComing.toc"></app-toc>
      </div>
    </main-layout>
  </div>
</template>

<script>
export default {
  name: 'InComing',
  async asyncData({ $content }) {
    const inComing = await $content('in-coming', { deep: true }).fetch()

    return {
      inComing,
    }
  },
}
</script>

<style lang="postcss" scoped></style>
