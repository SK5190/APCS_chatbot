import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  // Production Web Service (Render root = Backend): bundle lives next to Node so it is always deployed.
  build: {
    outDir: '../Backend/public/app',
    emptyOutDir: true,
  },
})
