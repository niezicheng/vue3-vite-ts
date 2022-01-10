import { createApp } from 'vue';
import { setupNaive } from '@/components/setupNative';
import App from './App.vue';
import router from './router';
import store, { key } from './store';

const app = createApp(App);

// 注册全局常用的 naive-ui 组件
setupNaive(app);

// 挂载路由
app.use(router);

// 挂载状态管理
app.use(store, key);

app.mount('#app');
