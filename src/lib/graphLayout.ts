/**
 * Pure geometry for the git-graph timeline.
 *
 * Time flows bottom → top (like `git log --graph`): newest at the top.
 * `main` is a vertical spine; each entry is a branch that forks off main at
 * its start date and merges back at its end date (or stays open with a tip
 * node near the top when ongoing). Everything is computed from the data;
 * components only draw what this returns.
 */
import type { Category, TimelineEntry } from '../data/timeline'
import { EPOCH_YEAR, monthsSinceEpoch, type YM } from './dates'

export const CATEGORY_ORDER: Category[] = [
  'work',
  'education',
  'research',
  'leadership',
]

const TOP_PAD = 64
const BOTTOM_PAD = 56
const PX_PER_MONTH = 13
const MAIN_X = 74
const LANE_GAP = 42
const SUB_GAP = 18 // extra offset when two same-category branches overlap in time
const ROW_GAP = 34 // min spacing between labeled rows (log lines)
const MAIN_DOT_GAP = 13 // min spacing between fork/merge dots on main
const LABEL_GAP = 32 // gap between the last lane and the log-text column

/** Curve depth grows with lane distance so far branches sweep, not jog. */
function curveH(x: number): number {
  return Math.max(20, Math.min(34, (x - MAIN_X) * 0.22))
}

export interface LaidBranch {
  entry: TimelineEntry
  /** Lane center x of this branch. */
  x: number
  forkY: number
  /** y of the labeled commit node (the branch tip). */
  tipY: number
  /** y where the branch rejoins main; null for open branches. */
  mergeY: number | null
  /** Full SVG path, drawn fork → tip (→ merge) so dash-reveal grows upward. */
  path: string
  /** Reveal-choreography delay for this branch, ms. */
  delayMs: number
}

export interface MainDot {
  y: number
  category: Category
  kind: 'fork' | 'merge'
  entryId: string
}

export interface GraphLayout {
  /** Width of the SVG lane area; log rows start at labelX. */
  width: number
  height: number
  labelX: number
  mainX: number
  mainPath: string
  mainTipY: number
  /** Branches sorted top → bottom; this is also the tab/reading order. */
  branches: LaidBranch[]
  mainDots: MainDot[]
  years: { year: number; y: number }[]
}

