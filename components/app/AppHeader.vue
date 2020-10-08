<template>
  <nav
    class="fixed top-0 z-40 w-full bg-white border-b dark:border-gray-800 dark:bg-gray-900"
    :class="{ 'shadow border-transparent': scrolled }"
    @click="scrollToTop"
  >
    <div class="container flex-1 px-4 mx-auto lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center pr-4 lg:w-1/5" @click.stop="noop">
          <NuxtLink
            :to="'/'"
            class="flex-1 flex-shrink-0 text-xl font-bold"
            :aria-label="`${settings.title} Logo`"
          >
            <span v-if="!logo">{{ settings.title }}</span>

            <img
              v-if="logo"
              :src="logo.light"
              class="h-8 max-w-full light-img"
              :alt="settings.title"
            />
            <img
              v-if="logo"
              :src="logo.dark"
              class="h-8 max-w-full dark-img"
              :alt="settings.title"
            />
          </NuxtLink>
        </div>
        <div
          v-if="settings.layout !== 'single'"
          class="justify-center flex-1 hidden w-4/6 lg:flex"
        >
          <AppSearch />
        </div>
        <div
          class="flex items-center pl-8 lg:w-1/5"
          :class="{
            'justify-between': lastRelease && settings.layout !== 'single',
            'justify-end': !lastRelease || settings.layout === 'single',
          }"
        >
          <NuxtLink
            v-if="lastRelease"
            to="/releases"
            class="mr-4 text-base font-semibold leading-none text-gray-700 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500"
            exact-active-class="text-primary-500"
            >{{ lastRelease.name }}</NuxtLink
          >
          <div class="flex items-center">
            <a
              v-if="settings.twitter"
              :href="`https://twitter.com/${settings.twitter}`"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              name="Twitter"
              class="ml-4 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500"
              :class="{
                'hidden lg:block': settings.layout !== 'single',
              }"
            >
              <IconTwitter class="w-5 h-5" />
            </a>
            <a
              v-if="settings.github"
              :href="githubUrls.repo"
              target="_blank"
              rel="noopener noreferrer"
              title="Github"
              name="Github"
              class="ml-4 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500"
              :class="{
                'hidden lg:block': settings.layout !== 'single',
              }"
            >
              <IconGithub class="w-5 h-5" />
            </a>
            <button
              v-if="settings.layout !== 'single'"
              class="p-2 -mr-2 text-gray-700 rounded-md lg:hidden dark:text-gray-300 focus:outline-none"
              aria-label="Menu"
              @click.stop="menu = !menu"
            >
              <IconX v-if="menu" class="w-5 h-5" />
              <IconMenu v-else class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      scrolled: 0,
      settings: {
        title: 'Title',
        layout: true,
      },
      logo: '/icon.png',
      menu: false,
      lastRelease: true,
    }
  },
  // computed: {
  //   ...mapGetters(['settings', 'githubUrls', 'lastRelease']),
  //   menu: {
  //     get() {
  //       return this.$store.state.menu.open
  //     },
  //     set(val) {
  //       this.$store.commit('menu/toggle', val)
  //     },
  //   },
  //   logo() {
  //     if (!this.settings.logo) {
  //       return
  //     }
  //     if (typeof this.settings.logo === 'object') {
  //       return this.settings.logo
  //     }
  //     return {
  //       light: this.settings.logo,
  //       dark: this.settings.logo,
  //     }
  //   },
  // },
  // beforeMount() {
  //   window.addEventListener('scroll', this.handleScroll)
  // },
  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0
    },
    scrollToTop() {
      if (window.innerWidth >= 1280) {
        return
      }
      window.scrollTo(0, 0)
    },
    noop() {},
  },
}
</script>
