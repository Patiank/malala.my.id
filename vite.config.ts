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
      modulePreload: {
        resolveDependencies(filename, deps, { hostId, hostType }) {
          return deps.filter(
            dep => !dep.includes('catalog-content') &&
                   !dep.includes('vendor-pdf') &&
                   !dep.includes('vendor-leaflet') &&
                   !dep.includes('vendor-ai') &&
                   !dep.includes('Drawers')
          );
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Keep commonjs helpers and preload helpers in the main bundle/framework
            if (id.includes('commonjsHelpers') || id.includes('vite/preload-helper') || id.includes('\0')) {
              return undefined;
            }
            if (id.includes('src/data/content.ts') || id.includes('src\\data\\content.ts')) {
              return 'catalog-content';
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
