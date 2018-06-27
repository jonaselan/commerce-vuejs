import Vue from 'vue';
import Router from 'vue-router';
import Shop from '@/components/Shop';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Products from '@/components/Products';
import store from '../store/store';

Vue.use(Router);

const NotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const Authenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/shopping',
      name: 'Shop',
      component: Shop,
      beforeEnter: Authenticated,
    },
    {
      path: '/products',
      name: 'Product',
      component: Products,
      beforeEnter: Authenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: NotAuthenticated,
    },
  ],
  mode: 'history'
});
