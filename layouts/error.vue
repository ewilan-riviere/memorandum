<template>
  <div>
    <div
      class="
        absolute
        text-center
        transform
        -translate-x-1/2 -translate-y-1/2
        top-1/2
        left-1/2
      "
    >
      <div>
        <div class="text-4xl font-bold text-red-600 font-quicksand">
          Error {{ error.statusCode }}
        </div>
        <div class="text-2xl italic font-semibold font-quicksand">
          {{ error.message }}
        </div>
      </div>
      <NuxtLink
        to="/"
        class="
          block
          mx-auto
          mt-5
          transition-colors
          duration-100
          border-b border-transparent
          hover:border-black
          w-max-content
        "
        >Go to home page</NuxtLink
      >
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: {
    error: {
      type: [Object, Array],
      default: () => {},
    },
  }, // you can set a custom layout for the error page
}
</script>
