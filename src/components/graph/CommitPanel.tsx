import type { TimelineEntry } from '../../data/timeline'
import { CommitCard } from './CommitCard'

export function CommitPanel({ entry }: { entry: TimelineEntry | null }) {
  return (
    <aside
      id="commit-panel"
      className="commit-box commit-panel"
      aria-label="Commit details"
      aria-live="polite"
    >
      {entry ? (
        // Keyed so the swap animation replays on each selection.
        <CommitCard key={entry.id} entry={entry} />
      ) : (
        <p className="panel-empty mono">
          $ git show <span className="cursor" aria-hidden="true">▎</span>
          <br />
          <span className="muted">select a commit on the graph</span>
        </p>
      )}
    </aside>
  )
}
