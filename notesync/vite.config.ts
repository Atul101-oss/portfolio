import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],

  base: '/static/notesync',

  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: path.resolve(__dirname, `../static/notesync`),
    emptyOutDir: true,
  },
})