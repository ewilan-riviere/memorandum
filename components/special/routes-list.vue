<template>
  <button v-if="devMode" name="router" class="w-8 h-8" @click="routes">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="13" width="18" height="8" rx="2"></rect>
      <line x1="17" y1="17" x2="17" y2="17.01"></line>
      <line x1="13" y1="17" x2="13" y2="17.01"></line>
      <line x1="15" y1="13" x2="15" y2="11"></line>
      <path d="M11.75 8.75a4 4 0 0 1 6.5 0"></path>
      <path d="M8.5 6.5a8 8 0 0 1 13 0"></path>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'RoutesList',
  data() {
    return {
      devMode: process.env.NODE_ENV !== 'production',
    }
  },
  methods: {
    routes() {
      const routes = []
      this.$router.options.routes.forEach((route) => {
        routes.push({
          name: route.name,
          path: route.path,
        })
      })
      routes.forEach((route) => {
        console.log(`${route.name} on ${route.path}`)
      })
    },
  },
}
</script>
