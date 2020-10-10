import Vue from 'vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

const config = {
  options: {
    wheelSpeed: 2,
    useBothWheelAxes: true,
  },
}
Vue.use(PerfectScrollbar, config)
