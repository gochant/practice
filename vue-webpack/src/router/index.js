import Vue from 'vue'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import 'element-ui/lib/theme-default/index.css'
import Router from 'vue-router'
import Hello from 'components/Hello'
const Test = resolve => require(['components/Test'], resolve)
const UserList = resolve => require(['components/page/UserList'], resolve)

Vue.use(Router)
Vue.use(Vuex)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/h',
      name: 'Hello',
      component: Hello
    }, {
      path: '/',
      name: 'Test',
      component: Test
    }, {
      path: '/user',
      name: 'User List',
      component: UserList
    }
  ]
})
