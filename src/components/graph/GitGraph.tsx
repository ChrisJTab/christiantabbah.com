import type { CSSProperties } from 'react'
import type { Category, TimelineEntry } from '../../data/timeline'
import { formatRange } from '../../lib/dates'
import type { GraphLayout } from '../../lib/graphLayout'
import { commitHashFor } from '../../lib/hash'

export type Highlight =
  | { kind: 'category'; category: Category }
  | { kind: 'entry'; id: string }

interface GitGraphProps {
  layout: GraphLayout
  selectedId: string | null
  onSelect(id: string): void
  highlight: Highlight | null
  onHighlight(h: Highlight | null): void
}

function matchState(highlight: Highlight | null, entry: TimelineEntry): string {
  if (!highlight) return ''
  const hit =
    highlight.kind === 'category'
      ? highlight.category === entry.category
      : highlight.id === entry.id
  return hit ? 'is-hi' : 'is-dim'
}

const vars = (v: Record<string, string>) => v as CSSProperties

/**
 * Desktop graph: an SVG layer for lanes/curves/nodes (aria-hidden) and an
 * HTML layer of real buttons: one `git log --oneline`-style row per commit,
 * vertically aligned with its node. Keyboard users tab through the rows.
 */
export function GitGraph({
  layout,
  selectedId,
  onSelect,
  highlight,
  onHighlight,
}: GitGraphProps) {
  const delayOf = new Map(layout.branches.map((b) => [b.entry.id, b.delayMs]))

  return (
    <div className="graph">
      <svg
        className="graph-svg"
        width={layout.width}
        height={layout.height}
        aria-hidden="true"
        focusable="false"
      >
        <g className="year-lines">
          {layout.years.map((y) => (
            <line key={y.year} x1={46} x2={layout.width} y1={y.y} y2={y.y} />
          ))}
        </g>
        <line
          className="now-line"
          x1={46}
          x2={layout.width}
          y1={layout.nowY}
          y2={layout.nowY}
        />
        <path className="main-line" d={layout.mainPath} pathLength={1} />
        <circle
          className="main-tip"
          cx={layout.mainX}
          cy={layout.mainTipY}
          r={4}
        />
        {layout.branches.map((b) => {
          const e = b.entry
          const selected = e.id === selectedId
          return (
            <g
              key={e.id}
              className={`branch ${matchState(highlight, e)} ${selected ? 'is-selected' : ''}`}
              style={vars({
                '--branch-color': `var(--c-${e.category})`,
                '--d': `${b.delayMs}ms`,
              })}
              onMouseEnter={() => onHighlight({ kind: 'entry', id: e.id })}
              onMouseLeave={() => onHighlight(null)}
            >
              <path className="branch-line" d={b.path} pathLength={1} />
              {selected && (
                <circle className="tip-halo" cx={b.x} cy={b.tipY} r={11.5} />
              )}
              {e.head && (
                <circle className="head-pulse" cx={b.x} cy={b.tipY} r={7} />
              )}
              <circle
                className="tip"
                cx={b.x}
                cy={b.tipY}
                r={6.5}
                onClick={() => onSelect(e.id)}
              />
            </g>
          )
        })}
        <g className="main-dots">
          {layout.mainDots.map((d) => (
            <circle
              key={`${d.entryId}-${d.kind}`}
              className={`main-dot ${d.kind}`}
              cx={layout.mainX}
              cy={d.y}
              r={3.4}
              style={vars({
                '--branch-color': `var(--c-${d.category})`,
                '--d': `${delayOf.get(d.entryId) ?? 0}ms`,
              })}
            />
          ))}
        </g>
      </svg>

      <div className="graph-gutter" aria-hidden="true">
        <span className="mono now-label" style={{ top: layout.nowY }}>
          now
        </span>
        {layout.years.map((y) => (
          <span key={y.year} className="mono" style={{ top: y.y }}>
            {y.year}
          </span>
        ))}
      </div>

      <ol className="log-rows" style={vars({ '--label-x': `${layout.labelX}px` })}>
        {layout.branches.map((b) => {
          const e = b.entry
          const selected = e.id === selectedId
          return (
            <li key={e.id} style={{ top: b.tipY }}>
              <button
                type="button"
                className={`log-row ${matchState(highlight, e)} ${selected ? 'is-selected' : ''}`}
                style={vars({
                  '--branch-color': `var(--c-${e.category})`,
                  '--d': `${b.delayMs}ms`,
                })}
                aria-expanded={selected}
                aria-controls="commit-panel"
                aria-label={`${e.role}, ${e.org}, ${formatRange(e.start, e.end)}`}
                title={`${e.role} · ${e.org}`}
                onClick={() => onSelect(e.id)}
                onMouseEnter={() => onHighlight({ kind: 'entry', id: e.id })}
                onMouseLeave={() => onHighlight(null)}
                onFocus={() => onHighlight({ kind: 'entry', id: e.id })}
                onBlur={() => onHighlight(null)}
              >
                <span className="log-hash" aria-hidden="true">
                  {commitHashFor(e.id)}
                </span>
                <span className="log-title">{e.short}</span>
                {e.refName && (
                  // Rows abbreviate HEAD's ref; the commit panel shows it in full.
                  <span className="ref-pill" data-head={e.head ? '' : undefined}>
                    {e.head ? 'HEAD' : e.refName}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
