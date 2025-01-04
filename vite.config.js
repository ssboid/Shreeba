import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.jpg'],
  assetsInclude: ['**/*.JPG'],
  server: {
    host: true,  // Expose to network
  },
})
