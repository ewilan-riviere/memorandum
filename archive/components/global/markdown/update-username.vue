<template>
  <div>
    <div class="w-full lg:w-1/2">
      <label for="username" class="block text-sm font-medium text-gray-700"
        >Change username</label
      >
      <div class="flex mt-1 rounded-md shadow-sm">
        <div class="relative flex items-stretch flex-grow focus-within:z-10">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            id="username"
            v-model="username"
            type="text"
            name="username"
            class="block w-full pl-10 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
            placeholder="jack"
          />
        </div>
        <button
          class="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          @click="getContent()"
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <transition-expand>
        <div
          v-if="showAlert"
          class="p-3 mt-5 text-green-800 bg-green-100 border-2 border-green-500 rounded-md"
        >
          <div class="text-lg font-bold">Success!</div>
          <div>
            You can use following commands with your username: {{ username }}
          </div>
        </div>
      </transition-expand>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateUsername',
  data() {
    return {
      username: null,
      oldUsername: null,
      showAlert: false,
    }
  },
  created() {
    this.username = 'jack'
    this.oldUsername = this.username
  },
  methods: {
    getContent() {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')

      for (const block of blocks) {
        const replace = this.oldUsername
        const re = new RegExp(replace, 'gi')

        block.innerHTML = block.innerHTML.replace(re, this.username)
      }
      this.oldUsername = this.username
      this.$parent.$parent.setCopy()

      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, 1500)
    },
  },
}
</script>

<style lang="postcss" scoped></style>
