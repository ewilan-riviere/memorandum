// import axios from 'axios'
import Translation from './config/locales/index'
import './plugins/vue-icons-loader'
import './plugins/global-components-loader'
import VueBadges from 'vue-badges'
import VueCodeInfo from 'vue-code-info'

export default ({ Vue, isServer, options, router }) => {
  // Vue.prototype.$axios = axios
  Vue.use(Translation)
  Vue.use(VueBadges)
  Vue.use(VueCodeInfo)
  // if (!isServer) {
  //   import('vue-toasted' /* webpackChunkName: "notification" */).then(
  //     (module) => {
  //       Vue.use(module.default)
  //     }
  //   )
  // }
}
