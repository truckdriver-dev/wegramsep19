import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Simple Vite config without complex polyfills
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
});