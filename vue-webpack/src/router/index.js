import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Test from 'components/Test'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/h',
      name: 'Test',
      component: Test
    }
  ]
})
