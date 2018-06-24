import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/Shop'
import Home from '@/components/Home'
import Products from '@/components/Products'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/shopping',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/products',
      name: 'Product',
      component: Products
    },
  ],
  mode: 'history'
})
