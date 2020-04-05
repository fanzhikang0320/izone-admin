import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import Element from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css' 
Vue.use(Element)

import axios from 'axios';
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'http://127.0.0.1:8082'
Vue.use(VueAxios,axios)
Vue.config.productionTip = false

var cookieUtils = require('./utils/cookie.js');
router.beforeEach((to,from,next) => {
  var account = cookieUtils.getCookie('account');
  var sessionAccount = sessionStorage.getItem('account');
  // 判断当前缓存账号,或者已经登录过
  if (!account && !sessionAccount) {
    if (to.name == 'login') {
      next();
      return ;
    } else {
      next({name: 'login'});
      return ;
    }
  } else {
    if (account) {
      sessionStorage.setItem('account',account)
    }
    next();
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
