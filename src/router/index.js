import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/Shop'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products',
      name: 'Shop',
      component: Shop
    }
  ],
  mode: 'history'
})
