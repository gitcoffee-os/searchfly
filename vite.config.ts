/**
 * Copyright (c) 2025-2099 GitCoffee All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      '~/*': resolve(__dirname, 'src/*'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        format: 'es', // 使用ES模块格式
        inlineDynamicImports: false,
        manualChunks: undefined
      }
    },
    assetsDir: 'assets',
    base: '/'
  },
  server: {
    port: 5173,
    open: false,
    proxy: {
      // 配置 code.exmay.com 搜索 API 的代理
      '/api/search': {
        target: 'https://code.exmay.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/search/, '/exmay/api/ugc/article/search'),
        secure: false
      }
    }
  }
})
