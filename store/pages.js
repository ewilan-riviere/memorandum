export const state = () => ({
  list: null,
})

export const getters = {
  getList(state) {
    return state.list
  },
}

export const mutations = {
  setList(state, list) {
    state.list = list
  },
}
