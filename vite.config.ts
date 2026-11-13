import { execSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
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

const root = import.meta.dirname

// Every release-notes/<slug>/index.html is an entry of its own, so a new
// release needs no config change: add it to src/data/releases.ts and copy
// an existing release folder.
function releaseInputs(): Record<string, string> {
  const dir = resolve(root, 'release-notes')
  return Object.fromEntries(
    readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => [`release-${d.name}`, resolve(dir, d.name, 'index.html')]),
  )
}

// Real HTML entry points. Each page ships its own <title>/OG tags and gets
// its own URL on GitHub Pages: no SPA 404 hacks.
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
        home: resolve(root, 'index.html'),
        research: resolve(root, 'research/index.html'),
        projects: resolve(root, 'projects/index.html'),
        releases: resolve(root, 'release-notes/index.html'),
        timeline: resolve(root, 'timeline/index.html'),
        about: resolve(root, 'about/index.html'),
        ...releaseInputs(),
      },
    },
  },
})
