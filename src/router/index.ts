import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
// import Home from '@/pages/home/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Project',
    component: () => import('@/pages/calendar-page/index.vue')
  },
  {
    path: '/pd',
    name: 'Pd',
    component: () => import('@/pages/pd/index.vue')
  },
  {
    path: '/pd-project',
    name: 'PdProject',
    component: () => import('@/pages/pd-project/index.vue')
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('@/pages/demo/index.vue')
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
