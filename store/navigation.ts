import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    categoriIsOpened: false,
  }),
  actions: {
    toggleCategory() {
      this.$patch({
        categoriIsOpened: !this.categoriIsOpened,
      })
    },
  },
})
