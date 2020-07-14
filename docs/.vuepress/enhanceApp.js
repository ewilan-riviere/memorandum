import axios from 'axios'
import VueClipboard from 'vue-clipboard2'
import VueDependenciesBadges from 'vue-dependencies-badges'
import Translation from './config/locales/index'
import './plugins/vue-icons-loader'

export default ({ Vue, isServer, options, router }) => {
  Vue.prototype.$axios = axios

  Vue.use(VueClipboard)
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
