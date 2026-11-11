import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { inquiryPlugin } from './server/inquiryPlugin'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), inquiryPlugin(env)],
    // GitHub Pages lives at /lankayoga/; Vercel and local dev use the site root.
    base: process.env.GITHUB_ACTIONS ? '/lankayoga/' : '/',
  }
})
