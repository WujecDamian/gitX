import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   root: "./",
  build: {
    // Outputs the compiled frontend to a clean dist directory at the root
    outDir: resolve(__dirname, 'dist/frontend'), 
    emptyOutDir: true,
  }
})
