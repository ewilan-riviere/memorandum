<script setup lang="ts"></script>

<template>
  <div class="bg-gray-900 text-white">
    <nuxt-link to="/">Home</nuxt-link>
    <ContentNavigation v-slot="{ navigation }">
      <nuxt-link
        v-for="firstNode of navigation"
        :key="firstNode._path"
        :to="firstNode._path"
      >
        {{ firstNode.title }}
        <nuxt-link
          v-for="secondNode in firstNode.children"
          :key="secondNode._path"
          :to="secondNode._path"
          class="pl-4"
        >
          {{ secondNode.title }}
          <nuxt-link
            v-for="thirdNode in secondNode.children"
            :key="thirdNode._path"
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
        </nuxt-link>
      </nuxt-link>
    </ContentNavigation>
  </div>
</template>

<style lang="css" scoped>
a {
  @apply block;
}
</style>
