<template>
  <div class="flex flex-wrap font-sans text-xs sm:text-sm md:text-base">
    <div
      v-for="skill in skills"
      :key="skill.body"
      class="flex items-center h-6 px-3 mb-3 mr-3 border rounded-full sm:h-8"
      :class="classesFor(skill.theme)"
    >
      <Icon
        v-if="skill.icon"
        class="w-4 mr-2"
        primary="text-gray-500"
        secondary="text-gray-700"
        :icon="skill.icon"
      ></Icon>
      <div v-text="skill.body"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    skills: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    classesFor(theme) {
      switch (theme) {
        case 'category':
          return 'border-transparent bg-gray-200 text-gray-600 text-xs md:text-sm font-semibold uppercase tracking-wide'

        case 'highlighted':
          return 'border-transparent bg-topaz text-white'

        default:
          return 'text-gray-800 md:text-gray-600'
      }
    },
  },
}
</script>
