import type { ReactNode } from 'react'
import type { SchematicId } from '../../data/projects'

/**
 * System schematics, one per systems project, drawn like the figures in a
 * paper: filled boxes in the branch palette, ink arrows, a tinted band for
 * the layer in between. Styled in covers.css; each card sets --topic-color.
 * Decorative: the visible caption next to each one carries the meaning.
 *
 * Color legend, the same on every schematic: blue (sch-host) is the host or
 * compute side, plum (sch-device) is the device or storage side, ochre
 * (sch-layer, sch-band, sch-divider) is the layer between them, sienna
 * (sch-fail) is a failure or retry, the accent is a return path, and ink
 * carries data forward.
 *
 * Geometry conventions: boxes on a 320x180 canvas, arrow tips land 2px off
 * the edge they point at, dashed strokes mean "optional path / background
 * work / a timer", solid strokes carry data.
 */

/** Filled triangle arrowhead whose tip sits exactly at (x, y), pointing
    along +x (rotate for other directions). Filled shape, so dashes and
    joins can never mangle it; its fill color comes from the parent line
    group's class (see projects.css). */
function Head({ x, y, angle = 0 }: { x: number; y: number; angle?: number }) {
  return (
    <polygon
      className="sch-head"
      transform={`rotate(${angle} ${x} ${y})`}
      points={`${x},${y} ${x - 9},${y - 4.5} ${x - 9},${y + 4.5}`}
    />
  )
}

/* Ring nodes at symmetric angles (-25deg, 0, +25deg) on r=36 around
   (118, 90); the shard curves start exactly on the nodes. */
const RING_NODES: [number, number][] = [
  [150.6, 74.8],
  [154, 90],
  [150.6, 105.2],
]

