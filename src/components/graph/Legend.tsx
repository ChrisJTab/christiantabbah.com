import { CATEGORY_ORDER } from '../../lib/graphLayout'
import type { Category } from '../../data/timeline'
import type { Highlight } from './GitGraph'

interface LegendProps {
  counts: Record<Category, number>
  pinned: Category | null
  onPin(category: Category | null): void
  onHover(h: Highlight | null): void
}

/** Styled like the output of `git branch`; hover to trace, click to pin. */
export function Legend({ counts, pinned, onPin, onHover }: LegendProps) {
  return (
    <div className="legend mono">
      <p className="legend-cmd" aria-hidden="true">
        $ git branch
      </p>
      <p className="legend-main">
        <span aria-hidden="true">* </span>main
      </p>
      {CATEGORY_ORDER.map((cat) => (
        <button
          key={cat}
          type="button"
          className="legend-row"
          style={{ ['--branch-color' as string]: `var(--c-${cat})` }}
          aria-pressed={pinned === cat}
          onClick={() => onPin(pinned === cat ? null : cat)}
          onMouseEnter={() => onHover({ kind: 'category', category: cat })}
          onMouseLeave={() => onHover(null)}
          onFocus={() => onHover({ kind: 'category', category: cat })}
          onBlur={() => onHover(null)}
        >
          <span className="legend-swatch" aria-hidden="true" />
          {cat}
          <span className="legend-count">({counts[cat]})</span>
        </button>
      ))}
    </div>
  )
}
