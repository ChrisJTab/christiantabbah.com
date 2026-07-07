import type { CSSProperties } from 'react'
import { Shell } from '../components/Shell'
import { projects } from '../data/projects'
import './projects.css'

/** Topic badge colors, drawn from the theme's branch palette. */
const TOPIC_COLORS: Record<string, string> = {
  mobile: 'var(--c-work)',
  'distributed systems': 'var(--c-education)',
  systems: 'var(--c-leadership)',
  networking: 'var(--c-research)',
  'machine learning': 'var(--accent)',
  'gpu systems': 'var(--primary)',
}

export function ProjectsPage() {
  return (
    <Shell page="projects">
      <header className="container page-header">
        <span className="file-tab">~/projects</span>
        <h1>Side quests</h1>
        <p className="intro">
          Course builds and rabbit holes that got out of hand. Repo links
          coming as I dust them off.
        </p>
      </header>

      <section className="container" aria-label="Projects">
        <ul className="proj-grid">
          {projects.map((p, i) => (
            <li
              key={p.id}
              className="proj-card"
              style={
                {
                  ['--d' as string]: `${90 + i * 60}ms`,
                  ['--topic-color' as string]:
                    TOPIC_COLORS[p.topic] ?? 'var(--primary)',
                } as CSSProperties
              }
            >
              <header className="proj-head">
                <h2 className="proj-name mono">{p.name}</h2>
                {p.repo && (
                  <a
                    className="proj-link mono"
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    source ↗
                  </a>
                )}
              </header>
              <p className="proj-desc">{p.description}</p>
              <footer className="proj-foot">
                <span className="proj-topic mono">
                  <span className="proj-dot" aria-hidden="true" />
                  {p.topic}
                </span>
                <span className="proj-tech">
                  {p.tech.map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  )
}
