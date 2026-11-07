import type { ReactNode } from 'react'
import type { SchematicId } from '../../data/projects'

/**
 * Hand-drawn-feel system schematics, one per systems project: the projects
 * page's answer to the timeline's git graph. All strokes/fills reference
 * theme variables (styled in projects.css); each card sets --topic-color.
 * Decorative: the visible caption next to each one carries the meaning.
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
      <circle className="sch-dot" cx="28" cy="90" r="4" />
      <text className="sch-label" x="28" y="112" textAnchor="middle">
        key
      </text>
      <g className="sch-line">
        <line x1="36" y1="90" x2="77" y2="90" />
        <Head x={80} y={90} />
      </g>
      <circle className="sch-main" cx="118" cy="90" r="36" fill="none" />
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
        <circle key={`${x}-${y}`} className="sch-node" cx={x} cy={y} r="4" />
      ))}
      {[40, 90, 140].map((y, i) => (
        <g key={y} className="sch-line">
          <path
            className="sch-cyl"
            d={`M240 ${y - 8} v18 a28 7 0 0 0 56 0 v-18`}
          />
          <ellipse className="sch-cyl" cx="268" cy={y - 8} rx="28" ry="7" />
          <text className="sch-label" x="268" y={y + 8} textAnchor="middle">
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
      <rect className="sch-box" x="86" y="54" width="74" height="64" rx="8" />
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

  /* Two paths from GPU A to GPU B: direct RDMA (solid), or dashed through
     the host node that pre-reduces on the way. Heads on both hops. */
  olap: (
    <>
      <rect className="sch-box" x="22" y="64" width="72" height="52" rx="8" />
      <text className="sch-label" x="58" y="93" textAnchor="middle">
        gpu a
      </text>
      <rect className="sch-box" x="226" y="64" width="72" height="52" rx="8" />
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
      <text className="sch-label" x="158" y="122" textAnchor="middle">
        rdma · ucx
      </text>
      <rect className="sch-dashed" x="120" y="26" width="80" height="36" rx="8" />
      <text className="sch-label" x="160" y="42" textAnchor="middle">
        host
      </text>
      <text className="sch-label" x="160" y="55" textAnchor="middle">
        pre-reduce
      </text>
      <g className="sch-branch-dashed">
        <path d="M94 74 C 106 60, 114 52, 123 47" />
        <Head x={126} y={45.5} angle={-25} />
        <path d="M194 46 C 204 50, 212 58, 222 72" />
        <Head x={224} y={75} angle={55} />
      </g>
    </>
  ),

  disagg: (
    <>
      <rect className="sch-box" x="24" y="52" width="104" height="76" rx="8" />
      <text className="sch-label" x="76" y="86" textAnchor="middle">
        compute
      </text>
      <text className="sch-label" x="76" y="102" textAnchor="middle">
        rocksdb
      </text>
      <rect className="sch-box" x="192" y="52" width="104" height="76" rx="8" />
      <text className="sch-label" x="244" y="86" textAnchor="middle">
        storage
      </text>
      <text className="sch-label" x="244" y="102" textAnchor="middle">
        hailstorm
      </text>
      <line className="sch-dashed" x1="160" y1="36" x2="160" y2="144" />
      <text className="sch-label" x="160" y="28" textAnchor="middle">
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
      <g className="sch-main">
        <line x1="192" y1="108" x2="133" y2="108" />
        <Head x={130} y={108} angle={180} />
      </g>
      <text className="sch-label" x="170" y="124" textAnchor="start">
        get
      </text>
    </>
  ),

  /* Stop-and-wait told honestly: #1 is acked, #2 dies on the wire, the
     sender's (dashed) timer fires, the retransmit goes through, ack 2
     comes back. */
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
      <text className="sch-label" x="100" y="62">
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
      <text className="sch-label" x="188" y="90">
        dropped
      </text>
      <path className="sch-dashed" d="M80 98 C 58 104, 58 118, 80 124" fill="none" />
      <text className="sch-label" x="44" y="114" textAnchor="middle">
        timeout
      </text>
      <g className="sch-branch">
        <line x1="80" y1="130" x2="234" y2="130" />
        <Head x={237} y={130} />
      </g>
      <text className="sch-label" x="92" y="124">
        #2 again
      </text>
      <g className="sch-accent">
        <line x1="240" y1="152" x2="88" y2="152" />
        <Head x={85} y={152} angle={180} />
      </g>
      <text className="sch-label" x="100" y="146">
        ack 2
      </text>
    </>
  ),

  /* EGAD: the CPU primary store on the left, the GPU execution cache on
     the right, the stager between them. Admit goes right before a batch,
     write-back comes left after it; the bracket says how far apart the
     two copies are ever allowed to drift. */
  egad: (
    <>
      <rect className="sch-box" x="16" y="50" width="110" height="80" rx="8" />
      <text className="sch-label" x="71" y="86" textAnchor="middle">
        cpu memory
      </text>
      <text className="sch-label" x="71" y="102" textAnchor="middle">
        primary store
      </text>
      <rect className="sch-box" x="194" y="50" width="110" height="80" rx="8" />
      <text className="sch-label" x="249" y="86" textAnchor="middle">
        gpu memory
      </text>
      <text className="sch-label" x="249" y="102" textAnchor="middle">
        exec cache
      </text>
      <g className="sch-main">
        <line x1="126" y1="72" x2="189" y2="72" />
        <Head x={192} y={72} />
      </g>
      <text className="sch-label" x="160" y="64" textAnchor="middle">
        admit
      </text>
      <rect className="sch-box" x="136" y="80" width="48" height="20" rx="5" />
      <text className="sch-label" x="160" y="94" textAnchor="middle">
        stager
      </text>
      <g className="sch-accent">
        <line x1="194" y1="108" x2="131" y2="108" />
        <Head x={128} y={108} angle={180} />
      </g>
      <text className="sch-label" x="160" y="122" textAnchor="middle">
        write back
      </text>
      <path className="sch-dashed" d="M71 134 v10 H249 v-10" />
      <text className="sch-label" x="160" y="160" textAnchor="middle">
        never more than 2 batches apart
      </text>
    </>
  ),
}

