import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/petopia/",
  server:{
    proxy:{
      '/api': {
        target: 'http://localhost:3456',
        changeOrigin: true,
        secure: true,
      },
  }
},
  plugins: [react()],
})
