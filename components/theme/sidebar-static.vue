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
            <img class="h-8 w-auto" src="/logo-text.svg" alt="Workflow" />
          </router-link>
          <nav class="mt-5 flex-1" aria-label="Sidebar">
            <div class="px-2 space-y-1">
              <ContentNavigation v-slot="{ navigation }">
                <div v-for="firstNode of navigation" :key="firstNode._path">
                  <span v-if="isDirectory(firstNode)" class="title">
                    {{ firstNode.title }}
                  </span>
                  <nuxt-link :to="firstNode._path" class="group" v-else>
                    {{ firstNode.title }}
                  </nuxt-link>
                  <div
                    v-for="secondNode in firstNode.children"
                    :key="secondNode._path"
                  >
                    <navigation-category :node="secondNode" />
                  </div>
                  <!-- <div class="flex">
                    <nuxt-link
                      v-for="secondNode in firstNode.children"
                      :key="secondNode._path"
                      :to="secondNode._path"
                      class="pl-4"
                    >
                      {{ secondNode.title }}
                    </nuxt-link>
                  </div> -->
                  <!-- <nuxt-link
                    v-for="secondNode in firstNode.children"
                    :key="secondNode._path"
                    :to="secondNode._path"
                    class="pl-4"
                  >
                    {{ secondNode.title }}
                    <nuxt-link

                      :to="thirdNode._path"
                      class="pl-4"
                    >
                      {{ thirdNode.title }}
                      <nuxt-link
                        v-for="fourNode in thirdNode.children"
                        :key="fourNode._path"
                        :to="fourNode._path"
                        class="pl-4"
                      >
                        {{ fourNode.title }}
                      </nuxt-link>
                    </nuxt-link>
                  </nuxt-link> -->
                </div>
              </ContentNavigation>
              <!-- <a v-for="category in navigation" :key="category.name" :href="category.href" :class="[
                category.current
                  ? 'bg-gray-700 text-gray-100'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              ]" :aria-current="category.current ? 'page' : undefined">
                <component :is="category.icon" :class="[
                  category.current
                    ? 'text-gray-400'
                    : 'text-gray-400 group-hover:text-gray-400',
                  'mr-3 flex-shrink-0 h-6 w-6',
                ]" aria-hidden="true" />
                {{ category }}
              </a> -->
            </div>
            <!-- <hr class="border-t border-gray-700 my-5" aria-hidden="true" />
            <div class="flex-1 px-2 space-y-1">
              <a
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
              </a>
            </div> -->
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
