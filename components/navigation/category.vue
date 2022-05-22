<script setup lang="ts">
import { slugify } from '@/utils/methods'
import { useNavigationStore } from '~~/store/navigation'

const props = defineProps<{
  node: any
}>()

const route = useRoute()
const store = useNavigationStore()

const tag = ref('button')
const display = ref(false)

const toggle = () => {
  store.toggleCategory()
  if (!display.value) {
    nextTick(() => (display.value = !display.value))
  }
}
const checkCurrentCategory = () => {
  var searchin = route.path.toLowerCase()
  var str = props.node._path
  str = str.replace(/[*]/g, '.*').toLowerCase().trim()
  let result = new RegExp('^' + str + '*').test(searchin)

  if (route.path === props.node._path || result) {
    display.value = true
  }
}

const isDirectory = props.node.children !== undefined
const selected = (path: string | null | undefined) =>
  path && route.path === path

store.toggleCategory()

watch(
  () => store.switchCategories,
  (newVal) => {
    display.value = false
  }
)
watch(
  () => route.path,
  (newVal) => {
    checkCurrentCategory()
  }
)

onMounted(() => {
  if (!isDirectory) {
    tag.value = 'router-link'
  }
  checkCurrentCategory()
})
</script>

<template>
  <div>
    <component
      :is="tag"
      :to="node._path"
      :class="display ? 'selected' : ''"
      class="pl-4 category flex items-center justify-between"
      @click="toggle"
    >
      <span class="flex items-center">
        <app-img
          class="h-4 w-4 mr-2"
          :src="`/content/logo/${slugify(node.title)}.webp`"
          alt=""
        />
        {{ node.title }}
      </span>
      <svg-icon
        v-if="isDirectory"
        name="chevron-right"
        :class="{ 'rotate-45': display }"
        class="w-4 h-4 transition-transform duration-100"
      />
    </component>
    <Transition>
      <div v-if="display && isDirectory" class="mt-1">
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
    </Transition>
  </div>
</template>
