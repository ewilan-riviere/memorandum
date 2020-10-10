<template>
  <main class="container px-4 mx-auto lg:px-8">
    <div class="relative flex flex-wrap">
      <aside
        class="fixed inset-0 z-30 hidden w-full mt-16 bg-white lg:w-1/5 lg:block lg:relative lg:mt-0 dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent"
      >
        <div
          class="lg:sticky lg:top-16 overflow-y-auto h-full lg:h-auto lg:max-h-(screen-16)"
        >
          <client-only>
            <perfect-scrollbar>
              <ul class="p-4 lg:py-8 lg:pl-0 lg:pr-8">
                <slot name="aside"></slot>
                <!-- <li class="mb-4 lg:hidden">
              <div class="relative flex flex-col justify-between w-full">
                <div class="relative w-full">
                  <label for="search" class="sr-only">Search</label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    >
                      <svg
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-5 h-5 text-gray-500"
                      >
                        <path
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      id="search"
                      placeholder='Search the docs (Press "/" to focus)'
                      type="search"
                      autocomplete="off"
                      value=""
                      class="block w-full py-2 pl-10 pr-3 leading-5 text-gray-700 placeholder-gray-500 truncate bg-gray-200 border border-transparent rounded-md dark:text-white dark-focus:text-white focus:border-gray-300 dark-focus:border-gray-700 focus:outline-none focus:bg-white dark-focus:bg-gray-900 dark:bg-gray-800"
                    />
                  </div>
                </div>
                <ul
                  class="absolute top-0 z-10 flex-1 w-full overflow-hidden bg-white border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-700"
                  style="margin-top: 37px; display: none"
                >
                </ul>
              </div>
            </li>
            <li class="mb-4">
              <h3
                class="mb-2 text-sm font-bold tracking-wider text-gray-500 uppercase lg:text-xs"
              ></h3>
              <ul>
                <li class="text-gray-700 dark:text-gray-300">
                  <a
                    href="/"
                    aria-current="page"
                    class="flex items-center justify-between px-2 py-1 font-medium rounded hover:text-primary-500 text-primary-500 bg-primary-100 dark:bg-primary-900 nuxt-link-active"
                  >
                    Introduction
                  </a>
                </li>
              </ul>
            </li>
            <li class="mb-4">
              <h3
                class="mb-2 text-sm font-bold tracking-wider text-gray-500 uppercase lg:text-xs"
              >
                Guide
              </h3>
              <ul>
                <li class="text-gray-700 dark:text-gray-300">
                  <a
                    href="/setup"
                    class="flex items-center justify-between px-2 py-1 font-medium rounded hover:text-primary-500"
                  >
                    Setup
                  </a>
                </li>
              </ul>
            </li>
            <li class="mb-4 lg:mb-0">
              <h3
                class="mb-2 text-sm font-bold tracking-wider text-gray-500 uppercase lg:text-xs"
              >
                Community
              </h3>
              <ul>
                <li class="text-gray-700 dark:text-gray-300">
                  <a
                    href="/releases"
                    class="flex items-center justify-between px-2 py-1 font-medium rounded hover:text-primary-500"
                  >
                    Releases
                  </a>
                </li>
              </ul>
            </li>
            <li class="lg:hidden">
              <h3
                class="mb-2 text-sm font-bold tracking-wider text-gray-500 uppercase lg:text-xs"
              >
                More
              </h3>
              <div class="flex items-center ml-2">
                <a
                  href="https://twitter.com/@nuxt_js"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter"
                  name="Twitter"
                  class="inline-flex mr-4 text-gray-700 dark:text-gray-300 hover:text-primary-500"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5 feather feather-twitter"
                  >
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                    ></path></svg
                ></a>
                <a
                  href="https://github.com/nuxt/content"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Github"
                  name="Github"
                  class="inline-flex mr-4 text-gray-700 dark:text-gray-300 hover:text-primary-500"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5 feather feather-github"
                  >
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                    ></path></svg
                ></a>
                <span class="inline-flex"
                  ><button
                    aria-label="Color Mode"
                    class="transition duration-150 ease-in-out rounded-md hover:text-primary-500 focus:outline-none"
                  >
                    <svg
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg></button
                ></span>
              </div>
            </li> -->
              </ul>
            </perfect-scrollbar>
          </client-only>
        </div>
      </aside>
      <div class="flex flex-wrap-reverse w-full lg:w-4/5">
        <div
          :class="{
            'lg:border-l lg:border-r dark:border-gray-800': withBorders,
          }"
          class="w-full py-4 lg:pt-8 lg:pb-4 lg:w-3/4"
        >
          <slot name="main"></slot>
          <!-- <div class="flex pt-4 pb-4 lg:px-8">
            <a
              href="https://github.com/nuxt/content/edit/dev/docs/content/en/index.md"
              target="_blank"
              rel="noopener"
              class="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline"
            >
              Edit this page on GitHub
              <svg
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 h-4 ml-1"
              >
                <path
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path></svg
            ></a>
          </div> -->
          <!-- <div
            class="grid grid-cols-2 gap-2 pt-4 border-t lg:px-8 dark:border-gray-800"
          >
            <span>&nbsp;</span>
            <a
              href="/setup"
              class="flex items-center justify-end font-bold text-primary-500 hover:underline"
              ><span class="truncate">Setup</span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                class="flex-shrink-0 w-4 h-4 ml-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path></svg
            ></a>
          </div> -->
        </div>
        <div class="relative block w-full lg:w-1/4">
          <div
            class="lg:sticky lg:top-16 overflow-y-auto h-full lg:h-auto lg:max-h-(screen-16)"
          >
            <slot name="toc"></slot>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'MainLayout',
  props: {
    withBorders: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style>
.ps {
  height: 90vh;
}
</style>
