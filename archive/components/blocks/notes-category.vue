<template>
  <div>
    <nav>
      <div
        class="flex items-center px-3 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition-colors duration-300 ease-in-out rounded-md cursor-pointer group hover:text-gray-900 hover:bg-gray-300 focus:outline-none focus:text-gray-900 focus:bg-gray-200"
      >
        <icon
          :name="`nav-default`"
          class="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-500 transition duration-150 ease-in-out group-focus:text-gray-500"
          :size="26"
          default="nav-default"
        />
        <span class="font-semibold truncate">
          <!-- {{ $t(page.label) }} -->
          Notes
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NotesCategory',
}
</script>

<style lang="postcss" scoped></style>
