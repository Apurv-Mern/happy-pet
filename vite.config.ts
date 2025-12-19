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
    // Optional: Add basic auth middleware for dev server
    proxy: {
      // This won't add password protection but can be extended with middleware
    },
  },
  // For production preview (npm run preview)
  preview: {
    port: 4173,
  },
})
