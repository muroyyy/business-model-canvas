import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/business-model-canvas/', // 👈 REQUIRED for GitHub Pages to load assets correctly
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
