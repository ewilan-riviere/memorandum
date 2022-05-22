<script setup lang="ts">
import { slugify } from '@/utils/methods'
import { useNavigationStore } from '~~/store/navigation'

const props = defineProps<{
  node: any
}>()

const route = useRoute()
const store = useNavigationStore()
const display = ref(false)

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

const selected = (slug: string | null | undefined) => {
  if (slug && route.path.includes(slug)) {
    return true
  }
  return false
}

const checkCurrentCategory = () => {
  if (route.path.includes(slugify(props.node.title)!)) {
    display.value = true
  }
}
checkCurrentCategory()

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
</script>

<template>
  <div>
    <button
      :to="node._path"
      :class="display ? 'bg-gray-700' : ''"
      class="pl-4 category flex items-center justify-between"
      @click="toggle"
    >
      <span class="flex items-center">
        <svg-icon :name="slugify(node.title)" class="w-4 h-4 mr-2" />
        {{ node.title }}
      </span>
      <svg-icon
        name="chevron-right"
        :class="{ 'rotate-45': display }"
        class="w-4 h-4 transition-transform duration-100"
      />
    </button>
    <Transition>
      <div v-if="display" class="mt-1">
        <div
          v-for="subNode in node.children"
          :key="subNode._path"
          class="pl-3 my-1"
        >
          <nuxt-link
            :to="subNode._path"
            :class="{ selected: selected(slugify(subNode.title)) }"
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

<style lang="css" scoped>
.selected {
  @apply bg-gray-700;
}
.category {
  @apply text-white hover:bg-gray-700 hover:text-gray-100 flex items-center px-2 py-2 text-sm font-medium rounded-md w-full capitalize mt-2;
}
.link {
  @apply text-white hover:bg-gray-700 hover:text-gray-100 flex items-center px-2 py-2 text-sm font-medium rounded-md w-full capitalize;
}
</style>
