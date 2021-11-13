<template>
  <aside
    class="
      w-full
      lg:w-1/5 lg:block
      fixed
      lg:relative
      inset-0
      mt-16
      lg:mt-0
      z-30
      bg-gray-900
      lg:bg-transparent
      sidenav
    "
    :class="{ block: menu, hidden: !menu }"
  >
    <div
      class="
        lg:sticky lg:top-16
        overflow-y-auto
        scrollbar-thin
        h-full
        lg:h-auto lg:max-h-(screen-16)
      "
    >
      <ul v-if="type === 'categories'" class="list">
        <li v-if="!settings.algolia" class="mb-4 lg:hidden">
          <AppSearch />
        </li>
        <blocks-sidenav-categories
          v-for="(domains, name) in entities"
          :key="name"
          :name="name"
          :domains="domains"
        />
      </ul>
      <ul v-else-if="type === 'subjects'" class="list">
        <blocks-sidenav-subjects :subjects="entities" />
      </ul>
      <blocks-sidenav-guides v-else-if="type === 'guides'" :guides="entities" />
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    type: {
      type: String,
      default: 'subjects',
      validator: (val) => ['categories', 'subjects', 'guides'].includes(val),
    },
    entities: {
      type: [Object, Array],
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['settings', 'githubUrls']),
    menu: {
      get() {
        return this.$store.state.menu.open
      },
      set(val) {
        this.$store.commit('menu/toggle', val)
      },
    },
    // categories() {
    //   // return this.$store.state.categories[this.$i18n.locale]
    //   return this.$store.state.categories[0]
    // },
  },
  methods: {
    isCategoryActive(documents) {
      if (documents) {
        return documents.some(
          (document) => document.to === this.$route.fullPath
        )
      }
    },
    isDocumentNew(document) {
      if (process.server) {
        return
      }
      if (!document.version || document.version <= 0) {
        return
      }

      const version = localStorage.getItem(`document-${document.slug}-version`)
      if (document.version > Number(version)) {
        return true
      }

      return false
    },
  },
}
</script>

<style lang="postcss" scoped>
.sidenav::v-deep .sidenav-title {
  content: none;
  @apply inline-block text-lg font-semibold font-quicksand after:w-4/5 after:block after:border-b-2 after:border-primary-400 after:rounded-md;
}
.sidenav::v-deep .sidenav-link {
  @apply flex p-2 rounded-md hover:bg-primary-700 my-2 justify-between transition-all duration-75;
}
.sidenav::v-deep .sidenav-link-active {
  @apply bg-primary-800 opacity-50;
}
.sidenav::v-deep .sidenav-chip {
  @apply bg-gray-800 rounded-md px-2 py-1 hidden xl:block;
}
.sidenav::v-deep .sidenav-link__wrapper {
  @apply flex items-center space-x-2;
}
.list {
  @apply p-4 xl:py-8 xl:pl-0 xl:pr-8 container mx-auto flex-1;
}
</style>
