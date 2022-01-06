import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

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
    proxy: {
      '/api': {
        target: "http://localhost:8080/api/", // 目标地址
        changeOrigin: true, // 修改源
        secure: false, // ssl
        rewrite: path => path.replace('/api', '/')
      }
    }
  }

})
