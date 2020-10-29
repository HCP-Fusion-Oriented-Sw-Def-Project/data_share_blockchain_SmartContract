import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import './directive/el-drag-dialog/directives'

// 引入jquery
// window.jquery = window.$ = jquery
// Vue.prototype.$ = jquery

import * as filters from './filters' // global filters
// cluster component
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faRedo,
  faCog
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
library.add(faRedo)
library.add(faCog)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// import $ from 'jquery'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const {
    mockXHR
  } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// import * as svgicon from 'vue-svgicon'

// Vue.use(svgicon, {
//   tagName: 'svgicon'
// })
// 阿里图标
import './assets/iconfont/iconfontv.css'

import './assets/iconfont/iconfont.css'
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
