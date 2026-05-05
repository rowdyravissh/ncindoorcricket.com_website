import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For GitHub Pages with a custom domain (ncindoorcricket.com), use base: '/'
// For GitHub Pages without a custom domain, change to: base: '/REPO_NAME/'
export default defineConfig({
  plugins: [react()],
  base: '/ncindoorcricket.com_website/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
