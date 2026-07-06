# christiantabbah.com

Personal site for Christian Tabbah: a warm-dark, git-themed static site.
Vite + React + TypeScript, custom SVG git-graph timeline, deployed to
GitHub Pages at [christiantabbah.com](https://christiantabbah.com).

## Commands

```sh
npm install
npm run dev       # local dev server
npm run build     # typecheck + production build into dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

## Editing content (no component code required)

| What | Where |
| --- | --- |
| Timeline entries (jobs, degrees, research, clubs) | `src/data/timeline.ts` |
| Projects list | `src/data/projects.ts` |
| Bucket list items | `src/data/bucketList.ts` |
| Hero copy, milestones, hobbies + captions | `src/data/about.ts` |
| Links (GitHub/LinkedIn/Instagram), email, CV path | `src/data/profile.ts` |
| Theme (all colors, fonts, spacing) | `src/styles/tokens.css` |

Open `TODO`s are marked `TODO(christian):` in those files: LinkedIn and
Instagram URLs, project repo links, and 5–8 more bucket-list items.
Hobby photos go in `public/images/hobbies/` (see the README there for
exact filenames).

Adding a timeline entry: append an object to `src/data/timeline.ts`, and the
graph lays itself out (lanes, curves, label rows) from the dates. When a new
month starts, bump `TIMELINE_NOW` in the same file so open branches extend.

## Deployment

Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.
One-time setup on a new repo:

1. Push this repository to GitHub.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Custom domain `christiantabbah.com` (the `public/CNAME` file keeps it
   pinned); DNS needs the usual four GitHub Pages A records + `www` CNAME.
4. Confirm `repoUrl` in `src/data/profile.ts` so the footer's
   "built from `<hash>`" easter egg links to the right commit.

## OG image

`public/og.png` is generated (not hand-made). To regenerate after a redesign:

```sh
npm i --no-save satori @resvg/resvg-js
node scripts/generate-og.mjs
```
