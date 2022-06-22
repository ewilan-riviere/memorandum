import { defineConfig } from 'vite'
import { baseConfig, bladePlugin, markdownPlugin } from '../../vite.config'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  ...baseConfig(path.basename(__dirname)),
  resolve: {
    alias: {
      '~/views': `${__dirname}`,
    },
  },
  plugins: [bladePlugin(), markdownPlugin()],
  optimizeDeps: {
    include: ['alpinejs', 'quill'],
  },
})
