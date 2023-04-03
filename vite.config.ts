
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import dst from './src/build/dts'
import dts from 'vite-plugin-dts'

const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 4000
  },
  plugins: [ vue(), dts() ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve('./src') },
      { find: '@api', replacement: resolve('./src/api') },
      { find: '@comps', replacement: resolve('./src/components') },
      { find: '@type', replacement: resolve('./src/types/productLibrary') },
      { find: '@utils', replacement: resolve('./src/utils') }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/mixins.scss";'
      }
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/packages/index.ts'),
      name: 'MarsEcharts',
      fileName: (format) => `mars-echarts.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [ 'vue' ],
      output: {
        globals: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          vue: 'Vue'
        }
      }
    }
  }
})
