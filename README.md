# christiantabbah.com

Personal site for Christian Tabbah: a warm-dark, git-themed static site.
Vite + React + TypeScript, custom SVG git-graph timeline, deployed to
GitHub Pages at [christiantabbah.com](https://christiantabbah.com).

## Pages

| URL | What it is |
| --- | --- |
| `/` | Home: the recruiter-facing landing. Hero, `$ git status`, the featured research block, selected work, a short `git log`, skills, contact. |
| `/research/` | The MSc research paper (EGAD) as a README: problem, what was built, results, hard parts, limits, status. Serves `public/EGAD-paper.pdf`. |
| `/projects/` | Project cards that open into README panels. |
| `/timeline/` | The git-graph timeline. |
| `/about/` | Intro, milestones, hobbies, and the bucket list (`/about/#todo`). `/bucket-list/` redirects here. |

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
| Home hero, `git status` block, selected work, skills, contact | `src/data/home.ts` |
| Research page and the home page's research block | `src/data/research.ts` |
| Timeline entries (jobs, degrees, research, clubs) | `src/data/timeline.ts` |
| Projects list | `src/data/projects.ts` |
| Bucket list items | `src/data/bucketList.ts` |
| About intro, milestones, hobbies + captions | `src/data/about.ts` |
| Links (GitHub/LinkedIn/Instagram), email, CV path | `src/data/profile.ts` |
| Theme (all colors, fonts, spacing) | `src/styles/tokens.css` |

Hobby photos go in `public/images/hobbies/` (see the README there for
exact filenames). Project screenshots and paper figures go in
`public/images/projects/`.

Adding a timeline entry: append an object to `src/data/timeline.ts`, and the
graph lays itself out (lanes, curves, label rows) from the dates. When a new
month starts, bump `TIMELINE_NOW` in the same file so open branches extend.

The research numbers in `src/data/research.ts` come from the paper's plot
index (`EGAD_Code/EGAD_plotting/PLOTS.md`); keep them in sync with the
paper when it changes.

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
