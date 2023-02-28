
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import dst from './src/build/dts'

const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ vue(), dst() ],
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
    }
  }
})
