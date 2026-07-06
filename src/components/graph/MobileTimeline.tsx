import type { CSSProperties } from 'react'
import type { LaidBranch } from '../../lib/graphLayout'
import { formatRange } from '../../lib/dates'
import { CommitCard } from './CommitCard'

interface MobileTimelineProps {
  branches: LaidBranch[]
  selectedId: string | null
  onSelect(id: string): void
}

/** Below 900px the graph collapses to a single spine; panels open inline. */
export function MobileTimeline({
  branches,
  selectedId,
  onSelect,
}: MobileTimelineProps) {
  return (
    <ol className="mob-log">
      {branches.map((b, i) => {
        const e = b.entry
        const open = e.id === selectedId
        return (
          <li
            key={e.id}
            style={{ ['--branch-color' as string]: `var(--c-${e.category})`, ['--d' as string]: `${90 + i * 60}ms` } as CSSProperties}
          >
            <span className="mob-dot" aria-hidden="true" />
            <button
              type="button"
              className="mob-row"
              aria-expanded={open}
              aria-controls={`mob-panel-${e.id}`}
              onClick={() => onSelect(e.id)}
            >
              <span className="mob-row-main">
                <span className="mob-title mono">{e.short}</span>
                <span className="mob-dates mono">
                  {formatRange(e.start, e.end)} · {e.category}
                </span>
              </span>
              {e.refName && (
                <span className="ref-pill" data-head={e.head ? '' : undefined}>
                  {e.head ? 'HEAD' : 'open'}
                </span>
              )}
            </button>
            <div
              id={`mob-panel-${e.id}`}
              className="mob-panel-slot"
              hidden={!open}
            >
              {open && (
                <div className="commit-box mob-panel">
                  <CommitCard entry={e} />
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
