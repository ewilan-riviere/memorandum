<template>
  <div>
    <app-article :document="document" class="min-h-screen" />
    <!-- <div class="pt-4 pb-4 lg:px-8 flex flex-col sm:flex-row justify-between">
      <span
        class="
          text-gray-600
          dark:text-gray-400
          text-sm
          font-medium
          flex
          items-center
        "
      >
        {{ $getDate(document.updatedAt) }}
      </span>
    </div>
    <div
      class="grid grid-cols-2 gap-2 lg:px-8 pt-4 border-t dark:border-gray-800"
    >
      <span>&nbsp;</span>
      <a
        href="/installation"
        class="
          text-primary-500
          font-bold
          hover:underline
          flex
          items-center
          justify-end
        "
        ><span class="truncate">Installation</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          class="w-4 h-4 ml-1 flex-shrink-0"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path></svg
      ></a>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ContentBlock',
  props: {
    document: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
