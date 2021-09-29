<template>
  <div class="flex flex-wrap relative">
    <app-sidenav :entities="entities" :type="type" />
    <div class="flex flex-wrap-reverse w-full lg:w-4/5 min-h-screen">
      <!-- <app-article-block :document="welcome" /> -->
      <div class="w-full dark:border-gray-800 lg:w-3/4 lg:border-l lg:border-r">
        <slot name="document" />
      </div>
      <!-- <app-toc :toc="welcome.toc" /> -->
      <div class="w-full lg:w-1/4 block relative">
        <slot name="toc" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutPage',
  props: {
    type: {
      type: String,
      default: 'subjects',
      validator: (val) => ['categories', 'subjects', 'guides'].includes(val),
    },
    entities: {
      type: [Object, Array],
      default: () => {},
    },
  },
}
</script>
