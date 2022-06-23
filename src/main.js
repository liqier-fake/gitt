import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import utils from "./utils/index";

import Vant from 'vant';
import 'vant/lib/index.css';
import longpress from  '@/directive/longpress';
import "./api/index.js";

import { Lazyload } from 'vant';
Vue.use(longpress)
Vue.use(Vant);

Vue.use(Lazyload, {
  lazyComponent:true,
});

Vue.config.productionTip = false
Vue.prototype.$axios=axios;
Vue.prototype.$utils=utils;
 
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