const SCHEMATICS: Record<SchematicId, ReactNode> = {
  shortener: (
    <>
      <circle className="sch-dot" cx="28" cy="90" r="5" />
      <text className="sch-label" x="28" y="112" textAnchor="middle">
        key
      </text>
      <g className="sch-main">
        <line x1="36" y1="90" x2="77" y2="90" />
        <Head x={80} y={90} />
      </g>
      <circle className="sch-box sch-layer" cx="118" cy="90" r="36" />
      <text className="sch-label" x="118" y="87" textAnchor="middle">
        hash
      </text>
      <text className="sch-label" x="118" y="100" textAnchor="middle">
        ring
      </text>
      <g className="sch-curve">
        <path d="M150.6 74.8 C 185 62, 212 50, 238 42" />
        <line x1="154" y1="90" x2="238" y2="90" />
        <path d="M150.6 105.2 C 185 118, 212 130, 238 138" />
      </g>
      {RING_NODES.map(([x, y]) => (
        <circle key={x + '-' + y} className="sch-node" cx={x} cy={y} r="4" />
      ))}
      {[40, 90, 140].map((y, i) => (
        <g key={y}>
          <path
            className="sch-cyl"
            d={'M240 ' + (y - 8) + ' v18 a28 7 0 0 0 56 0 v-18'}
          />
          <ellipse className="sch-cyl" cx="268" cy={y - 8} rx="28" ry="7" />
          <text className="sch-label" x="268" y={y + 12} textAnchor="middle">
            shard {i + 1}
          </text>
        </g>
      ))}
    </>
  ),

  /* Painters fan in to the gateway box (endpoints spread around its
     vertical center), one solid arrow into the Redis bitfield canvas. */
  rplace: (
    <>
      {(
        [
          [48, 72],
          [76, 81],
          [104, 90],
          [132, 99],
        ] as const
      ).map(([y, endY]) => (
        <g key={y}>
          <circle className="sch-dot" cx="26" cy={y} r="4" />
          <line className="sch-curve" x1="32" y1={y} x2="84" y2={endY} />
        </g>
      ))}
      <text className="sch-label" x="26" y="156" textAnchor="middle">
        painters
      </text>
      <rect className="sch-box sch-layer" x="86" y="54" width="74" height="64" rx="8" />
      <text className="sch-label" x="123" y="76" textAnchor="middle">
        api gw
      </text>
      <text className="sch-label" x="123" y="92" textAnchor="middle">
        λ ws
      </text>
      <text className="sch-label" x="123" y="108" textAnchor="middle">
        λ http
      </text>
      <g className="sch-main">
        <line x1="160" y1="86" x2="195" y2="86" />
        <Head x={198} y={86} />
      </g>
      <rect className="sch-line" x="200" y="40" width="96" height="84" fill="none" />
      {[212, 224, 236, 248, 260, 272, 284].map((x) => (
        <line key={x} className="sch-grid" x1={x} y1="40" x2={x} y2="124" />
      ))}
      {[52, 64, 76, 88, 100, 112].map((y) => (
        <line key={y} className="sch-grid" x1="200" y1={y} x2="296" y2={y} />
      ))}
      {(
        [
          [2, 1, 'work'],
          [3, 1, 'education'],
          [2, 2, 'research'],
          [5, 4, 'leadership'],
          [6, 3, 'work'],
          [1, 5, 'education'],
        ] as const
      ).map(([c, r, tone]) => (
        <rect
          key={`${c}-${r}`}
          className={`sch-pixel sch-pixel-${tone}`}
          x={200 + c * 12 + 1.5}
          y={40 + r * 12 + 1.5}
          width="9"
          height="9"
        />
      ))}
      <text className="sch-label" x="248" y="142" textAnchor="middle">
        redis bitfield
      </text>
    </>
  ),

  /* Two paths from GPU A to GPU B: direct RDMA (ink), or the dashed detour
     through the host node that pre-reduces on the way. Heads on both hops. */
  olap: (
    <>
      <rect className="sch-box sch-device" x="22" y="64" width="72" height="52" rx="8" />
      <text className="sch-label" x="58" y="93" textAnchor="middle">
        gpu a
      </text>
      <rect className="sch-box sch-device" x="226" y="64" width="72" height="52" rx="8" />
      <text className="sch-label" x="262" y="87" textAnchor="middle">
        gpu b
      </text>
      <text className="sch-label" x="262" y="103" textAnchor="middle">
        cub sort
      </text>
      <g className="sch-main">
        <line x1="94" y1="104" x2="221" y2="104" />
        <Head x={224} y={104} />
      </g>
      <text className="sch-note" x="158" y="122" textAnchor="middle">
        rdma · ucx
      </text>
      <rect
        className="sch-box sch-host sch-dashed-box"
        x="120"
        y="26"
        width="80"
        height="36"
        rx="8"
      />
      <text className="sch-label" x="160" y="42" textAnchor="middle">
        host
      </text>
      <text className="sch-label" x="160" y="55" textAnchor="middle">
        pre-reduce
      </text>
      {/* The detour rises from gpu a into the host box from the left, and
         leaves it from the right down into gpu b; both tips stop 2px short
         of the outline they point at. */}
      <g className="sch-host-dashed">
        <path d="M80 62 C 80 44, 96 44, 115 44" />
        <Head x={118} y={44} />
        <path d="M202 44 C 221 44, 240 44, 240 59" />
        <Head x={240} y={62} angle={90} />
      </g>
    </>
  ),

  disagg: (
    <>
      <rect className="sch-box sch-host" x="24" y="52" width="104" height="76" rx="8" />
      <text className="sch-label" x="76" y="86" textAnchor="middle">
        compute
      </text>
      <text className="sch-label" x="76" y="102" textAnchor="middle">
        rocksdb
      </text>
      <rect className="sch-box sch-device" x="192" y="52" width="104" height="76" rx="8" />
      <text className="sch-label" x="244" y="86" textAnchor="middle">
        storage
      </text>
      <text className="sch-label" x="244" y="102" textAnchor="middle">
        hailstorm
      </text>
      <line className="sch-divider" x1="160" y1="36" x2="160" y2="144" />
      <text className="sch-note" x="160" y="28" textAnchor="middle">
        network
      </text>
      {/* labels sit beside the dashed divider, never on it */}
      <g className="sch-main">
        <line x1="128" y1="76" x2="187" y2="76" />
        <Head x={190} y={76} />
      </g>
      <text className="sch-label" x="150" y="68" textAnchor="end">
        put
      </text>
      <g className="sch-accent">
        <line x1="192" y1="108" x2="133" y2="108" />
        <Head x={130} y={108} angle={180} />
      </g>
      <text className="sch-label sch-accent-label" x="170" y="124">
        get
      </text>
    </>
  ),

  /* Stop-and-wait told honestly: #1 is acked, #2 dies on the wire, the
     sender's (dashed) timer fires, the retransmit goes through, ack 2
     comes back. Sienna marks everything the loss causes. */
  udp: (
    <>
      <text className="sch-label" x="80" y="28" textAnchor="middle">
        sender
      </text>
      <text className="sch-label" x="240" y="28" textAnchor="middle">
        receiver
      </text>
      <line className="sch-lifeline" x1="80" y1="36" x2="80" y2="164" />
      <line className="sch-lifeline" x1="240" y1="36" x2="240" y2="164" />
      <circle className="sch-dot" cx="80" cy="36" r="4" />
      <circle className="sch-dot" cx="240" cy="36" r="4" />
      <g className="sch-main">
        <line x1="80" y1="50" x2="234" y2="50" />
        <Head x={237} y={50} />
      </g>
      <text className="sch-label" x="92" y="44">
        #1
      </text>
      <g className="sch-accent">
        <line x1="240" y1="68" x2="88" y2="68" />
        <Head x={85} y={68} angle={180} />
      </g>
      <text className="sch-label sch-accent-label" x="100" y="62">
        ack 1
      </text>
      <line className="sch-main" x1="80" y1="92" x2="166" y2="92" />
      <g className="sch-x">
        <line x1="168" y1="86" x2="180" y2="98" />
        <line x1="168" y1="98" x2="180" y2="86" />
      </g>
      <text className="sch-label" x="92" y="86">
        #2
      </text>
      <text className="sch-label sch-fail-label" x="188" y="90">
        dropped
      </text>
      <path className="sch-fail-dashed" d="M80 98 C 58 104, 58 118, 80 124" />
      <text className="sch-label sch-fail-label" x="44" y="114" textAnchor="middle">
        timeout
      </text>
      <g className="sch-fail">
        <line x1="80" y1="130" x2="234" y2="130" />
        <Head x={237} y={130} />
      </g>
      <text className="sch-label sch-fail-label" x="92" y="124">
        #2 again
      </text>
      <g className="sch-accent">
        <line x1="240" y1="152" x2="88" y2="152" />
        <Head x={85} y={152} angle={180} />
      </g>
      <text className="sch-label sch-accent-label" x="100" y="146">
        ack 2
      </text>
    </>
  ),

  /* EGAD, laid out the way the paper's Figure 1 is: the CPU primary store
     on top, the GPU execution cache at the bottom, and the stager as a band
     straddling the CPU/GPU line. Admit goes down before a batch, writeback
     comes back up after it. */
  egad: (
    <>
      <rect className="sch-box sch-host" x="40" y="8" width="240" height="36" rx="7" />
      <text className="sch-label" x="160" y="30" textAnchor="middle">
        primary store · cpu memory
      </text>
      <rect className="sch-band" x="40" y="58" width="240" height="56" rx="7" />
      <text className="sch-label" x="268" y="76" textAnchor="end">
        stager
      </text>
      <line className="sch-divider" x1="16" y1="86" x2="304" y2="86" />
      <text className="sch-tiny" x="34" y="82" textAnchor="end">
        cpu
      </text>
      <text className="sch-tiny" x="34" y="97" textAnchor="end">
        gpu
      </text>
      <g className="sch-main">
        <line x1="110" y1="46" x2="110" y2="123" />
        <Head x={110} y={126} angle={90} />
      </g>
      <text className="sch-label" x="102" y="74" textAnchor="end">
        admit
      </text>
      <g className="sch-accent">
        <line x1="210" y1="126" x2="210" y2="49" />
        <Head x={210} y={46} angle={-90} />
      </g>
      <text className="sch-label sch-accent-label" x="218" y="108">
        writeback
      </text>
      <rect className="sch-box sch-device" x="40" y="128" width="240" height="36" rx="7" />
      <text className="sch-label" x="160" y="150" textAnchor="middle">
        execution cache · gpu memory
      </text>
    </>
  ),
}

