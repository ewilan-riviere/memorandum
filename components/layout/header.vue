<template>
  <nav
    class="
      fixed
      top-0
      z-40
      w-full
      border-b
      dark:border-gray-800
      bg-white
      dark:bg-gray-900
    "
    :class="{ 'shadow border-transparent': scrolled }"
    @click="scrollToTop"
  >
    <div class="container mx-auto flex-1 px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="lg:w-1/5 flex items-center pr-4" @click.stop="noop">
          <!-- <NuxtLink
            :to="localePath('/')"
            class="flex-shrink-0 flex-1 font-bold text-xl"
            :aria-label="`${settings.title} Logo`"
          > -->
          <NuxtLink
            to="/"
            class="
              flex-shrink-0 flex-1
              font-bold
              text-xl
              hover:bg-primary-100
              dark:hover:bg-primary-800
              p-1
              rounded-md
            "
            :aria-label="`${settings.title} Logo`"
          >
            <span v-if="!logo">{{ settings.title }}</span>

            <svg-icon
              name="logo-full"
              class="h-8 w-44 text-black dark:text-gray-100"
            />
            <!-- <img
              v-if="logo"
              :src="logo.light"
              class="h-8 max-w-full dark:hidden"
              :alt="settings.title"
            />
            <img
              v-if="logo"
              :src="logo.dark"
              class="h-8 max-w-full hidden dark:block"
              :alt="settings.title"
            /> -->
          </NuxtLink>
        </div>
        <div
          v-if="settings.layout !== 'single'"
          class="flex-1 flex justify-start w-4/6"
        >
          <!-- <app-search-algolia
            v-if="settings.algolia"
            :options="settings.algolia"
            :settings="settings"
          />
          <app-search v-else class="hidden lg:block" /> -->
          <app-search class="hidden lg:block" />
        </div>
        <div
          class="lg:w-1/5 flex items-center pl-4 lg:pl-8"
          :class="{
            'justify-between': lastRelease && settings.layout !== 'single',
            'justify-end': !lastRelease || settings.layout === 'single',
          }"
        >
          <!-- <NuxtLink
            v-if="lastRelease"
            :to="localePath('/releases')"
            class="
              font-semibold
              leading-none
              text-gray-700
              dark:text-gray-300
              hover:text-primary-500
              dark-hover:text-primary-500
              text-base
              mr-4
            "
            exact-active-class="text-primary-500"
            > -->
          <a
            v-if="packageJson && packageJson.repository"
            :href="packageJson.repository.url"
            target="_blank"
            rel="noopener noreferrer"
            class="
              font-semibold
              leading-none
              text-gray-700
              dark:text-gray-300
              hover:text-primary-500
              dark-hover:text-primary-500
              text-base
              mr-4
            "
            exact-active-class="text-primary-500"
          >
            v{{ packageJson.version }}</a
          >
          <div class="flex items-center">
            <a
              v-if="settings.twitter"
              :href="`https://twitter.com/${settings.twitter}`"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              name="Twitter"
              class="
                text-gray-700
                dark:text-gray-300
                hover:text-primary-500
                dark-hover:text-primary-500
                ml-4
              "
              :class="{
                'hidden lg:block': settings.layout !== 'single',
              }"
            >
              <icon-twitter class="w-5 h-5" />
            </a>
            <a
              v-if="settings.github"
              :href="githubUrls.repo"
              target="_blank"
              rel="noopener noreferrer"
              title="Github"
              name="Github"
              class="
                text-gray-700
                dark:text-gray-300
                hover:text-primary-500
                dark-hover:text-primary-500
                ml-4
              "
              :class="{
                'hidden lg:block': settings.layout !== 'single',
              }"
            >
              <icon-github class="w-5 h-5" />
            </a>
            <div class="ml-3 flex space-x-3">
              <!-- <layout-lang-switcher /> -->
              <layout-color-switcher />
            </div>

            <button
              v-if="settings.layout !== 'single'"
              class="
                lg:hidden
                p-2
                rounded-md
                text-gray-700
                dark:text-gray-300
                focus:outline-none
                -mr-2
              "
              aria-label="Menu"
              @click.stop="menu = !menu"
            >
              <icon-x v-if="menu" class="w-5 h-5" />
              <icon-menu v-else class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import packageJson from '~/package.json'

export default {
  name: 'LayoutHeader',
  data() {
    return {
      scrolled: 0,
      packageJson,
    }
  },
  computed: {
    ...mapGetters(['settings', 'githubUrls', 'lastRelease']),
    menu: {
      get() {
        return this.$store.state.menu.open
      },
      set(val) {
        this.$store.commit('menu/toggle', val)
      },
    },
    logo() {
      if (!this.settings.logo) {
        return
      }

      if (typeof this.settings.logo === 'object') {
        return this.settings.logo
      }

      return {
        light: this.settings.logo,
        dark: this.settings.logo,
      }
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
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
