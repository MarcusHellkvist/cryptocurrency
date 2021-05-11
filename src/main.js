import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap'
import 'bootstrap/scss/bootstrap.scss'

import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './main.scss'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('vue-typeahead-bootstrap', VueTypeaheadBootstrap)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
