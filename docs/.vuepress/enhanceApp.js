import VueDependenciesBadges from 'vue-dependencies-badges'
import Translation from './config/locales/index'
import './plugins/vue-icons-loader'

export default ({ Vue, isServer, options, router }) => {
  Vue.use(Translation)
  Vue.use(VueDependenciesBadges)

  if (!isServer) {
    import('vue-toasted' /* webpackChunkName: "notification" */).then(
      (module) => {
        Vue.use(module.default)
      }
    )
  }
}
