<template>
  <div
    v-click-away="'close'"
    class="w-full relative flex flex-col justify-between"
  >
    <div
      class="w-full relative"
      @keydown.down="increment"
      @keydown.up="decrement"
      @keydown.enter="go"
    >
      <label for="search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="
            absolute
            inset-y-0
            left-0
            pl-3
            flex
            items-center
            pointer-events-none
          "
        >
          <IconSearch class="h-5 w-5 text-gray-500" />
        </div>
        <input
          id="search"
          ref="search"
          v-model="q"
          class="
            block
            w-full
            pl-10
            pr-3
            py-2
            truncate
            leading-5
            placeholder-gray-500
            border border-transparent
            text-white
            focus:text-white focus:border-gray-700
            rounded-md
            focus:outline-none focus:bg-gray-700
            bg-gray-800
          "
          :class="{ 'rounded-b-none': focus && (searching || results.length) }"
          placeholder="Search... (3 char. min)"
          type="search"
          autocomplete="off"
          @focus="onFocus"
          @blur="onBlur"
        />
        <div class="absolute top-1/2 -translate-y-1/2 transform right-5">
          <kbd>
            <span v-if="$device.isMacOS">&#8984;</span>
            <span v-else>Ctrl</span>
          </kbd>
          <kbd>K</kbd>
        </div>
      </div>
    </div>
    <ul
      v-show="focus && (searching || results.length)"
      class="
        z-10
        absolute
        w-full
        flex-1
        top-0
        bg-gray-900
        rounded-md
        border border-gray-700
        overflow-hidden
      "
      :class="{ 'rounded-t-none': focus && (searching || results.length) }"
      style="margin-top: 37px"
    >
      <li v-if="searching && !results.length" class="px-4 py-2">
        Searching...
      </li>
      <li
        v-for="(result, index) of results"
        :key="result.id"
        @mouseenter="focusIndex = index"
        @mousedown="go"
      >
        <NuxtLink
          :to="
            localePath({
              name: 'category-domain-subject',
              params: {
                category: result.hierarchy.category,
                domain: result.hierarchy.domain,
                subject: result.hierarchy.subject,
              },
            })
          "
          class="
            flex
            px-4
            py-2
            items-center
            leading-5
            transition
            ease-in-out
            duration-150
          "
          :class="{
            'text-primary-300 bg-gray-800': focusIndex === index,
          }"
          @click="focus = false"
        >
          <app-md-img
            :src="`/documentation/logo/${result.hierarchy.subject}.webp`"
            class="object-cover object-center h-5 w-5 hidden xl:block"
          />
          <span class="ml-1 flex items-center">
            <span v-if="result.category" class="font-bold">{{
              $t(result.category)
            }}</span>
            <IconChevronRight v-if="result.category" class="w-3 h-3 mx-1" />
            {{ result.title }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import ClickAway from '~/plugins/directives/click-away'

export default {
  directives: {
    'click-away': ClickAway,
  },
  data() {
    return {
      q: '',
      focus: false,
      focusIndex: -1,
      open: false,
      searching: false,
      results: [],
      searchKey: 'k',
    }
  },
  watch: {
    async q(q) {
      if (q.length >= 3) {
        this.focusIndex = -1
        if (!q) {
          this.searching = false
          this.results = []
          return
        }
        this.searching = true
        // this.results = await this.$content(this.$i18n.locale, { deep: true })
        this.results = await this.$content({ deep: true })
          .sortBy('updated_at', 'desc')
          .only(['title', 'slug', 'category', 'hierarchy', 'to'])
          .limit(12)
          .search(q)
          .fetch()
        this.searching = false
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.shortcutSearch)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.shortcutSearch)
  },
  methods: {
    close() {
      this.q = ''
      this.results = []
    },
    onFocus() {
      this.focus = true
      this.$emit('focus', true)
    },
    onBlur() {
      this.focus = false
      this.$emit('focus', false)
    },
    shortcutSearch(e) {
      if (e.key === this.searchKey && (e.ctrlKey || e.metaKey)) {
        e.preventDefault() // present "Save Page" from getting triggered.

        this.$refs.search.focus()
      }
    },
    increment() {
      if (this.focusIndex < this.results.length - 1) {
        this.focusIndex++
      }
    },
    decrement() {
      if (this.focusIndex >= 0) {
        this.focusIndex--
      }
    },
    go() {
      if (this.results.length === 0) {
        return
      }
      const result =
        this.focusIndex === -1 ? this.results[0] : this.results[this.focusIndex]
      // this.$router.push(this.localePath(result.to))
      this.$router.push(result.path)
      // Unfocus the input and reset the query.
      this.$refs.search.blur()
      this.q = ''
    },
  },
}
</script>

<style lang="postcss" scoped>
kbd {
  @apply bg-gray-700 px-2 py-1 rounded-md;
}
</style>
