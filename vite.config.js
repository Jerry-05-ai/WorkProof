import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      // Ensure firebase packages are pre‑bundled for Vite
      // (prevents the "Missing '.' specifier" error)
      // Vite will treat these as ESM-friendly modules
      // during development and production builds.

      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase', '@firebase/data-connect'],
        },
      },
    },
  },
  },
  optimizeDeps: {
    // Pre-bundle firebase and data-connect to avoid CommonJS resolution issues
    include: ['firebase', '@firebase/data-connect']
  },
  ssr: {
    // Ensure these packages are not externalized during SSR (needed for Vercel serverless)
    noExternal: ['firebase', '@firebase/data-connect']
  }
});
