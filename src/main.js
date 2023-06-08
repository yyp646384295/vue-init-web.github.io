import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './router/routerGuard';

import '@/assets/svgIcon/index.js';
import '@/assets/css/_variable.scss'
import '@/assets/css/reset.scss'
import "./utils/flexible"


import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle);

if (process.env.NODE_ENV == "production") {
  console.log = function() {};
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
