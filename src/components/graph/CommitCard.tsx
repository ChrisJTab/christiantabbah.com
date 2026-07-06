import { TIMELINE_NOW, type TimelineEntry } from '../../data/timeline'
import { durationLabel, formatRange, formatYM } from '../../lib/dates'
import { commitHashFor, seededInt } from '../../lib/hash'
import { fileForSkill } from '../../lib/skillFiles'

/** The "commit view": shared by the desktop side panel and mobile inline panels. */
export function CommitCard({ entry }: { entry: TimelineEntry }) {
  const plusCounts = entry.skills.map((s) => seededInt(entry.id + s, 3, 7))
  const insertions = plusCounts.reduce((a, b) => a + b, 0)

  return (
    <article className="commit-card" data-category={entry.category}>
      <header className="c-head mono">
        <span className="c-label">commit</span>{' '}
        <span className="c-hash">{commitHashFor(entry.id)}</span>
        {entry.refName && (
          <span className="ref-pill" data-head={entry.head ? '' : undefined}>
            {entry.head ? 'HEAD → ' : ''}
            {entry.refName}
          </span>
        )}
      </header>
      <h2 className="c-title">{entry.role}</h2>
      <dl className="c-meta mono">
        <div>
          <dt>Author:</dt>
          <dd>Christian Tabbah</dd>
        </div>
        <div>
          <dt>Date:</dt>
          <dd>
            {formatRange(entry.start, entry.end)} ·{' '}
            {durationLabel(entry.start, entry.end, TIMELINE_NOW)}
          </dd>
        </div>
        <div>
          <dt>Branch:</dt>
          <dd className="c-branch">{entry.category}</dd>
        </div>
      </dl>
      <ul className="c-bullets">
        {entry.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      {entry.skills.length > 0 && (
        <footer className="c-diff mono">
          <p className="c-diff-head">
            {entry.skills.length} skill{entry.skills.length === 1 ? '' : 's'} changed,{' '}
            {insertions} insertions(+)
          </p>
          <ul className="c-diff-lines">
            {entry.skills.map((s, i) => (
              <li key={s} className="diff-line">
                <span className="diff-file" aria-hidden="true">
                  {fileForSkill(s)} <span className="diff-bar">| {'+'.repeat(plusCounts[i])}</span>
                </span>
                <span className="diff-note">{`// ${s}`}</span>
              </li>
            ))}
          </ul>
        </footer>
      )}
      {entry.end === 'ongoing' ? (
        <p className="c-status c-open mono">
          <span className="open-dot" aria-hidden="true" /> open branch — still
          committing
        </p>
      ) : (
        <p className="c-status c-merged mono">
          <span aria-hidden="true">●</span> merged into main · {formatYM(entry.end)}
        </p>
      )}
    </article>
  )
}
