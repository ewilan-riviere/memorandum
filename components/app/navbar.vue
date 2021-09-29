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
      bg-white
      dark:bg-gray-900
      lg:bg-transparent lg:dark:bg-transparent
      hidden
    "
  >
    <div
      class="
        lg:sticky lg:top-16
        overflow-y-auto
        h-full
        lg:h-auto lg:max-h-(screen-16)
      "
    >
      <ul class="p-4 lg:py-8 lg:pl-0 lg:pr-8">
        <!---->
        <li class="mb-4 active">
          <p
            class="
              mb-2
              text-gray-500
              uppercase
              tracking-wider
              font-bold
              text-sm
              lg:text-xs
            "
          >
            Getting started
          </p>
          <ul>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/"
                aria-current="page"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  flex
                  items-center
                  justify-between
                  text-primary-500
                  bg-primary-100
                  hover:text-primary-500
                  dark:bg-primary-900
                  nuxt-link-active
                "
              >
                Introduction
              </a>
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/installation"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                Installation
              </a>
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/writing"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                Writing content
              </a>
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/fetching"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                Fetching content
              </a>
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/displaying"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                Displaying content
              </a>
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/configuration"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                Configuration
              </a>
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/advanced"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                Advanced
              </a>
            </li>
          </ul>
        </li>
        <li class="mb-4">
          <p
            class="
              mb-2
              text-gray-500
              uppercase
              tracking-wider
              font-bold
              text-sm
              lg:text-xs
            "
          >
            Themes
          </p>
          <ul>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/themes/docs"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                Docs
              </a>
            </li>
          </ul>
        </li>
        <li class="mb-4">
          <p
            class="
              mb-2
              text-gray-500
              uppercase
              tracking-wider
              font-bold
              text-sm
              lg:text-xs
            "
          >
            Examples
          </p>
          <ul>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/examples/basic"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                Basic Usage
              </a>
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/examples/tailwindcss-typography"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                TailwindCSS Typography
              </a>
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/examples/docs-theme"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                Docs Theme
              </a>
            </li>
          </ul>
        </li>
        <li class="mb-4 lg:mb-0">
          <p
            class="
              mb-2
              text-gray-500
              uppercase
              tracking-wider
              font-bold
              text-sm
              lg:text-xs
            "
          >
            Community
          </p>
          <ul>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/snippets"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                Snippets
              </a>
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/integrations"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                Integrations
              </a>
            </li>
            <li class="text-gray-700 dark:text-gray-300">
              <a
                href="/releases"
                class="
                  px-2
                  rounded
                  font-medium
                  py-1
                  hover:text-primary-500
                  flex
                  items-center
                  justify-between
                "
              >
                Releases
              </a>
            </li>
          </ul>
        </li>
        <li class="lg:hidden space-x-2">
          <p
            class="
              mb-2
              text-gray-500
              uppercase
              tracking-wider
              font-bold
              text-sm
              lg:text-xs
            "
          >
            More
          </p>
          <div class="flex items-center space-x-4">
            <a
              href="https://twitter.com/nuxt_js"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              name="Twitter"
              class="
                inline-flex
                text-gray-700
                dark:text-gray-300
                hover:text-primary-500
              "
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-twitter w-5 h-5"
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
              class="
                inline-flex
                text-gray-700
                dark:text-gray-300
                hover:text-primary-500
              "
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-github w-5 h-5"
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                ></path></svg
            ></a>
            <div class="relative inline-block text-left inline-flex">
              <button
                class="rounded-md hover:text-primary-500 focus:outline-none"
              >
                <svg
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  class="w-6 h-6"
                >
                  <path
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  ></path>
                </svg>
              </button>
              <div
                class="
                  mt-2
                  w-auto
                  rounded-md
                  shadow-lg
                  z-50
                  origin-top-right
                  absolute
                  bottom-0
                  right-0
                "
                style="display: none"
              >
                <div class="rounded-md bg-white dark:bg-gray-800 shadow-xs">
                  <ul class="py-2">
                    <li>
                      <a
                        href="/ru"
                        class="
                          flex
                          px-4
                          items-center
                          hover:text-primary-500
                          leading-7
                          whitespace-no-wrap
                        "
                        >Русский</a
                      >
                    </li>
                    <li>
                      <a
                        href="/fr"
                        class="
                          flex
                          px-4
                          items-center
                          hover:text-primary-500
                          leading-7
                          whitespace-no-wrap
                        "
                        >Français</a
                      >
                    </li>
                    <li>
                      <a
                        href="/ja"
                        class="
                          flex
                          px-4
                          items-center
                          hover:text-primary-500
                          leading-7
                          whitespace-no-wrap
                        "
                        >日本語</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <span class="inline-flex"
              ><button
                aria-label="Color Mode"
                class="
                  rounded-md
                  hover:text-primary-500
                  focus:outline-none
                  transition
                  ease-in-out
                  duration-150
                "
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  ></path>
                </svg></button
            ></span>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'ContentNavbar',
}
</script>
