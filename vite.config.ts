import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    open: true,
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress "use client" directive warnings
        if (
          warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
          (warning.message.includes('"use client"') ||
            warning.message.includes('"use server"'))
        ) {
          return
        }
        warn(warning)
      }
    }
  }
})
