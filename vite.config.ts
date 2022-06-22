import { PluginOption, UserConfigExport } from 'vite'
import Dotenv from 'dotenv'

Dotenv.config()

// https://vitejs.dev/config/
export const baseConfig = (entry: string): UserConfigExport => {
  return {
    server: {
      hmr: {
        host: process.env.VITE_DEV_SERVER_HOST,
      },
    },
    base: '',
    root: `resources/${entry}`,
    publicDir: `${entry}/static`,
    build: {
      outDir: `../../public/assets/dist/${entry}`,
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        input: '/app.ts',
      },
    },
    cacheDir: `../../node_modules/.vite/${entry}`,
  }
}

/**
 * Enable full reload for blade file
 */
export const bladePlugin = (): PluginOption => ({
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

export const markdownPlugin = (): PluginOption => ({
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
