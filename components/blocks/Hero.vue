<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <div class="relative pt-20 overflow-hidden bg-gray-50">
    <div class="relative pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
      <main class="max-w-screen-xl px-4 mx-auto sm:px-6">
        <div class="text-center">
          <h2
            class="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl"
          >
            <div class="items-center block mx-auto md:flex w-max-content">
              <icon
                name="blogtech-text"
                :width="240"
                :height="80"
                class="mt-3 useweb-colors"
              />
              <div class="mx-4 font-roboto-medium">de</div>
              <icon
                name="useweb-text"
                :width="240"
                :height="80"
                class="useweb-colors"
              />
            </div>
          </h2>
          <p
            class="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div class="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
            <div class="rounded-md shadow">
              <nuxt-link
                :to="{ name: 'posts' }"
                class="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition-colors duration-300 ease-in-out border border-transparent rounded-md bg-blue-useweb hover:bg-blue-useweb-dark focus:outline-none focus:border-blue-useweb-dark focus:shadow-outline-indigo md:py-4 md:text-lg md:px-10 font-roboto-medium"
              >
                Découvrir tous les articles
              </nuxt-link>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  methods: {
    usewebColor(firstPart, secondPart) {
      // return formatString
    },
  },
}
</script>

<style>
.useweb-colors path:nth-child(1) {
  @apply text-blue-useweb;
}
.useweb-colors path:nth-child(2) {
  @apply text-black;
}
</style>
