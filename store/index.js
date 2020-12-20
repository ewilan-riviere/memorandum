export const state = () => ({
  teams: {},
  sidebarOpened: false,
  layerVisible: false,
  guides: [],
  content: [],
  routes: [
    // { label: 'Articles', routeName: 'posts' },
    // { label: 'Nos clients', routeName: 'clients' },
    // { label: 'Notre équipe', routeName: 'team' },
    // { label: 'À propos', routeName: 'about' },
  ],
  settings: {},
  contentCurrentPath: '',
  currentDocument: {},
})

export const mutations = {
  setSettings(state, data) {
    state.settings = data
  },
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
  setContent(state, data) {
    state.content = data
  },
  setGuides(state, data) {
    state.guides = data
  },
  setContentCurrentPath(state, data) {
    state.contentCurrentPath = data
  },
  setCurrentDocument(state, data) {
    state.currentDocument = data
  },
}
