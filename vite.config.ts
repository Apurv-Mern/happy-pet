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
  build: {
    // Production optimizations
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'query-vendor': ['@tanstack/react-query'],
          // Component chunks
          'pages-public': [
            './src/pages/HomePage',
            './src/pages/LoginPage',
            './src/pages/SignUpPage',
            './src/pages/AboutUsPage',
          ],
          'pages-protected': [
            './src/pages/ProfilePage',
            './src/pages/KnowledgeHubPage',
            './src/pages/AiAgentPage',
          ],
          'pages-learning': [
            './src/pages/LearningModePage',
            './src/pages/LearningModuleCategoryPage',
            './src/pages/LearningModuleSubCategoryPage',
          ],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Source maps for production debugging (disable for smaller bundle)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'framer-motion',
      'lucide-react',
    ],
  },
  // Server configuration
  server: {
    port: 3000,
    open: true,
  },
  // Preview configuration
  preview: {
    port: 4173,
    open: true,
  },
})
