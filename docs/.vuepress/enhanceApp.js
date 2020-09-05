// import axios from 'axios'
import VueDependenciesBadges from 'vue-dependencies-badges'
import Translation from './config/locales/index'
import './plugins/vue-icons-loader'
import './plugins/global-components-loader'
import VuepressCodeInfo from 'vuepress-code-info'

export default ({ Vue, isServer, options, router }) => {
  // Vue.prototype.$axios = axios

  Vue.use(VueDependenciesBadges)
  Vue.use(Translation)
  Vue.use(VuepressCodeInfo)
  // if (!isServer) {
  //   import('vue-toasted' /* webpackChunkName: "notification" */).then(
  //     (module) => {
  //       Vue.use(module.default)
  //     }
  //   )
  // }
}
