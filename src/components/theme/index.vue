<script setup lang="ts">
import {
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  ViewGridAddIcon,
} from '@heroicons/vue/outline'
import {
  ChevronLeftIcon,
} from '@heroicons/vue/solid'

const user = {
  name: 'Tom Cook',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Teams', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Directory', href: '#', icon: SearchCircleIcon, current: true },
  { name: 'Announcements', href: '#', icon: SpeakerphoneIcon, current: false },
  { name: 'Office Map', href: '#', icon: MapIcon, current: false },
]
const secondaryNavigation = [
  { name: 'Apps', href: '#', icon: ViewGridAddIcon },
  { name: 'Settings', href: '#', icon: CogIcon },
]

const sidebarOpen = ref(false)
</script>

<template>
  <div class="h-screen flex">
    <theme-sidebar :navigation="navigation" :secondary-navigation="secondaryNavigation" :user="user"
      :opened="sidebarOpen" />

    <!-- Static sidebar for desktop -->
    <theme-sidebar-static :navigation="navigation" :secondary-navigation="secondaryNavigation" :user="user" />
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="lg:hidden">
        <div class="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-1.5">
          <div>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-pink-500.svg" alt="Workflow" />
          </div>
          <div>
            <button type="button"
              class="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
              @click="sidebarOpen = !sidebarOpen">
              <span class="sr-only">Open sidebar</span>
              <MenuIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
          <!-- Breadcrumb -->
          <nav class="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden" aria-label="Breadcrumb">
            <a href="#" class="inline-flex items-center space-x-3 text-sm font-medium text-gray-100">
              <ChevronLeftIcon class="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Directory</span>
            </a>
          </nav>
          <theme-content>
            <slot />
          </theme-content>
        </main>
        <theme-directory-list />
      </div>
    </div>
  </div>
</template>


