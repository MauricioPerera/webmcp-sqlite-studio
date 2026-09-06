import { defineConfig } from 'vite';

export default defineConfig({
  base: '/webmcp-sqlite-studio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html',
        studio: './studio.html',
      },
    },
  },
  server: {
    port: 3001,
  },
});
