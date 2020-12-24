<template>
  <div class="my-6">
    <div
      class="transition-colors duration-300 hover:shadow-md hover:scale-75 zoom"
    >
      <a :href="source" target="_blank">
        <img :src="source" alt srcset />
      </a>
    </div>
    <div class="mt-2 text-sm italic">
      Click on map to open it in large format.
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuildWarsMap',
  props: {
    source: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" scoped>
.zoom {
  transition: transform 0.5s, box-shadow 0.5s;
}

.zoom:hover {
  transform: scale(1.025);
}
</style>
