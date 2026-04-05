import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';

let gitTag = '0.0.0';
try {
  gitTag = execSync('git describe --tags --abbrev=0').toString().trim();
} catch (_) {}

let gitCommit = 'unknown';
try {
  gitCommit = execSync('git rev-parse --short=7 HEAD').toString().trim();
} catch (_) {}

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(gitTag),
    __GIT_COMMIT__: JSON.stringify(gitCommit),
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/storybook': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});