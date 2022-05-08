<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg

import { useContent } from './composables/useContent'
import { useContentStore } from './stores/content'

useHead({
  title: 'Vitesse',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      name: 'theme-color',
      content: computed(() => '#00aba9'),
    },
  ],
})

const { navigation, objectIsEmpty } = useContent()
const { domain, setDomain } = useContentStore()

if (objectIsEmpty(domain)) {
  if (
    navigation &&
    navigation[0] &&
    navigation[0].domains &&
    navigation[0].domains[0]
  ) {
    setDomain(navigation[0].domains[0])
  }
}
</script>

<template>
  <main class="antialiased font-sans overflow-hidden">
    <div class="h-screen">
      <router-view />
    </div>
  </main>
</template>
