<template>
  <main
    class="min-h-screen bg-cover bg-top sm:bg-top"
    style="background-image: url('/error.webp')"
  >
    <div
      class="
        max-w-7xl
        mx-auto
        px-4
        py-16
        text-center
        sm:px-6 sm:py-24
        lg:px-8 lg:py-48
      "
    >
      <p
        class="
          text-sm
          font-semibold
          text-black text-opacity-50
          uppercase
          tracking-wide
        "
      >
        <span v-if="error.statusCode === 404">Page not found</span>
        <span v-else>An error occurred</span>
      </p>
      <h1
        class="
          mt-2
          text-4xl
          font-semibold font-quicksand
          text-white
          tracking-tight
          sm:text-5xl
        "
      >
        Run you fool, contingency is near!
      </h1>
      <p class="mt-2 text-lg font-medium text-black text-opacity-50">
        Memo is broken, it can become a dark AI!
      </p>
      <div class="mt-6">
        <nuxt-link
          to="/"
          class="
            inline-flex
            items-center
            px-4
            py-2
            border border-transparent
            text-sm
            font-medium
            rounded-md
            text-black text-opacity-75
            bg-white bg-opacity-75
            sm:bg-opacity-25 sm:hover:bg-opacity-50
          "
        >
          Go back home
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: this.error.message,
    }
  },
}
</script>
