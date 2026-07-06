import type { CSSProperties } from 'react'
import { HobbyPhoto } from '../components/HobbyPhoto'
import { MiniGraph } from '../components/MiniGraph'
import { Shell } from '../components/Shell'
import { accolades, heroChips, heroIntro, hobbies } from '../data/about'
import './about.css'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties

/** Tints for pending-photo tiles, cycled per card. */
const PHOTO_TINTS = [
  'var(--c-work)',
  'var(--c-education)',
  'var(--c-research)',
  'var(--c-leadership)',
  'var(--amber)',
  'var(--mint)',
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
        <p className="intro">
          The parts of the week that don’t compile to anything — happily.
        </p>
        <ul className="hobby-grid">
          {hobbies.map((h, i) => (
            <li key={h.id}>
              <figure className="polaroid">
                <HobbyPhoto hobby={h} tint={PHOTO_TINTS[i % PHOTO_TINTS.length]} />
                <figcaption>
                  <strong>{h.name}</strong>
                  <span className="mono">{h.caption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  )
}
