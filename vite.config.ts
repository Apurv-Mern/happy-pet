import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000, // dev server on http://localhost:3000
    proxy: {
      // your proxies
    },
  },
  // For production preview (npm run preview)
  preview: {
    port: 4173,
  },
})
