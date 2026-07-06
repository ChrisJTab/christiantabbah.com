/**
 * Generates public/og.png (1200×630) and public/apple-touch-icon.png.
 *
 * One-off, run locally (never in CI; the PNGs are committed):
 *   npm i --no-save satori @resvg/resvg-js
 *   node scripts/generate-og.mjs
 *
 * Colors mirror src/styles/tokens.css (night-moss).
 */
import { readFile, writeFile } from 'node:fs/promises'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const C = {
  bg: '#f2eee1',
  surface: '#faf7ec',
  border: '#c2b697',
  text: '#322d1e',
  muted: '#6e6753',
  primary: '#566f3d',
  accent: '#2a7049',
  work: '#a4552f',
  education: '#3e6a8e',
  research: '#6d5493',
  leadership: '#7f611c',
}

/** Fetch a TTF from Google Fonts (default UA gets truetype URLs). */
async function fetchTTF(cssUrl) {
  const css = await (await fetch(cssUrl)).text()
  const m = css.match(/src:\s*url\((https:[^)]+\.ttf)\)/)
  if (!m) throw new Error(`no ttf url in ${cssUrl}`)
  return Buffer.from(await (await fetch(m[1])).arrayBuffer())
}

const [youngSerif, atkinson, plexMono] = await Promise.all([
  fetchTTF('https://fonts.googleapis.com/css2?family=Young+Serif'),
  fetchTTF('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible'),
  fetchTTF('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono'),
])

// Git-graph motif as a plain SVG (no text → no font worries), inlined as an img.
const motif = `
<svg xmlns="http://www.w3.org/2000/svg" width="360" height="486" viewBox="0 0 240 324">
  <path d="M 40 300 L 40 30" stroke="${C.primary}" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M 40 246 C 40 226, 118 236, 118 216 L 118 138 C 118 118, 40 128, 40 108"
        stroke="${C.education}" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M 40 192 C 40 172, 188 182, 188 162 L 188 66"
        stroke="${C.research}" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M 40 276 C 40 260, 74 266, 74 250 L 74 226"
        stroke="${C.work}" stroke-width="4" stroke-linecap="round" fill="none"/>
  <circle cx="40" cy="246" r="6" fill="${C.primary}"/>
  <circle cx="40" cy="192" r="6" fill="${C.primary}"/>
  <circle cx="40" cy="108" r="6" fill="${C.primary}"/>
  <circle cx="74" cy="232" r="8" fill="${C.bg}" stroke="${C.work}" stroke-width="4"/>
  <circle cx="118" cy="177" r="9" fill="${C.bg}" stroke="${C.education}" stroke-width="4"/>
  <circle cx="40" cy="30" r="9" fill="${C.bg}" stroke="${C.primary}" stroke-width="5"/>
  <circle cx="188" cy="66" r="16" fill="none" stroke="${C.accent}" stroke-width="2" opacity="0.55"/>
  <circle cx="188" cy="66" r="9" fill="${C.bg}" stroke="${C.accent}" stroke-width="5"/>
</svg>`
const motifSrc = `data:image/svg+xml,${encodeURIComponent(motif)}`

const h = (type, style, ...children) => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
})

const pill = (text, color) =>
  h(
    'div',
    {
      display: 'flex',
      fontFamily: 'IBM Plex Mono',
      fontSize: 22,
      color,
      border: `2px solid ${color}66`,
      backgroundColor: `${color}1a`,
      borderRadius: 999,
      padding: '8px 22px',
    },
    text,
  )

const card = h(
  'div',
  {
    width: 1200,
    height: 630,
    display: 'flex',
    backgroundColor: C.bg,
    backgroundImage: `radial-gradient(circle at 12% -10%, ${C.primary}22, transparent 55%),
       radial-gradient(circle at 90% 115%, #e7dfc6dd, transparent 55%)`,
    padding: 64,
  },
  h(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexGrow: 1,
    },
    h(
      'div',
      {
        display: 'flex',
        fontFamily: 'IBM Plex Mono',
        fontSize: 24,
        color: C.muted,
        border: `2px solid ${C.border}`,
        borderTop: `4px solid ${C.primary}`,
        backgroundColor: C.surface,
        borderRadius: 10,
        padding: '10px 24px',
        alignSelf: 'flex-start',
      },
      '$ git log --graph christian',
    ),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', gap: 18 },
      h(
        'div',
        {
          fontFamily: 'Young Serif',
          fontSize: 92,
          color: C.text,
          lineHeight: 1.05,
        },
        'Christian Tabbah',
      ),
      h(
        'div',
        {
          fontFamily: 'Atkinson Hyperlegible',
          fontSize: 31,
          color: C.muted,
          lineHeight: 1.4,
          maxWidth: 660,
        },
        'MSc CS @ University of Toronto, building GPU-accelerated transactional databases.',
      ),
    ),
    h(
      'div',
      { display: 'flex', gap: 18 },
      pill('* main', C.primary),
      pill('HEAD → research/gpu-txn-db', C.accent),
    ),
  ),
  h('img', { width: 360, height: 486, alignSelf: 'center' }, undefined, {
    src: motifSrc,
  }),
)

// satori's h-shim above puts src in style for img; fix that node directly:
card.props.children[1] = {
  type: 'img',
  props: {
    src: motifSrc,
    width: 320,
    height: 432,
    style: { alignSelf: 'center', marginRight: 28 },
  },
}

const svg = await satori(card, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Young Serif', data: youngSerif, weight: 400, style: 'normal' },
    { name: 'Atkinson Hyperlegible', data: atkinson, weight: 400, style: 'normal' },
    { name: 'IBM Plex Mono', data: plexMono, weight: 400, style: 'normal' },
  ],
})

await writeFile(
  new URL('../public/og.png', import.meta.url),
  new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng(),
)
console.log('wrote public/og.png')

const favicon = await readFile(new URL('../public/favicon.svg', import.meta.url))
await writeFile(
  new URL('../public/apple-touch-icon.png', import.meta.url),
  new Resvg(favicon.toString(), {
    fitTo: { mode: 'width', value: 180 },
  })
    .render()
    .asPng(),
)
console.log('wrote public/apple-touch-icon.png')
