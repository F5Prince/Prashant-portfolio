import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Prashant-portfolio/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/*.mp4'],
    },
  },
});