<script setup lang="ts">
const isDirectory = (node: any) => node.children
</script>

<template>
  <div class="hidden lg:flex lg:flex-shrink-0">
    <div class="flex flex-col w-56">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex-1 flex flex-col min-h-0 border-r border-gray-700 bg-gray-800"
      >
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <router-link to="/" class="flex items-center flex-shrink-0 px-4">
            <!-- <img class="h-8 w-auto" src="/logo-text.svg" alt="Workflow" /> -->
            <svg-icon name="logo" class="h-8 w-auto" />
          </router-link>
          <nav class="mt-5 flex-1" aria-label="Sidebar">
            <div class="px-2 space-y-1">
              <ContentNavigation v-slot="{ navigation }">
                <div v-for="node of navigation" :key="node._path">
                  <span v-if="isDirectory(node)" class="title">
                    {{ node.title }}
                  </span>
                  <div v-for="subNode in node.children" :key="subNode._path">
                    <navigation-category :node="subNode" />
                  </div>
                </div>
              </ContentNavigation>
            </div>
            <hr class="border-t border-gray-700 my-5" aria-hidden="true" />
            <div class="flex-1 px-2 space-y-1">
              <ContentNavigation v-slot="{ navigation }">
                <div v-for="node of navigation" :key="node._path">
                  <nuxt-link
                    v-if="!isDirectory(node)"
                    :to="node._path"
                    class="link"
                  >
                    {{ node.title }}
                  </nuxt-link>
                </div>
              </ContentNavigation>
              <!-- <a
                v-for="item in secondaryNavigation"
                :key="item.name"
                :href="item.href"
                class="text-gray-400 hover:bg-gray-700 hover:text-gray-100 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-left"
              >
                <svg-icon
                  name="settings"
                  class="text-gray-400 group-hover:text-gray-400 mr-3 flex-shrink-0 h-6 w-6"
                  aria-hidden="true"
                />
                {{ item.name }}
              </a> -->
            </div>
          </nav>
        </div>
      </div>
    </div>
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
