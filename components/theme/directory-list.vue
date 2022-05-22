<script setup lang="ts">
// import { SearchIcon } from '@heroicons/vue/solid'

const route = useRoute()
const navigation = ref()

const selected = (path: string | null | undefined) => {
  if (path && route.path === path) {
    return true
  }

  return false
}

const getNav = async () => {
  if (route.params && route.params.slug.length >= 3) {
    let path = route.path
    if (route.params.slug.length > 3) {
      let parse = path.split('/')
      parse.pop()
      path = parse.join('/')
    }

    const contentQuery = queryContent(path)
    let content = await contentQuery.find()
    navigation.value = content
  }
}
getNav()

watch(
  () => route.path,
  (newVal) => {
    getNav()
  }
)
</script>

<template>
  <aside
    class="hidden lg:order-first lg:flex lg:flex-col flex-shrink-0 w-64 border-r border-gray-700"
  >
    <div class="px-6 pt-6 pb-4">
      <h2 class="text-lg font-medium text-gray-100">
        <!-- {{ store.domain.label
        }}<span v-if="store.displaySubject"> / {{ store.subject.label }}</span> -->
        title
      </h2>
      <p class="mt-1 text-sm text-gray-400">Search content</p>
      <form class="mt-6 flex space-x-4" action="#">
        <div class="flex-1 min-w-0">
          <label for="search" class="sr-only">Search</label>
          <div class="relative rounded-md shadow-sm">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <!-- <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" /> -->
              Search
            </div>
            <input
              id="search"
              type="search"
              name="search"
              class="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-700 bg-gray-700 placeholder-white rounded-md"
              placeholder="Search"
            />
          </div>
        </div>
      </form>
    </div>
    <!-- Directory list -->
    <nav
      class="flex-1 min-h-0 overflow-y-auto scrollbar-thin"
      aria-label="Directory"
    >
      <ul role="list" class="relative z-0 divide-y divide-gray-700">
        <li v-for="item in navigation" :key="item.path">
          <div
            :class="{ selected: selected(item._path) }"
            class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-700 transition-colors duration-75 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500"
          >
            <nuxt-link :to="item._path" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true" />
              <p class="text-sm font-medium text-gray-100">
                {{ item.title }}
              </p>
              <!-- <p class="text-sm text-gray-400 truncate">
                    {{ person.role }}
                  </p> -->
            </nuxt-link>
          </div>
        </li>
      </ul>
      <!-- <div v-for="letter in Object.keys(directory)" :key="letter" class="relative">
        <div
          class="z-10 sticky top-0 border-t border-b border-gray-700 bg-gray-800 px-6 py-1 text-sm font-medium text-gray-400">
          <h3>{{ letter }}</h3>
        </div>
        <ul role="list" class="relative z-0 divide-y divide-gray-700">
          <li v-for="person in directory[letter]" :key="person.id">
            <div
              class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-700 transition-colors duration-75 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" :src="person.imageUrl" alt="" />
              </div>
              <div class="flex-1 min-w-0">
                <a href="#" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <p class="text-sm font-medium text-gray-100">
                    {{ person.name }}
                  </p>
                  <p class="text-sm text-gray-400 truncate">
                    {{ person.role }}
                  </p>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div> -->
    </nav>
  </aside>
</template>

<style lang="css" scoped>
.selected {
  @apply bg-gray-700;
}
</style>
