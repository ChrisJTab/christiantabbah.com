import { execSync } from 'node:child_process'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The footer shows which commit the site was built from (git-themed easter
// egg). Falls back to "dev" locally before the first commit exists.
function commitHash(): string {
  try {
    return execSync('git rev-parse --short HEAD', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim()
  } catch {
    return 'dev'
  }
}

// Three real HTML entry points (About is the home page). Each page ships its
// own <title>/OG tags and gets its own URL on GitHub Pages — no SPA 404 hacks.
export default defineConfig({
  plugins: [react()],
  base: '/',
  appType: 'mpa',
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash()),
  },
  build: {
    rollupOptions: {
      input: {
        about: resolve(import.meta.dirname, 'index.html'),
        timeline: resolve(import.meta.dirname, 'timeline/index.html'),
        bucketList: resolve(import.meta.dirname, 'bucket-list/index.html'),
      },
    },
  },
})
