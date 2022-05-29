<script setup lang="ts">
// const document = ref()
// await useAsyncData('page-data', () =>
//   queryContent('/hello')
//     .findOne()
//     .then((e) => (document.value = e))
// )
// const route = useRoute()

// const response = ref()
// const load = async () => {
//   const { data } = await useAsyncData<any>(route.path, () =>
//     queryContent(route.path).findOne()
//   )
//   if (data) {
//     console.log(route.path, data.value)
//     response.value = data.value
//   }
// }
// await load()

// const { data: navigation } = await useAsyncData('navigation', () => {
//   return fetchContentNavigation()
// })

// watch(
//   () => route.path,
//   async (newVal) => {
//     await load()
//   }
// )
</script>

<template>
  <main>
    <!-- <ContentDoc v-slot="{ doc }">
      <h1>{{ doc.title }}</h1>
      <ContentRenderer :value="doc" />
    </ContentDoc> -->
    <!-- <ContentRenderer :value="response" class="prose prose-lg prose-invert">
      <MarkdownRenderer :value="response" />
      <template #not-found>
        <h1 class="text-2xl">Page not found</h1>
      </template>
    </ContentRenderer> -->
  </main>
</template>

<style lang="postcss">
/* Customize headers to remove default underline */
.prose h2 a,
.prose h3 a {
  @apply no-underline;
  &:hover {
    @apply border-b border-neutral-600 dark:border-neutral-300;
  }
}
</style>
