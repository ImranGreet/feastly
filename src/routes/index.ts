import {
  createWebHistory,
  createRouter,
  type Router,
  type RouteRecordRaw,
} from 'vue-router';
import Authlayout from '../components/layouts/Authlayout.vue';
import Registration from '../pages/authentication/views/Registration.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Authlayout,
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
