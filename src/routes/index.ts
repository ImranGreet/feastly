import {
  createWebHistory,
  createRouter,
  type Router,
  type RouteRecordRaw,
} from "vue-router";
import Authlayout from "../components/layouts/Authlayout.vue";

const routes: RouteRecordRaw[] = [
    {
        path:'/',
        name:'home',
        component:Authlayout
    }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
