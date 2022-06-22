import { PluginOption } from 'vite'
import { defineConfig } from 'vite'
import Dotenv from 'dotenv'

Dotenv.config()

/**
 * Enable full reload for blade file
 */
const bladePlugin = (): PluginOption => ({
  name: 'vite:laravel',
  handleHotUpdate({ file, server }) {
    if (file.endsWith('.blade.php')) {
      server.ws.send({
        type: 'full-reload',
        path: '*',
      })
    }
  },
})

const markdownPlugin = (): PluginOption => ({
  name: 'vite:markdown',
  handleHotUpdate({ file, server }) {
    if (file.endsWith('.md')) {
      server.ws.send({
        type: 'full-reload',
        path: '*',
      })
    }
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      host: process.env.VITE_DEV_SERVER_HOST,
    },
  },
  base: '',
  root: 'resources',
  publicDir: 'static',
  build: {
    outDir: '../public/assets/dist/views',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: '/app.ts',
    },
  },
  cacheDir: '../node_modules/.vite/views',
  // views config
  resolve: {
    alias: {
      '~/app': './',
    },
  },
  plugins: [bladePlugin(), markdownPlugin()],
  optimizeDeps: {
    include: ['alpinejs'],
  },
})
