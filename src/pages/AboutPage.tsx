import type { CSSProperties } from 'react'
import { MiniGraph } from '../components/MiniGraph'
import { Shell } from '../components/Shell'
import { accolades, heroChips, heroIntro, hobbies } from '../data/about'
import { commitHashFor } from '../lib/hash'
import './about.css'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties

/** Node colors along the hobby log, cycled per entry. */
const NODE_TINTS = [
  'var(--c-education)',
  'var(--c-work)',
  'var(--c-research)',
  'var(--c-leadership)',
  'var(--mint)',
  'var(--amber)',
]

export function AboutPage() {
  return (
    <Shell page="about">
      <section className="container hero" aria-label="Introduction">
        <div className="hero-text">
          <span className="file-tab rise" style={d(0)}>
            README.md
          </span>
          <h1 className="rise" style={d(90)}>
            Hi, I’m Christian<span className="accent">.</span>
          </h1>
          {heroIntro.map((p, i) => (
            <p key={p} className="hero-p rise" style={d(180 + i * 90)}>
              {p}
            </p>
          ))}
          <ul className="hero-chips rise" style={d(380)}>
            {heroChips.map((c) => (
              <li key={c} className="pill">
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-art rise" style={d(250)} aria-hidden="true">
          <MiniGraph />
        </div>
      </section>

      <section className="container about-sec" aria-labelledby="milestones-h">
        <span className="file-tab">$ git tag --list</span>
        <h2 id="milestones-h">Milestones, tagged</h2>
        <ul className="tag-list">
          {accolades.map((a) => (
            <li key={a.id} className="tag-row">
              <code className="tag-chip">{a.tag}</code>
              <div>
                <strong>{a.title}</strong>
                <p className="tag-detail">{a.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container about-sec" aria-labelledby="hobbies-h">
        <span className="file-tab">~/off-the-clock</span>
        <h2 id="hobbies-h">Off the clock</h2>
        <ol className="hobby-log">
          {hobbies.map((h, i) => (
            <li
              key={h.id}
              className={h.photos.length > 0 ? 'has-photo' : undefined}
              style={
                {
                  ['--branch-color' as string]: NODE_TINTS[i % NODE_TINTS.length],
                } as CSSProperties
              }
            >
              <span className="hl-node" aria-hidden="true" />
              <div className="hl-body">
                <div className="hl-head">
                  <h3>{h.name}</h3>
                  <span className="hl-hash mono" aria-hidden="true">
                    {commitHashFor(h.id)}
                  </span>
                </div>
                <p className="hl-desc">{h.description}</p>
              </div>
              {h.photos.length > 0 && (
                <figure
                  className={`hl-photo${h.photos.length === 4 ? ' is-quad' : ''}`}
                >
                  {h.photos.map((p) => (
                    <img
                      key={p.src}
                      src={`/images/hobbies/${p.src}`}
                      alt={p.alt}
                      loading="lazy"
                      style={p.position ? { objectPosition: p.position } : undefined}
                    />
                  ))}
                </figure>
              )}
            </li>
          ))}
        </ol>
      </section>
    </Shell>
  )
}
