import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS === '1' ? '/feminine-word/' : '/',
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: './src' },
      { find: 'components', replacement: './src/components' },
      { find: 'utils', replacement: './src/utils' },
    ],
  },
})