export function Schematic({ id }: { id: SchematicId }) {
  return (
    <svg
      className="sch"
      viewBox="0 0 320 180"
      aria-hidden="true"
      focusable="false"
    >
      {SCHEMATICS[id]}
    </svg>
  )
}

/* ==========================================================================
   The r/place cover: not architecture, the product itself. A mid-painting
   pixel canvas (heart, invader, flower, stray pixels) with one pixel being
   placed right now. 32x18 cells of 10px on the 320x180 canvas.
   ========================================================================== */

type Px = [number, number]

const at = (ox: number, oy: number, cells: Px[]): Px[] =>
  cells.map(([c, r]) => [c + ox, r + oy])

const HEART = at(4, 3, [
  [1, 0], [2, 0], [4, 0], [5, 0],
  [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
  [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
  [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
  [2, 4], [3, 4], [4, 4],
  [3, 5],
])

const INVADER = at(21, 3, [
  [2, 0], [5, 0],
  [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
  [0, 2], [1, 2], [3, 2], [4, 2], [6, 2], [7, 2],
  [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
  [0, 4], [2, 4], [5, 4], [7, 4],
  [1, 5], [6, 5],
])

const FLOWER_BLOOM = at(14, 10, [
  [2, 0],
  [1, 1], [2, 1], [3, 1],
  [2, 2],
])

const FLOWER_STEM = at(14, 10, [
  [2, 3], [2, 4],
])

const SPRINKLES: { tone: string; cells: Px[] }[] = [
  { tone: 'leadership', cells: [[11, 7], [29, 2]] },
  { tone: 'research', cells: [[18, 3], [9, 13]] },
  { tone: 'work', cells: [[27, 11]] },
  { tone: 'education', cells: [[3, 12]] },
]

const ACTIVE: Px = [25, 14]

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

export function RPlaceCanvas() {
  return (
    <svg
      className="pxc"
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect className="pxc-bg" width="320" height="180" />
      {Array.from({ length: 31 }, (_, i) => (
        <line
          key={`v${i}`}
          className="pxc-grid"
          x1={(i + 1) * 10}
          y1="0"
          x2={(i + 1) * 10}
          y2="180"
        />
      ))}
      {Array.from({ length: 17 }, (_, i) => (
        <line
          key={`h${i}`}
          className="pxc-grid"
          x1="0"
          y1={(i + 1) * 10}
          x2="320"
          y2={(i + 1) * 10}
        />
      ))}
      {HEART.map((p) => cellRect('work', p))}
      {INVADER.map((p) => cellRect('education', p))}
      {FLOWER_BLOOM.map((p) => cellRect('research', p))}
      {FLOWER_STEM.map((p) => cellRect('primary', p))}
      {SPRINKLES.flatMap((s) => s.cells.map((p) => cellRect(s.tone, p)))}
      {cellRect('accent', ACTIVE)}
      <rect
        className="pxc-ring"
        x={ACTIVE[0] * 10 - 1.5}
        y={ACTIVE[1] * 10 - 1.5}
        width="13"
        height="13"
        rx="2"
      />
      {/* the painter's cursor, mid-placement */}
      <polygon
        className="pxc-cursor"
        points="258,148 258,163 261.5,159.5 264,165 266.5,163.8 264,158.5 268.5,158.5"
      />
    </svg>
  )
}
