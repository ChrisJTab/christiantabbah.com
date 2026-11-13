import type { CSSProperties } from 'react'
import { Shell } from '../components/Shell'
import {
  CHANGE_LABELS,
  CHANGE_MARKS,
  index,
  shipped,
  versionOf,
} from '../data/releases'
import { formatYM } from '../lib/dates'
import './releaseNotes.css'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties

/** How many changelog lines each index entry previews. */
const PREVIEW_LINES = 3

export function ReleaseNotesPage() {
  return (
    <Shell page="releases">
      <header className="container page-header">
        <span className="file-tab rise" style={d(0)}>
          CHANGELOG.md
        </span>
        <h1 className="rise" style={d(90)}>
          Release notes
        </h1>
        <p className="intro rise" style={d(160)}>
          {index.intro}
        </p>
      </header>

      <section className="container" aria-label="Releases">
        <ol className="rel-index">
          {shipped.map((r, i) => {
            const href = `/release-notes/${r.slug}/`
            return (
              <li key={r.slug} className="rel-entry rise" style={d(230 + i * 70)}>
                <p className="rel-version mono">
                  <span className="rel-tag">{versionOf(r)}</span>
                  <span>
                    {formatYM(r.date)}
                    {r.place && ` · ${r.place}`}
                  </span>
                </p>
                <h2 className="rel-entry-title">
                  <a href={href}>{r.title}</a>
                </h2>
                <p className="rel-summary">{r.summary}</p>
                <ul className="rel-preview mono">
                  {r.changelog.slice(0, PREVIEW_LINES).map((c) => (
                    <li key={c.text} className={`ck-${c.kind}`}>
                      <span className="ck-mark" aria-hidden="true">
                        {CHANGE_MARKS[c.kind]}
                      </span>
                      <span className="ck-kind">{CHANGE_LABELS[c.kind]}</span>
                      {c.text}
                    </li>
                  ))}
                </ul>
                <p className="rel-more mono">
                  <a href={href}>Read the release notes →</a>
                </p>
              </li>
            )
          })}
        </ol>
      </section>
    </Shell>
  )
}
