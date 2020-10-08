<template>
  <div class="flex">
    <img
      :src="`/images/posts/${$route.params.slug}/${source}`"
      :alt="source"
      class="mx-auto shadow-md"
    />
  </div>
</template>

<script>
export default {
  name: 'MdImg',
  props: {
    source: {
      type: String,
      default: null,
    },
  },
}
</script>
