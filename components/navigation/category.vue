<script setup lang="ts">
import Content from '../layout/content.vue'
import { useNavigationStore } from '~~/store/navigation'
import { slugify } from '~/utils/methods'

const props = defineProps<{
  node: any
}>()

const route = useRoute()
const store = useNavigationStore()

const tag = ref('button')
const display = ref(false)

/**
 * Init: close categories
 */
store.toggleCategory()
/**
 * Toggle category on click.
 */
const toggle = () => {
  store.toggleCategory()
  if (!display.value) {
    nextTick(() => (display.value = !display.value))
  }
}
/**
 * Close category if another opened
 */
watch(
  () => store.switchCategories,
  (newVal) => {
    display.value = false
  }
)

/**
 * Open category if current path have this category
 */
const checkCurrentCategory = () => {
  nextTick(() => {
    const searchin = route.path.toLowerCase() // lower case route path
    const str = props.node._path.replace(/[*]/g, '.*').toLowerCase().trim()
    const result = new RegExp('^' + str + '*').test(searchin)

    if (result) {
      display.value = true
    }
  })
}

/**
 * Change route: check category
 */
watch(
  () => route.path,
  (newVal) => {
    checkCurrentCategory()
  }
)

const directory = computed(() => props.node.children !== undefined)
const selected = (path: string | null | undefined) =>
  path && route.path === path

onMounted(() => {
  checkCurrentCategory()
})
</script>

<template>
  <div>
    <component
      :is="directory ? 'button' : 'router-link'"
      :to="node._path"
      :class="display ? 'selected' : ''"
      class="pl-4 category flex items-center justify-between"
      @click="toggle"
    >
      <span class="flex items-center">
        <app-lazy-img
          class="h-4 w-4 mr-2"
          :src="`/content/logo/${slugify(node.title)}.webp`"
          alt=""
        />
        {{ node.title }}
      </span>
      <svg-icon
        v-if="directory"
        name="chevron-right"
        :class="{ 'rotate-45': display }"
        class="w-4 h-4 transition-transform duration-100"
      />
    </component>
    <div v-if="display" class="mt-1">
      <div
        v-for="subNode in node.children"
        :key="subNode._path"
        class="pl-3 my-1"
      >
        <nuxt-link
          :to="subNode._path"
          :class="{ selected: selected(subNode._path) }"
          class="link"
        >
          {{ subNode.title }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
