import {
  createWebHistory,
  createRouter,
  type Router,
  type RouteRecordRaw,
} from 'vue-router';

import Registration from '../pages/authentication/views/Registration.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/layouts/Authlayout.vue'),
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../pages/Order/Order.vue'),
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
