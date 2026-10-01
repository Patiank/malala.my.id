import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('src/data/content.ts') || id.includes('src\\data\\content.ts')) {
              return 'catalog-content';
            }
            if (id.includes('node_modules/leaflet') || id.includes('node_modules\\leaflet')) {
              return 'vendor-leaflet';
            }
            if (id.includes('node_modules/jspdf') || id.includes('node_modules\\jspdf') || id.includes('node_modules/html2pdf.js') || id.includes('node_modules\\html2pdf.js')) {
              return 'vendor-pdf';
            }
            if (id.includes('node_modules/firebase') || id.includes('node_modules\\firebase')) {
              return 'vendor-firebase';
            }
          },
        },
      },
      chunkSizeWarningLimit: 30000,
    },
  };
});
