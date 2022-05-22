import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', {
  state: () => ({
    documentation: null,
  }),
  actions: {
    setDocumentation(payload: any) {
      this.$patch({
        documentation: payload,
      })
    },
    clearDocumentation() {
      this.$patch({
        documentation: null,
      })
    },
  },
})
