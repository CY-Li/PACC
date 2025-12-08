import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Hall from '../views/Hall.vue';
import Account from '../views/Account.vue';
import Wallet from '../views/Wallet.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/hall',
    name: 'Hall',
    component: Hall,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: Wallet,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
