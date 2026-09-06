import { defineConfig } from 'vite';

export default defineConfig({
  base: '/webmcp-sqlite-studio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  server: {
    port: 3001,
  },
});