/* Tall versions on a 200x180 canvas, for the square covers in the home
   page's selected work: the same parts, stacked top to bottom so they
   fill a square instead of shrinking into it. Ids without one fall back
   to the wide drawing. */

/* Ring nodes at 125, 90, and 55 degrees on r=30 around (100, 70): the
   bottom of the ring, where the curves leave for the shards below. */
const TALL_RING_NODES: [number, number][] = [
  [82.8, 94.6],
  [100, 100],
  [117.2, 94.6],
]

const TALL: Partial<Record<SchematicId, ReactNode>> = {
  shortener: (
    <>
      <circle className="sch-dot" cx="100" cy="14" r="5" />
      <text className="sch-label" x="112" y="18">
        key
      </text>
      <g className="sch-main">
        <line x1="100" y1="21" x2="100" y2="35" />
        <Head x={100} y={38} angle={90} />
      </g>
      <circle className="sch-box sch-layer" cx="100" cy="70" r="30" />
      <text className="sch-label" x="100" y="67" textAnchor="middle">
        hash
      </text>
      <text className="sch-label" x="100" y="80" textAnchor="middle">
        ring
      </text>
      <g className="sch-curve">
        <path d="M82.8 94.6 C 66 110, 40 108, 38 124" />
        <line x1="100" y1="100" x2="100" y2="124" />
        <path d="M117.2 94.6 C 134 110, 160 108, 162 124" />
      </g>
      {TALL_RING_NODES.map(([x, y]) => (
        <circle key={x + '-' + y} className="sch-node" cx={x} cy={y} r="4" />
      ))}
      {[38, 100, 162].map((x, i) => (
        <g key={x}>
          <path
            className="sch-cyl"
            d={'M' + (x - 24) + ' 132 v16 a24 6 0 0 0 48 0 v-16'}
          />
          <ellipse className="sch-cyl" cx={x} cy="132" rx="24" ry="6" />
          <text className="sch-label" x={x} y="170" textAnchor="middle">
            shard {i + 1}
          </text>
        </g>
      ))}
    </>
  ),

  /* GPU A above GPU B, the direct RDMA hop between them, and the dashed
     detour out to the host on the right and back. */
  olap: (
    <>
      <rect className="sch-box sch-device" x="16" y="14" width="76" height="40" rx="8" />
      <text className="sch-label" x="54" y="38" textAnchor="middle">
        gpu a
      </text>
      <rect className="sch-box sch-device" x="16" y="124" width="76" height="44" rx="8" />
      <text className="sch-label" x="54" y="142" textAnchor="middle">
        gpu b
      </text>
      <text className="sch-label" x="54" y="157" textAnchor="middle">
        cub sort
      </text>
      <g className="sch-main">
        <line x1="54" y1="54" x2="54" y2="119" />
        <Head x={54} y={122} angle={90} />
      </g>
      <text className="sch-note" x="62" y="86">
        rdma
      </text>
      <text className="sch-note" x="62" y="99">
        ucx
      </text>
      <rect
        className="sch-box sch-host sch-dashed-box"
        x="110"
        y="70"
        width="78"
        height="40"
        rx="8"
      />
      <text className="sch-label" x="149" y="86" textAnchor="middle">
        host
      </text>
      <text className="sch-label" x="149" y="100" textAnchor="middle">
        pre-reduce
      </text>
      <g className="sch-host-dashed">
        <path d="M92 34 C 122 34, 149 40, 149 65" />
        <Head x={149} y={68} angle={90} />
        <path d="M149 110 C 149 140, 125 146, 97 146" />
        <Head x={94} y={146} angle={180} />
      </g>
    </>
  ),
}

