import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// const root = resolve(__dirname, 'src')
const root = __dirname
const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
      },
    },
  },
  publicDir: resolve(__dirname, 'public'),
  
  // server: {
  //   watch: {
  //     usePolling: true,
  //   },
  // },

  // base: '/Users/tristandumitru/Documents/Site/AdminBlocFront_1/bloc-front/src',
  // base: './',
})
