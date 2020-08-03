// import axios from 'axios'
import VueDependenciesBadges from 'vue-dependencies-badges'
import Translation from './config/locales/index'
import './plugins/vue-icons-loader'
import './plugins/global-components-loader'
import VueCodeBlock from 'vue-code-block'

export default ({ Vue, isServer, options, router }) => {
  // Vue.prototype.$axios = axios

  Vue.use(VueDependenciesBadges)
  Vue.use(Translation)
  Vue.use(VueCodeBlock)
  // if (!isServer) {
  //   import('vue-toasted' /* webpackChunkName: "notification" */).then(
  //     (module) => {
  //       Vue.use(module.default)
  //     }
  //   )
  // }
}
