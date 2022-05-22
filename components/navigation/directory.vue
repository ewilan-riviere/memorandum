<script setup lang="ts">
const props = defineProps<{
  node: any
  directory?: boolean
}>()

const isDisplayed = computed(() =>
  props.directory ? !props.node.children : props.node.children
)
</script>

<template>
  <div>
    <div v-if="isDisplayed">
      <div :class="props.directory ? 'link' : 'title'">
        {{ node.title }}
      </div>
      <navigation-category
        v-for="subNode in node.children"
        :key="subNode._path"
        :node="subNode"
      />
    </div>
  </div>
</template>
