import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages lives at /lankayoga/; Vercel and local dev use the site root.
  base: process.env.GITHUB_ACTIONS ? '/lankayoga/' : '/',
})
