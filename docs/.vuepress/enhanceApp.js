import Translation from './config/locales/index'

export default ({ Vue, isServer, options, router }) => {
  Vue.use(Translation)
  if (!isServer) {
    import('vue-toasted' /* webpackChunkName: "notification" */).then((module) => {
      Vue.use(module.default)
    })
  }
}
