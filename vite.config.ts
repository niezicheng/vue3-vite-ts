import { UserConfigExport, ConfigEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
export default ({ command }: ConfigEnv): UserConfigExport => {

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
        '/test': {
          target: "https://suggest.taobao.com", // 目标地址
          changeOrigin: true, // 修改源
          // secure: false, // ssl
          rewrite: path => path.replace(/^\/test/, ''),
        },
      }
    }
  }
}

