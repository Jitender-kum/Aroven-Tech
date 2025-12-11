import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 🔥 LOCAL PROXY CONFIGURATION
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // 🔥 VERCEL BLANK SCREEN FIX
  base: '/', 
});