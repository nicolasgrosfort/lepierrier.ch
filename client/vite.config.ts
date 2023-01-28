import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    preview: {
        port: 5123,
        open: true,
        host: true,
    },
    server: {
        port: 5122,
        open: true,
        host: true,
    },
})
