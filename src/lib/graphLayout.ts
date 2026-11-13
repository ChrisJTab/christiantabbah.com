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
  /** Shared "now" level: every open branch's line runs exactly this far. */
  nowY: number
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
  // All ongoing branches terminate together here, so "still current" reads
  // as one shared boundary instead of staggered label positions.
  const nowY = TOP_PAD - 8

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

  // --- events on main, tips, and the nudges that keep rows apart --------
  // A labeled node must sit on its branch's straight run, between the merge
  // curve (lo) and the fork curve (hi), and log rows need ROW_GAP between
  // them. A branch shorter than one row can't dodge a collision by sliding,
  // so it is pinned: placed first, at its true position, and when two pinned
  // branches still collide the later one is nudged down as a whole (a month
  // or two on the page; the dates in its row stay exact). The layout is then
  // re-solved with the nudge applied so dots, curves, and rows agree. Long
  // branches slide down their runs around whatever is pinned.
  interface MainEvent {
    entryId: string
    category: Category
    kind: 'fork' | 'merge'
    y: number
  }
  interface Solved {
    mainEvents: MainEvent[]
    forkYOf: Map<string, number>
    mergeYOf: Map<string, number>
    cOf: Map<string, number>
    tipYOf: Map<string, number>
    newShifts: Map<string, number>
  }

  const solve = (shiftOf: Map<string, number>): Solved => {
    const mainEvents: MainEvent[] = []
    for (const e of entries) {
      const s = shiftOf.get(e.id) ?? 0
      mainEvents.push({
        entryId: e.id,
        category: e.category,
        kind: 'fork',
        y: yOf(monthsSinceEpoch(e.start)) + s,
      })
      if (e.end !== 'ongoing') {
        mainEvents.push({
          entryId: e.id,
          category: e.category,
          kind: 'merge',
          y: yOf(monthsSinceEpoch(e.end)) + s,
        })
      }
    }
    // Top of the graph first; push same-month collisions down.
    mainEvents.sort((a, b) => a.y - b.y || a.entryId.localeCompare(b.entryId))
    let prevY = -Infinity
    for (const ev of mainEvents) {
      ev.y = Math.max(ev.y, prevY + MAIN_DOT_GAP)
      prevY = ev.y
    }
    const forkYOf = new Map<string, number>()
    const mergeYOf = new Map<string, number>()
    for (const ev of mainEvents) {
      if (ev.kind === 'fork') forkYOf.set(ev.entryId, ev.y)
      else mergeYOf.set(ev.entryId, ev.y)
    }

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

    // The run each labeled node may sit on. Ongoing tips stack from the very
    // top instead: HEAD first, then oldest start.
    const loOf = new Map<string, number>()
    const hiOf = new Map<string, number>()
    for (const e of entries) {
      const c = cOf.get(e.id)!
      hiOf.set(e.id, forkYOf.get(e.id)! - c)
      const mergeY = mergeYOf.get(e.id)
      loOf.set(e.id, mergeY === undefined ? TOP_PAD : mergeY + c + 6)
    }
    const ongoing = entries
      .filter((e) => e.end === 'ongoing')
      .sort(
        (a, b) =>
          Number(b.head ?? false) - Number(a.head ?? false) ||
          monthsSinceEpoch(a.start) - monthsSinceEpoch(b.start) ||
          a.id.localeCompare(b.id),
      )
    ongoing.forEach((e, i) => loOf.set(e.id, TOP_PAD + i * 4))

    // Fork/merge curves sweep across every lane closer to main than their own.
    // An ongoing node parked near the top must not sit inside such a curve's
    // vertical band, or the curve appears to run through the node.
    const NODE_CLEARANCE = 12
    const curveBands: { x: number; lo: number; hi: number }[] = []
    for (const e of entries) {
      const x = laneOf.get(e.id)!
      const c = cOf.get(e.id)!
      const forkY = forkYOf.get(e.id)!
      curveBands.push({ x, lo: forkY - c, hi: forkY })
      const mergeY = mergeYOf.get(e.id)
      if (mergeY !== undefined) curveBands.push({ x, lo: mergeY, hi: mergeY + c })
    }
    curveBands.sort((a, b) => a.lo - b.lo)

    const tipYOf = new Map<string, number>()
    const placed: number[] = []
    /** First y at or below `y` that keeps ROW_GAP from every placed tip. */
    const clear = (y: number): number => {
      let out = y
      for (let guard = 0; guard < 64; guard++) {
        const hit = placed.find((p) => Math.abs(out - p) < ROW_GAP)
        if (hit === undefined) break
        out = hit + ROW_GAP
      }
      return out
    }
    const place = (id: string, y: number) => {
      tipYOf.set(id, y)
      placed.push(y)
    }

    prevY = -Infinity
    for (const e of ongoing) {
      let y = Math.max(loOf.get(e.id)!, prevY + ROW_GAP)
      const myX = laneOf.get(e.id)!
      for (const band of curveBands) {
        const crossesMyLane = band.x > myX
        if (
          crossesMyLane &&
          y > band.lo - NODE_CLEARANCE &&
          y < band.hi + NODE_CLEARANCE
        ) {
          y = band.hi + NODE_CLEARANCE
        }
      }
      y = Math.min(y, hiOf.get(e.id)!)
      place(e.id, y)
      prevY = y
    }

    const merged = entries.filter((e) => e.end !== 'ongoing')
    const isPinned = (e: TimelineEntry) =>
      hiOf.get(e.id)! - loOf.get(e.id)! < ROW_GAP
    const newShifts = new Map<string, number>()
    const pinned = merged
      .filter(isPinned)
      .sort(
        (a, b) => hiOf.get(a.id)! - hiOf.get(b.id)! || a.id.localeCompare(b.id),
      )
    for (const e of pinned) {
      const hi = hiOf.get(e.id)!
      // A run shorter than zero (two curves and nothing between them) parks
      // the node just inside the merge curve, which is what hi is.
      const natural = Math.min(loOf.get(e.id)!, hi)
      const y = clear(natural)
      if (y > hi) newShifts.set(e.id, y - hi)
      place(e.id, Math.min(y, hi))
    }

    const flexible = merged
      .filter((e) => !isPinned(e))
      .sort(
        (a, b) => loOf.get(a.id)! - loOf.get(b.id)! || a.id.localeCompare(b.id),
      )
    prevY = -Infinity
    for (const e of flexible) {
      const y = Math.min(
        clear(Math.max(loOf.get(e.id)!, prevY + ROW_GAP)),
        hiOf.get(e.id)!,
      )
      place(e.id, y)
      prevY = y
    }

    return { mainEvents, forkYOf, mergeYOf, cOf, tipYOf, newShifts }
  }

  const shiftOf = new Map<string, number>()
  let solved = solve(shiftOf)
  for (let pass = 0; pass < 3 && solved.newShifts.size > 0; pass++) {
    for (const [id, px] of solved.newShifts) {
      shiftOf.set(id, (shiftOf.get(id) ?? 0) + px)
    }
    solved = solve(shiftOf)
  }
  const { mainEvents, forkYOf, mergeYOf, cOf, tipYOf } = solved

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
      // Open branch: the line reaches "now"; the labeled node sits on it.
      path += ` L ${x} ${nowY}`
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
    nowY,
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
