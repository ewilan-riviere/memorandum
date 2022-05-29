<script setup lang="ts">
const { data: navigation } = await useAsyncData<any>('navigation', () => {
  return fetchContentNavigation()
})
</script>

<template>
  <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
    <router-link to="/" class="flex items-center flex-shrink-0 px-4">
      <svg-icon name="memorandum-text" class="h-8 w-auto text-white" />
    </router-link>
    <nav class="mt-5 flex-1" aria-label="Sidebar">
      <div class="flex-1 px-2 space-y-1">
        <navigation-directory
          v-for="node of navigation"
          :key="node._path"
          :node="node"
          directory
        />
      </div>
      <hr class="border-t border-gray-700 my-5" aria-hidden="true" />
      <div class="px-2 space-y-1">
        <navigation-directory
          v-for="node of navigation"
          :key="node._path"
          :node="node"
        />
      </div>
      <!-- <Navbar /> -->
      <!-- <ContentNavigation v-slot="{ navigation }">

      </ContentNavigation> -->
    </nav>
  </div>
</template>

<style lang="css" scoped>
:deep(.selected) {
  @apply bg-gray-700;
}
:deep(.category) {
  @apply text-white hover:bg-gray-700 hover:text-gray-100 flex items-center px-2 py-2 text-sm font-medium rounded-md w-full capitalize mt-2;
}
:deep(.link) {
  @apply text-white hover:bg-gray-700 hover:text-gray-100 flex items-center px-2 py-2 text-sm font-medium rounded-md w-full capitalize;
}
</style>
