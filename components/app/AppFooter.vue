<template>
  <footer
    class="relative z-20 w-full h-16 bg-white border-t dark:border-gray-800 dark:bg-gray-900"
  >
    <div
      class="container flex items-center justify-between w-full h-full px-4 mx-auto lg:px-8"
    >
      <div class="flex items-end">
        <a href="https://nuxtjs.org" target="_blank" rel="noopener">
          <BuiltWithNuxtLight class="h-4 light-img" />
          <BuiltWithNuxtDark class="h-4 dark-img" />
        </a>
      </div>
      <div class="flex">
        <!-- <AppLangSwitcher /> -->
        <!-- <AppColorSwitcher class="ml-4" /> -->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  // computed: {
  //   availableLocales() {
  //     return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
  //   },
  // },
}
</script>
