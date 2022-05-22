import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    switchCategories: false,
  }),
  actions: {
    toggleCategory() {
      this.$patch({
        switchCategories: !this.switchCategories,
      })
    },
  },
})
