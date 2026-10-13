
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const isGithubPages =
  process.env.DEPLOY_TARGET === 'github-pages';

export default defineConfig({
  base: isGithubPages ? '/CivicSignal-Git/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
