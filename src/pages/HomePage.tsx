import { Fragment, type CSSProperties } from 'react'
import { MiniGraph } from '../components/MiniGraph'
import { Shell } from '../components/Shell'
import { Cover } from '../components/projects/Cover'
import { Schematic } from '../components/projects/Schematic'
import { TOPIC_COLORS } from '../components/projects/topics'
import {
  contact,
  hero,
  logIds,
  selectedProjectIds,
  skills,
  status,
} from '../data/home'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { research } from '../data/research'
import { timeline } from '../data/timeline'
import { formatRange } from '../lib/dates'
import { commitHashFor } from '../lib/hash'
import './home.css'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties
const vars = (v: Record<string, string>) => v as CSSProperties

const selected = selectedProjectIds.flatMap((id) => {
  const p = projects.find((x) => x.id === id)
  return p ? [p] : []
})

const log = logIds.flatMap((id) => {
  const e = timeline.find((x) => x.id === id)
  return e ? [e] : []
})

/** Display form of a URL: no scheme, no www, no trailing slash. */
const bare = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

export function HomePage() {
  return (
    <Shell page="home">
      <section className="container hero" aria-label="Introduction">
        <div className="hero-text">
          <span className="file-tab rise" style={d(0)}>
            README.md
          </span>
          <h1 className="rise" style={d(90)}>
            {profile.name}
            <span className="accent">.</span>
          </h1>
          <p className="hero-title mono rise" style={d(160)}>
            {hero.title}
          </p>
          {hero.intro.map((p, i) => (
            <p key={p} className="hero-p rise" style={d(230 + i * 80)}>
              {p}
            </p>
          ))}
          <ul className="hero-actions rise" style={d(400)}>
            <li>
              <a
                className="btn"
                href={profile.cvPath}
                download="Christian-Tabbah-CV.pdf"
              >
                <span aria-hidden="true">↓</span> Download CV
              </a>
            </li>
            <li>
              <a
                className="hero-link"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </li>
            {profile.linkedin && (
              <li>
                <a
                  className="hero-link"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
              </li>
            )}
            <li>
              <a className="hero-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
          </ul>

          {/* The working-tree status of the repo that is me. */}
          <section
            className="status rise"
            style={d(480)}
            aria-label="Availability"
          >
            <p className="status-cmd" aria-hidden="true">
              $ git status
            </p>
            <p className="status-summary">{status.summary}</p>
            <dl className="status-rows">
              {status.rows.map((r) => (
                <Fragment key={r.key}>
                  <dt>{r.key}:</dt>
                  <dd>{r.value}</dd>
                </Fragment>
              ))}
            </dl>
          </section>
        </div>
        <div className="hero-art rise" style={d(250)} aria-hidden="true">
          <MiniGraph />
        </div>
      </section>

      <section className="container home-sec" aria-labelledby="research-h">
        <div className="feat">
          <div className="feat-text">
            <span className="file-tab">~/research/{research.id}</span>
            <h2 id="research-h">{research.hook}</h2>
            <p className="feat-pitch">{research.pitch}</p>
            <dl className="feat-results mono">
              {research.headline.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="feat-links mono">
              <li>
                <a href="/research/">Full write-up →</a>
              </li>
              <li>
                <a href={research.paperPath}>Paper (PDF)</a>
              </li>
              <li>
                <a href={research.repo} target="_blank" rel="noreferrer">
                  Code ↗
                </a>
              </li>
            </ul>
          </div>
          <figure className="feat-figure">
            <Schematic id="egad" />
            <figcaption className="mono">{research.schematicCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="container home-sec" aria-labelledby="work-h">
        <span className="file-tab">~/projects/selected</span>
        <h2 id="work-h">Selected work</h2>
        <ol className="sel-list">
          {selected.map((p) => (
            <li
              key={p.id}
              className="sel-row"
              style={vars({ '--topic-color': TOPIC_COLORS[p.topic] })}
            >
              <a
                className="sel-cover"
                href={`/projects/#${p.id}`}
                tabIndex={-1}
                aria-hidden="true"
              >
                <Cover p={p} />
              </a>
              <div className="sel-body">
                <h3 className="sel-name mono">
                  <a href={`/projects/#${p.id}`}>{p.name}</a>
                </h3>
                <p className="sel-blurb">{p.blurb}</p>
                <p className="sel-meta">
                  <span className="sel-topic mono">
                    <span className="sel-dot" aria-hidden="true" />
                    {p.topic}
                  </span>
                  {p.tech.map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="home-more mono">
          <a href="/projects/">All projects →</a>
        </p>
      </section>

      <section className="container home-sec" aria-labelledby="log-h">
        <span className="file-tab">$ git log --oneline</span>
        <h2 id="log-h">Recent history</h2>
        <ol className="gl mono">
          {log.map((e) => (
            <li
              key={e.id}
              style={vars({ '--branch-color': `var(--c-${e.category})` })}
            >
              <a href={`/timeline/#${e.id}`}>
                <span className="gl-hash" aria-hidden="true">
                  {commitHashFor(e.id)}
                </span>
                <span className="gl-short">{e.short}</span>
                <span className="gl-range">{formatRange(e.start, e.end)}</span>
                <span className="gl-cat">
                  <span className="gl-dot" aria-hidden="true" />
                  {e.category}
                </span>
              </a>
            </li>
          ))}
        </ol>
        <p className="home-more mono">
          <a href="/timeline/">The full graph, 2018 to now →</a>
        </p>
      </section>

      <section className="container home-sec" aria-labelledby="skills-h">
        <span className="file-tab">SKILLS.md</span>
        <h2 id="skills-h">What I work with</h2>
        <dl className="skills">
          {skills.map((g) => (
            <div key={g.group}>
              <dt className="mono">{g.group}</dt>
              <dd>{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container home-sec" aria-labelledby="contact-h">
        <span className="file-tab">$ git remote -v</span>
        <h2 id="contact-h">{contact.heading}</h2>
        <p className="contact-note">{contact.note}</p>
        <ul className="remotes mono">
          <li>
            <span className="remote-name">email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          {profile.linkedin && (
            <li>
              <span className="remote-name">linkedin</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                {bare(profile.linkedin)}
              </a>
            </li>
          )}
          <li>
            <span className="remote-name">github</span>
            <a href={profile.github} target="_blank" rel="noreferrer">
              {bare(profile.github)}
            </a>
          </li>
          <li>
            <span className="remote-name">cv</span>
            <a href={profile.cvPath} download="Christian-Tabbah-CV.pdf">
              Christian-Tabbah-CV.pdf
            </a>
          </li>
        </ul>
      </section>
    </Shell>
  )
}
