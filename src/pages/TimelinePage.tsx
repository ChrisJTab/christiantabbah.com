import { useMemo, useState } from 'react'
import { Shell } from '../components/Shell'
import { CommitPanel } from '../components/graph/CommitPanel'
import { GitGraph, type Highlight } from '../components/graph/GitGraph'
import { Legend } from '../components/graph/Legend'
import { MobileTimeline } from '../components/graph/MobileTimeline'
import { TIMELINE_NOW, timeline, type Category } from '../data/timeline'
import { layoutGraph, CATEGORY_ORDER } from '../lib/graphLayout'
import { useMediaQuery } from '../lib/useMediaQuery'
import '../components/graph/timeline.css'

const VALID_IDS = new Set(timeline.map((e) => e.id))

function initialSelection(): string | null {
  const fromHash = window.location.hash.slice(1)
  return VALID_IDS.has(fromHash) ? fromHash : 'gpu-txn-db'
}

export function TimelinePage() {
  const layout = useMemo(() => layoutGraph(timeline, TIMELINE_NOW), [])
  const [selectedId, setSelectedId] = useState<string | null>(initialSelection)
  const [hover, setHover] = useState<Highlight | null>(null)
  const [pinned, setPinned] = useState<Category | null>(null)
  const isNarrow = useMediaQuery('(max-width: 899px)')

  const highlight: Highlight | null =
    hover ?? (pinned ? { kind: 'category', category: pinned } : null)

  const select = (id: string) => {
    const next = selectedId === id ? null : id
    setSelectedId(next)
    // Deep-linkable commits: /timeline/#gpu-txn-db
    history.replaceState(
      null,
      '',
      next ? `#${next}` : window.location.pathname + window.location.search,
    )
  }

  const counts = useMemo(() => {
    const c = Object.fromEntries(CATEGORY_ORDER.map((cat) => [cat, 0])) as Record<
      Category,
      number
    >
    for (const e of timeline) c[e.category] += 1
    return c
  }, [])

  const selected = timeline.find((e) => e.id === selectedId) ?? null

  return (
    <Shell page="timeline">
      <header className="container page-header">
        <span className="file-tab">$ git log --graph --all</span>
        <h1>My history so far</h1>
        <p className="intro">
          Below is every job, degree, and detour I took since 2018.{' '}
          {isNarrow
            ? 'Tap on commits for details.'
            : 'Click on commits for details, hover a branch to trace it.'}
        </p>
      </header>

      <section className="container" aria-label="Interactive git-graph timeline">
        {isNarrow ? (
          <MobileTimeline
            branches={layout.branches}
            selectedId={selectedId}
            onSelect={select}
          />
        ) : (
          <div className="graph-grid">
            <div className="graph-col">
              <Legend
                counts={counts}
                pinned={pinned}
                onPin={setPinned}
                onHover={setHover}
              />
              <GitGraph
                layout={layout}
                selectedId={selectedId}
                onSelect={select}
                highlight={highlight}
                onHighlight={setHover}
              />
            </div>
            <CommitPanel entry={selected} />
          </div>
        )}
      </section>
    </Shell>
  )
}