export function layoutGraph(entries: TimelineEntry[], now: YM): GraphLayout {
  const nowT = monthsSinceEpoch(now)
  const tMax = nowT + 1
  const yOf = (t: number) => TOP_PAD + (tMax - t) * PX_PER_MONTH
  const height = yOf(0) + BOTTOM_PAD

  // --- lane allocation (per category, with overflow sub-lanes) -----------
  const laneOf = new Map<string, number>()
  const slotEnds = new Map<Category, number[]>() // end-time per occupied slot
  const byStart = [...entries].sort(
    (a, b) => monthsSinceEpoch(a.start) - monthsSinceEpoch(b.start),
  )
  for (const e of byStart) {
    const startT = monthsSinceEpoch(e.start)
    const endT = e.end === 'ongoing' ? Infinity : monthsSinceEpoch(e.end)
    const slots = slotEnds.get(e.category) ?? []
    let slot = slots.findIndex((occupiedUntil) => occupiedUntil < startT)
    if (slot === -1) {
      slot = slots.length
      slots.push(endT)
    } else {
      slots[slot] = endT
    }
    slotEnds.set(e.category, slots)
    const base = MAIN_X + (CATEGORY_ORDER.indexOf(e.category) + 1) * LANE_GAP
    laneOf.set(e.id, base + slot * SUB_GAP)
  }
  const maxLaneX = Math.max(...laneOf.values())
  const labelX = maxLaneX + LABEL_GAP

  // --- events on main, nudged apart when they land on the same month -----
  interface MainEvent {
    entryId: string
    category: Category
    kind: 'fork' | 'merge'
    t: number
    y: number
  }
  const mainEvents: MainEvent[] = []
  for (const e of entries) {
    mainEvents.push({
      entryId: e.id,
      category: e.category,
      kind: 'fork',
      t: monthsSinceEpoch(e.start),
      y: 0,
    })
    if (e.end !== 'ongoing') {
      mainEvents.push({
        entryId: e.id,
        category: e.category,
        kind: 'merge',
        t: monthsSinceEpoch(e.end),
        y: 0,
      })
    }
  }
  // Top of the graph first (later time = smaller y); push collisions down.
  mainEvents.sort((a, b) => b.t - a.t || a.entryId.localeCompare(b.entryId))
  let prevY = -Infinity
  for (const ev of mainEvents) {
    ev.y = Math.max(yOf(ev.t), prevY + MAIN_DOT_GAP)
    prevY = ev.y
  }
  const forkYOf = new Map<string, number>()
  const mergeYOf = new Map<string, number>()
  for (const ev of mainEvents) {
    if (ev.kind === 'fork') forkYOf.set(ev.entryId, ev.y)
    else mergeYOf.set(ev.entryId, ev.y)
  }

  // --- tip (labeled node) positions, swept so log rows never collide ------
  // Ongoing tips stack from the very top: HEAD first, then newest start.
  const ongoing = entries
    .filter((e) => e.end === 'ongoing')
    .sort(
      (a, b) =>
        Number(b.head ?? false) - Number(a.head ?? false) ||
        monthsSinceEpoch(b.start) - monthsSinceEpoch(a.start),
    )
  // Per-branch curve depth (shrunk when the branch is too short to fit two).
  const cOf = new Map<string, number>()
  for (const e of entries) {
    const x = laneOf.get(e.id)!
    let c = curveH(x)
    const mergeY = mergeYOf.get(e.id)
    if (mergeY !== undefined) {
      const span = forkYOf.get(e.id)! - mergeY
      c = Math.min(c, Math.floor((span - 8) / 2))
    }
    cOf.set(e.id, Math.max(12, c))
  }

  const seedTipY = new Map<string, number>()
  ongoing.forEach((e, i) => seedTipY.set(e.id, TOP_PAD + i * 4))
  for (const e of entries) {
    if (e.end !== 'ongoing') {
      seedTipY.set(e.id, (mergeYOf.get(e.id) ?? 0) + cOf.get(e.id)! + 6)
    }
  }
  const tips = [...entries].sort(
    (a, b) => (seedTipY.get(a.id) ?? 0) - (seedTipY.get(b.id) ?? 0),
  )
  const tipYOf = new Map<string, number>()
  prevY = -Infinity
  for (const e of tips) {
    let y = Math.max(seedTipY.get(e.id) ?? 0, prevY + ROW_GAP)
    // Never push a tip past its own fork curve (short branches stay intact).
    y = Math.min(y, (forkYOf.get(e.id) ?? height) - cOf.get(e.id)!)
    tipYOf.set(e.id, y)
    prevY = y
  }

  // --- paths ---------------------------------------------------------------
  const branches: LaidBranch[] = entries.map((e) => {
    const x = laneOf.get(e.id)!
    const forkY = forkYOf.get(e.id)!
    const tipY = tipYOf.get(e.id)!
    const mergeY = mergeYOf.get(e.id) ?? null
    const c = cOf.get(e.id)!
    let path =
      `M ${MAIN_X} ${forkY} ` +
      `C ${MAIN_X} ${forkY - c * 0.75}, ${x} ${forkY - c * 0.25}, ` +
      `${x} ${forkY - c}`
    if (mergeY === null) {
      path += ` L ${x} ${tipY}`
    } else {
      path +=
        ` L ${x} ${mergeY + c} ` +
        `C ${x} ${mergeY + c * 0.25}, ${MAIN_X} ${mergeY + c * 0.75}, ` +
        `${MAIN_X} ${mergeY}`
    }
    return { entry: e, x, forkY, tipY, mergeY, path, delayMs: 0 }
  })

  // Reveal order: earliest fork first (the story grows upward into now).
  const revealOrder = [...branches].sort((a, b) => b.forkY - a.forkY)
  revealOrder.forEach((b, i) => {
    b.delayMs = 140 + i * 85
  })

  branches.sort((a, b) => a.tipY - b.tipY)

  const mainTipY = TOP_PAD - 16
  const mainPath = `M ${MAIN_X} ${height - BOTTOM_PAD + 18} L ${MAIN_X} ${mainTipY}`

  const years: { year: number; y: number }[] = []
  const lastYear = EPOCH_YEAR + Math.floor(nowT / 12)
  for (let year = EPOCH_YEAR; year <= lastYear; year++) {
    const t = (year - EPOCH_YEAR) * 12
    if (t <= tMax) years.push({ year, y: yOf(t) })
  }

  return {
    width: labelX,
    height,
    labelX,
    mainX: MAIN_X,
    mainPath,
    mainTipY,
    branches,
    mainDots: mainEvents.map(({ entryId, category, kind, y }) => ({
      entryId,
      category,
      kind,
      y,
    })),
    years,
  }
}
