// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueResourceInterceptor from 'vue-resource-mock'
import Routes from './mock/routes'

Vue.use(VueResource);

Vue.http.options.root = '/api';
Vue.http.interceptors.push(VueResourceInterceptor(Routes));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
