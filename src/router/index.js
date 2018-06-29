import Vue from 'vue';
import Router from 'vue-router';
import Shop from '@/components/Shop';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Products from '@/components/Products';
import store from '../store/store';

Vue.use(Router);

// não acessa até se autenticar
const NotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};
// só acessa quem estiver autenticado
const Authenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

// usar beforeEnter para proteger as rotas
export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: Authenticated,
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
