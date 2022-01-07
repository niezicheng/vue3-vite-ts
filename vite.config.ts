import { UserConfigExport, ConfigEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue';
import { loadEnv } from 'vite';
import { resolve } from 'path';

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  return {
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
    ],

    resolve: {
      // 配置 src 目录映射
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },

    base: "./", // 打包路径

    server: {
      port: 3000,
      open: true,
      cors: true,
      // https: false,
      proxy: {
        // 依据环境获取 .env.development 或 .env.production 文件中的配置
        [env.VITE_GLOB_API_URL]: { // '/basic-api'
          target: env.VITE_PROXY, // 在 .env.development 中配置
          changeOrigin: true, // 修改源
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_GLOB_API_URL}`), ''),
        }
      },
    }
  }
}

