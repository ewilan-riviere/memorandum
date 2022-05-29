<script setup lang="ts">
const sidebarOpen = ref(false)
const content = ref<HTMLElement>()

const route = useRoute()

watch(
  () => route.path,
  (newVal) => {
    content.value?.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
)
</script>

<template>
  <div class="h-screen flex">
    <!-- <layout-sidebar :opened="sidebarOpen" /> -->
    <layout-sidebar-static />
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="lg:hidden">
        <div
          class="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-1.5"
        >
          <div>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-pink-500.svg"
              alt="Workflow"
            />
          </div>
          <div>
            <button
              type="button"
              class="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
              @click="sidebarOpen = !sidebarOpen"
            >
              <span class="sr-only">Open sidebar</span>
              <!-- <MenuIcon class="h-6 w-6" aria-hidden="true" /> -->
              MenuIcon
            </button>
          </div>
        </div>
      </div>
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main
          ref="content"
          class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
        >
          <!-- Breadcrumb -->
          <nav
            class="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
            aria-label="Breadcrumb"
          >
            <!-- <a
              href="#"
              class="inline-flex items-center space-x-3 text-sm font-medium text-gray-100"
            >
              ChevronLeftIcon
              <span>Directory</span>
            </a> -->
          </nav>
          <layout-content>
            <slot />
          </layout-content>
        </main>
      </div>
    </div>
  </div>
</template>
