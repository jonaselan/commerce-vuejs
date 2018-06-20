import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/components/Products'
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
      name: 'Products',
      component: Products
    }
  ],
  mode: 'history'
})
