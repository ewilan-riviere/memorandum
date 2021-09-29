<template>
  <a :href="`${appUrl}/${url}`" target="_blank" rel="noopener noreferrer">
    {{ text }}
  </a>
</template>

<script>
export default {
  name: 'LocalLink',
  props: {
    url: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: 'link',
    },
  },
  data() {
    return {
      appUrl: process.env.BASE_URL,
    }
  },
}
</script>
