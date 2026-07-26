import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/static/react-pages/sites/telegram-bots/',
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '../../static/react-pages/sites/telegram-bots'),
    emptyOutDir: true
  }
});
