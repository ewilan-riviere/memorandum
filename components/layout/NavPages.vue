<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <nav>
    <a
      href="#"
      class="flex items-center px-3 py-2 text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out bg-gray-200 rounded-md group hover:text-gray-900 focus:outline-none focus:bg-gray-300"
      aria-current="page"
    >
      <!-- Heroicon name: home -->
      <svg
        class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-500 transition duration-150 ease-in-out group-hover:text-gray-500 group-focus:text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
      <span class="truncate"> Dashboard </span>
      <span
        class="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full bg-gray-50 group-focus:bg-gray-100 transition ease-in-out duration-150"
      >
        5
      </span>
    </a>
    <a
      href="#"
      class="flex items-center px-3 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-200"
    >
      <!-- Heroicon name: users -->
      <svg
        class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 transition duration-150 ease-in-out group-focus:text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <span class="truncate"> Team </span>
    </a>
    <a
      href="#"
      class="flex items-center px-3 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-200"
    >
      <!-- Heroicon name: folder -->
      <svg
        class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 transition duration-150 ease-in-out group-focus:text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      <span class="truncate"> Projects </span>
      <span
        class="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full text-gray-600 bg-gray-200 group-hover:bg-gray-200 group-focus:bg-gray-300 transition ease-in-out duration-150"
      >
        19
      </span>
    </a>
    <a
      href="#"
      class="flex items-center px-3 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-200"
    >
      <!-- Heroicon name: calendar -->
      <svg
        class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 transition duration-150 ease-in-out group-focus:text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span class="truncate"> Calendar </span>
      <span
        class="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full text-gray-600 bg-gray-200 group-hover:bg-gray-200 group-focus:bg-gray-300 transition ease-in-out duration-150"
      >
        20+
      </span>
    </a>
    <a
      href="#"
      class="flex items-center px-3 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-200"
    >
      <!-- Heroicon name: inbox -->
      <svg
        class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 transition duration-150 ease-in-out group-focus:text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <span class="truncate"> Documents </span>
    </a>
    <a
      v-for="page in pages"
      :key="page.id"
      href="#"
      class="flex items-center px-3 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-md group hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-200"
    >
      <icon
        name="nav-default"
        class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 transition duration-150 ease-in-out group-focus:text-gray-500"
        :size="26"
        stroke
      />
      <span class="truncate">
        {{ capitalizeFirstLetter(page.label) }}
      </span>
      <span
        class="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full text-gray-600 bg-gray-200 group-hover:bg-gray-200 group-focus:bg-gray-300 transition ease-in-out duration-150"
      >
        {{ page.number }}
      </span>
    </a>
  </nav>
</template>

<script>
export default {
  name: 'NavPages',
  props: {
    pages: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>
