<script setup lang="ts">
import { slugify } from '@/utils/methods'
import { useNavigationStore } from '~~/store/navigation'

const props = defineProps<{
  node: any
}>()

const route = useRoute()
const store = useNavigationStore()
const display = ref(false)

store.toggleCategory()

const toggle = () => {
  if (display.value) {
    store.toggleCategory()
  } else {
    store.toggleCategory()
    setTimeout(() => {
      display.value = !display.value
    }, 200)
  }
}

const selected = (path: string | null | undefined) => {
  if (path && route.path === path) {
    return true
  }
  return false
}

const checkCurrentCategory = () => {
  if (route.path === props.node._path) {
    display.value = true
  }
}
checkCurrentCategory()

const isDirectory = ref(false)
const tag = ref('router-link')

watch(
  () => store.categoriIsOpened,
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
  isDirectory.value = props.node.children !== undefined
  if (isDirectory) {
    tag.value = 'button'
  }
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
            <app-img
              class="h-4 w-4 mr-2"
              :src="`/content/logo/${slugify(subNode.title)}.webp`"
              alt=""
            />
            {{ subNode.title }}
          </nuxt-link>
        </div>
      </div>
    </Transition>
  </div>
</template>
