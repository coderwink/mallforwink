import Vue from 'vue'
import App from './App.vue'
import store from './store'
import FastClick from 'fastclick'
//记住了导入路由的时候必须小写
import router from './router'
import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'
Vue.use(toast)
Vue.use(VueLazyLoad, {
  loading: require('./assets/images/common/placeholder.png')
})
Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.prototype.$bus = new Vue()  
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

