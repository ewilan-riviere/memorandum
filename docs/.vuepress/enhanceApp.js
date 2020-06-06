// async function is also supported, too
import './styles/index.scss'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

import './plugins/vue-icons-loader'

Vue.use(VueClipboard)

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  isServer, // is this enhancement applied in server-rendering or client
}) => {
  VueClipboard.config.autoSetContainer = true // add this line
  Vue.use(VueClipboard)
}
