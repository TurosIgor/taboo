import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from 'dotenv'

env.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': process.env.API_URL
    }
  },
  plugins: [react()],
})
