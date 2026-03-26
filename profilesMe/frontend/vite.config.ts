import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import {backendUrl} from './src/backendUrl'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/auth': {
        target: backendUrl,
        changeOrigin: true
      }
    }
  },
  appType: 'spa'
})