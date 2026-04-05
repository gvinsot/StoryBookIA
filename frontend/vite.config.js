import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';

function getGitTag() {
  try {
    return execSync('git describe --tags --abbrev=0').toString().trim();
  } catch (_) {
    return process.env.APP_VERSION || 'dev';
  }
}

function getGitCommit() {
  try {
    return execSync('git rev-parse --short=7 HEAD').toString().trim();
  } catch (_) {
    return process.env.GIT_COMMIT || 'unknown';
  }
}

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(getGitTag()),
    __GIT_COMMIT__: JSON.stringify(getGitCommit()),
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
