import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        missingwilds: resolve(__dirname, 'missingwilds/index.html'),
        badgecreator: resolve(__dirname, 'badgecreator/index.html'),
      },
    },
  },
})