import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, relative, dirname } from 'path';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

import tailwind from '@tailwindcss/vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Find all index.html files in the sites directory
const inputEntries = globSync('sites/*/index.html').reduce((entries, path) => {
  // Get the site name from the path (e.g., 'landing-page' from 'sites/landing-page/index.html')
  const siteName = path.split('/')[1];
  entries[siteName] = resolve(__dirname, path);
  return entries;
}, {});

export default defineConfig({
  base: '/static/react-pages/',
  plugins: [react(), tailwind()],
  root: '.', // Set root to the project root
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Fallback index if needed
        ...inputEntries
      }
    },
    outDir: resolve(__dirname, '../static/react-pages'),
    emptyOutDir: true
  },
  server: {
    open: true
  }
});
