<script setup lang="ts">
import { useNavigationStore } from '~~/store/navigation'

const props = defineProps<{
  node: any
  directory?: boolean
}>()

const isDirectory = props.node.children !== undefined
const isDisplayed = computed(() =>
  props.directory ? !props.node.children : props.node.children
)
const store = useNavigationStore()
</script>

<template>
  <div>
    <div v-if="isDisplayed">
      <component
        :is="isDirectory ? 'div' : 'router-link'"
        :class="isDirectory ? 'title' : 'link'"
        :to="node._path"
        @click.native="store.toggleCategory()"
      >
        {{ node.title }}
      </component>
      <navigation-category
        v-for="subNode in node.children"
        :key="subNode._path"
        :node="subNode"
      />
    </div>
  </div>
</template>
