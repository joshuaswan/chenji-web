// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-default/index.css'
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui';

import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueCookies from 'vue-cookies'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueCookies)
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
