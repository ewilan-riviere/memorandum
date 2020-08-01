// import axios from 'axios'
import VueClipboard from 'vue-clipboard2'
import VueDependenciesBadges from 'vue-dependencies-badges'
import Translation from './config/locales/index'
import './plugins/vue-icons-loader'
import './plugins/global-components-loader'

export default ({ Vue, isServer, options, router }) => {
  // Vue.prototype.$axios = axios
  Vue.use(VueClipboard)
  Vue.use(VueDependenciesBadges)
  Vue.use(Translation)

  // if (!isServer) {
  //   import('vue-toasted' /* webpackChunkName: "notification" */).then(
  //     (module) => {
  //       Vue.use(module.default)
  //     }
  //   )
  // }
}
