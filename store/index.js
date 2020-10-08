export const state = () => ({
  teams: {},
  sidebarOpened: false,
  layerVisible: false,
  routes: [
    { label: 'Articles', routeName: 'posts' },
    { label: 'Nos clients', routeName: 'clients' },
    { label: 'Notre équipe', routeName: 'team' },
    { label: 'À propos', routeName: 'about' },
  ],
})

export const mutations = {
  setTeams(state, data) {
    state.teams = data
  },
  toggleSidebarOpened(state, data) {
    state.sidebarOpened = !state.sidebarOpened
  },
  setSidebarOpened(state, data) {
    state.sidebarOpened = data
  },
  toggleLayerVisible(state, data) {
    state.layerVisible = !state.layerVisible
  },
  setLayerVisible(state, data) {
    state.layerVisible = data
  },
}
