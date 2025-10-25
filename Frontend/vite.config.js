// vite.config.js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: "/petopia/",
  build: {
    outDir: 'dist/petopia',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3456',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [
    react(),
    svgr(), // Enable SVG as React components
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
})
