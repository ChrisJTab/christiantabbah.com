import type { CSSProperties } from 'react'
import { Shell } from '../components/Shell'
import { research } from '../data/research'
import './research.css'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties

export function ResearchPage() {
  const r = research
  return (
    <Shell page="research">
      <header className="container page-header">
        <span className="file-tab rise" style={d(0)}>
          $ git show research/gpu-txn-db
        </span>
        <h1 className="rise" style={d(90)}>
          {r.title}
        </h1>
        <p className="paper-meta mono rise" style={d(160)}>
          {r.meta}
        </p>
        <p className="intro rise" style={d(230)}>
          {r.intro}
        </p>
        <ul className="paper-actions rise" style={d(300)}>
          <li>
            <a className="btn" href={r.paperPath}>
              <span aria-hidden="true">↓</span> Read the paper (PDF)
            </a>
          </li>
          <li>
            <a
              className="paper-link"
              href={r.repo}
              target="_blank"
              rel="noreferrer"
            >
              Code on GitHub ↗
            </a>
          </li>
          <li>
            <a
              className="paper-link"
              href={r.upstream.href}
              target="_blank"
              rel="noreferrer"
            >
              Built on {r.upstream.label} ↗
            </a>
          </li>
        </ul>
      </header>

      <section className="container" aria-label="Write-up">
        <article className="paper">
          <header className="paper-chrome mono" aria-hidden="true">
            <span className="paper-dot pd-1" />
            <span className="paper-dot pd-2" />
            <span className="paper-dot pd-3" />
            <span className="paper-path">~/research/{r.id}/README.md</span>
            <span className="paper-branch">merged into main · Oct 2026</span>
          </header>

          <div className="paper-body">
            <h2>The problem</h2>
            {r.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}

            <h2>What I built</h2>
            <ul className="paper-list">
              {r.built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <figure className="paper-figure">
              <img
                src={r.architecture.src}
                alt={r.architecture.alt}
                loading="lazy"
              />
              <figcaption className="mono">{r.architecture.caption}</figcaption>
            </figure>

            <h2>Results</h2>
            <p className="paper-hw mono">{r.hardware}</p>
            <div className="paper-table-wrap">
              <table className="paper-table">
                <thead>
                  <tr>
                    <th scope="col">Setting</th>
                    <th scope="col">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {r.results.map((row) => (
                    <tr key={row.setting}>
                      <th scope="row">{row.setting}</th>
                      <td>
                        <span className="paper-value mono">{row.value}</span>
                        <span className="paper-note">{row.note}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>{r.resultsNote}</p>
            <figure className="paper-figure">
              <img src={r.writeback.src} alt={r.writeback.alt} loading="lazy" />
              <figcaption className="mono">{r.writeback.caption}</figcaption>
            </figure>

            <h2>The hard parts</h2>
            <ul className="paper-list">
              {r.hardParts.map((h) => (
                <li key={h.title}>
                  <strong>{h.title}</strong> {h.body}
                </li>
              ))}
            </ul>

            <h2>Where it falls short</h2>
            <ul className="paper-list">
              {r.limits.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>

            <h2>Open questions</h2>
            <ul className="paper-list">
              {r.open.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>

            <h2>Status</h2>
            {r.status.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </article>
      </section>
    </Shell>
  )
}
