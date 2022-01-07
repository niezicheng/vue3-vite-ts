import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/home/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:pathMath(.*)*',
    component: () => import('@/pages/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由拦截器, 自定义拦截内容
router.beforeEach((to, from, next) => {
  next();
});

export default router;
