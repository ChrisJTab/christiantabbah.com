import type { CSSProperties } from 'react'
import { Shell } from '../components/Shell'
import { DesignDiagram } from '../components/projects/Schematic'
import { TOPIC_COLORS } from '../components/projects/topics'
import { designs, type DesignSection } from '../data/designs'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import '../components/projects/covers.css'
import './research.css'
import './design.css'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties

/** One `##` section of the notes, drawn by its kind. */
function Section({ s }: { s: DesignSection }) {
  switch (s.kind) {
    case 'parts':
      return (
        <>
          <h2>{s.heading}</h2>
          <p>{s.lead}</p>
          <ul className="paper-list">
            {s.items.map((it) => (
              <li key={it.title}>
                <strong>{it.title}</strong> {it.body}
              </li>
            ))}
          </ul>
          {s.diagram && (
            <figure className="design-figure">
              <div className="design-diagram">
                <DesignDiagram id={s.diagram.id} label={s.diagram.label} />
              </div>
              <figcaption className="mono">{s.diagram.caption}</figcaption>
            </figure>
          )}
        </>
      )
    case 'decisions':
      return (
        <>
          <h2>{s.heading}</h2>
          <p>{s.lead}</p>
          <ul className="dec-list">
            {s.items.map((it) => (
              <li key={it.choice} className="dec">
                <p className="dec-choice mono">
                  <span className="dec-hunk" aria-hidden="true">
                    @@{' '}
                  </span>
                  {it.choice}
                  <span className="dec-hunk" aria-hidden="true">
                    {' '}@@
                  </span>
                </p>
                <p className="dec-line dec-gain">
                  <span className="dec-sign" aria-hidden="true">
                    +
                  </span>
                  <span>
                    <span className="visually-hidden">Gained: </span>
                    {it.gain}
                  </span>
                </p>
                <p className="dec-line dec-cost">
                  <span className="dec-sign" aria-hidden="true">
                    −
                  </span>
                  <span>
                    <span className="visually-hidden">Cost: </span>
                    {it.cost}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </>
      )
    case 'measured':
      return (
        <>
          <h2>{s.heading}</h2>
          <div className="paper-table-wrap">
            <table className="paper-table">
              <thead>
                <tr>
                  <th scope="col">Test</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r) => (
                  <tr key={r.setting}>
                    <th scope="row">{r.setting}</th>
                    <td>
                      <span className="paper-value mono">{r.value}</span>
                      <span className="paper-note">{r.note}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {s.after.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </>
      )
    case 'ranked':
      return (
        <>
          <h2>{s.heading}</h2>
          <ol className="rank-list" role="list">
            {s.items.map((it) => (
              <li key={it.title}>
                <strong>{it.title}</strong> {it.body}
              </li>
            ))}
          </ol>
        </>
      )
    case 'list':
      return (
        <>
          <h2>{s.heading}</h2>
          <ul className="paper-list">
            {s.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </>
      )
    case 'compare':
      return (
        <>
          <h2>{s.heading}</h2>
          <p>{s.lead}</p>
          <div className="paper-table-wrap">
            <table className="paper-table compare-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visually-hidden">Part</span>
                  </th>
                  <th scope="col">{s.columns[0]}</th>
                  <th scope="col">{s.columns[1]}</th>
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r) => (
                  <tr key={r.part}>
                    <th scope="row">{r.part}</th>
                    <td>{r.before}</td>
                    <td>{r.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )
    case 'points':
      return (
        <>
          <h2>{s.heading}</h2>
          <ul className="paper-list">
            {s.items.map((it) => (
              <li key={it.title}>
                <strong>{it.title}</strong> {it.body}
              </li>
            ))}
          </ul>
          {s.after && <p className="design-credit">{s.after}</p>}
        </>
      )
  }
}

export function DesignPage({ slug }: { slug: string }) {
  const doc = designs.find((x) => x.slug === slug)

  if (!doc) {
    return (
      <Shell page="projects">
        <header className="container page-header">
          <span className="file-tab">$ git show projects/{slug}</span>
          <h1>No such design notes</h1>
          <p className="intro">
            <a href="/projects/">Back to the projects</a>
          </p>
        </header>
      </Shell>
    )
  }

  const project = projects.find((p) => p.id === doc.projectId)
  const topic = {
    ['--topic-color' as string]: project ? TOPIC_COLORS[project.topic] : 'var(--primary)',
  } as CSSProperties

  return (
    <Shell page="projects">
      <header className="container page-header">
        <span className="file-tab rise" style={d(0)}>
          {doc.command}
        </span>
        <h1 className="rise" style={d(90)}>
          {doc.title}
        </h1>
        <p className="paper-meta mono rise" style={d(160)}>
          {doc.meta}
        </p>
        <p className="intro rise" style={d(230)}>
          {doc.intro}
        </p>
        <ul className="paper-actions rise" style={d(300)}>
          <li>
            <a
              className="btn"
              href={`mailto:${profile.email}?subject=${encodeURIComponent('The ' + (project?.name ?? doc.slug) + ' code')}`}
            >
              Ask me for the code
            </a>
          </li>
          <li>
            <a className="paper-link" href={`/projects/#${doc.projectId}`}>
              <span aria-hidden="true">←</span> All projects
            </a>
          </li>
        </ul>
      </header>

      <section className="container" aria-label="Design notes">
        <article className="paper design" style={topic}>
          <header className="paper-chrome mono" aria-hidden="true">
            <span className="paper-dot pd-1" />
            <span className="paper-dot pd-2" />
            <span className="paper-dot pd-3" />
            <span className="paper-path">{doc.path}</span>
            <span className="paper-branch">{doc.branch}</span>
          </header>

          <div className="paper-body">
            {doc.sections.map((s) => (
              <Section key={s.heading} s={s} />
            ))}
          </div>
        </article>
      </section>
    </Shell>
  )
}
