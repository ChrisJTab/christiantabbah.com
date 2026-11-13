import { Fragment, type CSSProperties } from 'react'
import { CtfList } from '../components/CtfList'
import { ReleasePhotos } from '../components/ReleasePhotos'
import { Shell } from '../components/Shell'
import {
  CHANGE_LABELS,
  CHANGE_MARKS,
  releases,
  versionOf,
  type ChangeKind,
} from '../data/releases'
import { formatYM } from '../lib/dates'
import './releaseNotes.css'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties

/** Changelog groups render in this order; empty kinds are skipped. */
const KIND_ORDER: ChangeKind[] = ['added', 'changed', 'fixed', 'known']

export function ReleasePage({ slug }: { slug: string }) {
  const r = releases.find((x) => x.slug === slug && !x.draft)

  if (!r) {
    return (
      <Shell page="releases">
        <header className="container page-header">
          <span className="file-tab">$ git show {slug}</span>
          <h1>No such release</h1>
          <p className="intro">
            <a href="/release-notes/">Back to the release notes</a>
          </p>
        </header>
      </Shell>
    )
  }

  const version = versionOf(r)
  const groups = KIND_ORDER.map((kind) => ({
    kind,
    lines: r.changelog.filter((c) => c.kind === kind),
  })).filter((g) => g.lines.length > 0)

  return (
    <Shell page="releases">
      <header className="container page-header">
        <span className="file-tab rise" style={d(0)}>
          $ git show {version}
        </span>
        <h1 className="rise" style={d(90)}>
          {r.title}
        </h1>
        <p className="rel-meta mono rise" style={d(160)}>
          <span className="rel-tag">{version}</span> · {formatYM(r.date)}
          {r.place && ` · ${r.place}`}
        </p>
        <p className="intro rise" style={d(230)}>
          {r.intro}
        </p>
      </header>

      <section className="container" aria-label="Changelog">
        <article className="chlog">
          <header className="chlog-chrome mono" aria-hidden="true">
            <span className="chlog-dot d-1" />
            <span className="chlog-dot d-2" />
            <span className="chlog-dot d-3" />
            <span className="chlog-path">~/release-notes/{r.slug}/CHANGELOG.md</span>
            <span className="chlog-tag">tagged {version}</span>
          </header>
          <div className="chlog-body">
            <p className="chlog-h mono" aria-hidden="true">
              ## [{version}] · {r.date}
            </p>
            {groups.map((g) => (
              <section
                key={g.kind}
                className={`chlog-group ck-${g.kind}`}
                aria-labelledby={`ck-${g.kind}`}
              >
                <h2 id={`ck-${g.kind}`} className="chlog-kind">
                  {CHANGE_LABELS[g.kind]}
                </h2>
                <ul className="chlog-lines">
                  {g.lines.map((c) => (
                    <li key={c.text}>
                      <span className="ck-mark" aria-hidden="true">
                        {CHANGE_MARKS[g.kind]}
                      </span>
                      {c.text}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="container rel-story" aria-label="The story">
        {r.sections.map((s) => (
          <section key={s.heading} className="rel-sec">
            <h2>{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {s.photos && s.photos.length > 0 && (
              <ReleasePhotos slug={r.slug} photos={s.photos} />
            )}
            {s.ctfs && <CtfList intro={s.ctfs.intro} items={s.ctfs.items} />}
          </section>
        ))}

        {r.links && r.links.length > 0 && (
          <p className="rel-links mono">
            See also:{' '}
            {r.links.map((l, i) => (
              <Fragment key={l.href}>
                {i > 0 && ' · '}
                <a href={l.href}>{l.label}</a>
              </Fragment>
            ))}
          </p>
        )}
        <p className="rel-back mono">
          <a href="/release-notes/">← All release notes</a>
        </p>
      </section>
    </Shell>
  )
}
