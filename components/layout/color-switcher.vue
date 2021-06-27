<template>
  <span class="inline-flex">
    <button
      class="
        transition
        duration-150
        ease-in-out
        rounded-md
        hover:text-primary-500
        focus:outline-none
        group
      "
      aria-label="Color Mode"
      @click="
        $colorMode.value === 'dark'
          ? ($colorMode.preference = 'light')
          : ($colorMode.preference = 'dark')
      "
    >
      <client-only>
        <svg-icon
          v-if="$colorMode.value === 'light'"
          name="color/sun"
          class="w-6 h-6"
        />
        <svg-icon
          v-else
          name="color/moon"
          class="
            w-6
            h-6
            text-white
            transition-colors
            duration-100
            group-hover:text-gray-300
          "
        />
      </client-only>
    </button>
  </span>
</template>