export function Schematic({ id, tall }: { id: SchematicId; tall?: boolean }) {
  const drawing = tall ? TALL[id] : undefined
  return (
    <svg
      className={tall ? 'sch sch-tall' : 'sch'}
      viewBox={drawing ? '0 0 200 180' : '0 0 320 180'}
      aria-hidden="true"
      focusable="false"
    >
      {drawing ?? SCHEMATICS[id]}
    </svg>
  )
}

/* ==========================================================================
   The r/place cover: not architecture, the product itself. A mid-painting
   pixel canvas (heart, invader, flower, stray pixels) with one pixel being
   placed right now. Cells are 10px: 32x18 on the wide canvas, 22x20 on the
   squarer one the home page's selected work uses.
   ========================================================================== */

type Px = [number, number]

const place = ([ox, oy]: Px, cells: Px[]): Px[] =>
  cells.map(([c, r]) => [c + ox, r + oy])

const HEART: Px[] = [
  [1, 0], [2, 0], [4, 0], [5, 0],
  [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
  [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
  [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
  [2, 4], [3, 4], [4, 4],
  [3, 5],
]

const INVADER: Px[] = [
  [2, 0], [5, 0],
  [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
  [0, 2], [1, 2], [3, 2], [4, 2], [6, 2], [7, 2],
  [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
  [0, 4], [2, 4], [5, 4], [7, 4],
  [1, 5], [6, 5],
]

const FLOWER_BLOOM: Px[] = [
  [2, 0],
  [1, 1], [2, 1], [3, 1],
  [2, 2],
]

const FLOWER_STEM: Px[] = [
  [2, 3], [2, 4],
]

/** Where everything sits on one canvas: each shape's top-left cell, the
    stray pixels, and the pixel being placed. */
type Layout = {
  cols: number
  rows: number
  heart: Px
  invader: Px
  flower: Px
  sprinkles: { tone: string; cells: Px[] }[]
  active: Px
}

const WIDE: Layout = {
  cols: 32,
  rows: 18,
  heart: [4, 3],
  invader: [21, 3],
  flower: [14, 10],
  sprinkles: [
    { tone: 'leadership', cells: [[11, 7], [29, 2]] },
    { tone: 'research', cells: [[18, 3], [9, 13]] },
    { tone: 'work', cells: [[27, 11]] },
    { tone: 'education', cells: [[3, 12]] },
  ],
  active: [25, 14],
}

/* The squarer canvas keeps two cells of margin left and right and one top
   and bottom: those covers run from a little taller than wide to a little
   wider than tall, and "slice" crops whatever doesn't fit. */
const SQUARE: Layout = {
  cols: 22,
  rows: 20,
  heart: [2, 3],
  invader: [12, 3],
  flower: [3, 11],
  sprinkles: [
    { tone: 'leadership', cells: [[10, 5], [18, 16]] },
    { tone: 'research', cells: [[15, 11], [9, 16]] },
    { tone: 'work', cells: [[19, 13]] },
    { tone: 'education', cells: [[2, 16]] },
  ],
  active: [14, 14],
}

/** The painter's cursor outline, relative to its tip. */
const CURSOR: Px[] = [
  [0, 0], [0, 15], [3.5, 11.5], [6, 17], [8.5, 15.8], [6, 10.5], [10.5, 10.5],
]

function cellRect(tone: string, [c, r]: Px) {
  return (
    <rect
      key={`${tone}-${c}-${r}`}
      className={`pxc-${tone}`}
      x={c * 10 + 0.75}
      y={r * 10 + 0.75}
      width="8.5"
      height="8.5"
    />
  )
}

export function RPlaceCanvas({ square }: { square?: boolean }) {
  const L = square ? SQUARE : WIDE
  const w = L.cols * 10
  const h = L.rows * 10
  const [ac, ar] = L.active
  return (
    <svg
      className={square ? 'pxc pxc-square' : 'pxc'}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect className="pxc-bg" width={w} height={h} />
      {Array.from({ length: L.cols - 1 }, (_, i) => (
        <line
          key={`v${i}`}
          className="pxc-grid"
          x1={(i + 1) * 10}
          y1="0"
          x2={(i + 1) * 10}
          y2={h}
        />
      ))}
      {Array.from({ length: L.rows - 1 }, (_, i) => (
        <line
          key={`h${i}`}
          className="pxc-grid"
          x1="0"
          y1={(i + 1) * 10}
          x2={w}
          y2={(i + 1) * 10}
        />
      ))}
      {place(L.heart, HEART).map((p) => cellRect('work', p))}
      {place(L.invader, INVADER).map((p) => cellRect('education', p))}
      {place(L.flower, FLOWER_BLOOM).map((p) => cellRect('research', p))}
      {place(L.flower, FLOWER_STEM).map((p) => cellRect('primary', p))}
      {L.sprinkles.flatMap((s) => s.cells.map((p) => cellRect(s.tone, p)))}
      {cellRect('accent', L.active)}
      <rect
        className="pxc-ring"
        x={ac * 10 - 1.5}
        y={ar * 10 - 1.5}
        width="13"
        height="13"
        rx="2"
      />
      {/* the painter's cursor, mid-placement */}
      <polygon
        className="pxc-cursor"
        points={CURSOR.map(([x, y]) => `${ac * 10 + 8 + x},${ar * 10 + 8 + y}`).join(' ')}
      />
    </svg>
  )
}
