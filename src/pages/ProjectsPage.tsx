import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { Shell } from '../components/Shell'
import { Cover, TerminalBlock } from '../components/projects/Cover'
import { Schematic } from '../components/projects/Schematic'
import { TOPIC_COLORS, TOPIC_ORDER } from '../components/projects/topics'
import { useMediaQuery } from '../lib/useMediaQuery'
import {
  alsoShipped,
  projects,
  type Project,
  type Topic,
} from '../data/projects'
import './projects.css'

const VALID_IDS = new Set(projects.map((p) => p.id))

function initialSelection(): string | null {
  const fromHash = window.location.hash.slice(1)
  return VALID_IDS.has(fromHash) ? fromHash : null
}

/** The expanded README: bullets, the full visual, tech, and links. */
function Readme({ p }: { p: Project }) {
  const v = p.visual
  return (
    <article className="proj-readme" id={`readme-${p.id}`}>
      <header className="rd-chrome mono" aria-hidden="true">
        <span className="term-dot td-1" />
        <span className="term-dot td-2" />
        <span className="term-dot td-3" />
        <span className="rd-path">~/projects/{p.id}/README.md</span>
        <span className="rd-topic">{p.topic}</span>
      </header>

      <div className="rd-body">
        <ul className="rd-bullets">
          {p.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        {v.kind === 'shots' && (
          <div className="rd-shots">
            {v.shots.map((s) => (
              <img
                key={s.src}
                src={`/images/projects/${s.src}`}
                alt={s.alt}
                loading="lazy"
              />
            ))}
          </div>
        )}
        {v.kind === 'schematic' && (
          <figure className="rd-figure">
            <Schematic id={v.schematic} />
            <figcaption className="mono">{v.caption}</figcaption>
          </figure>
        )}
        {v.kind === 'figures' && (
          <figure className="rd-figure rd-figure-img">
            <img
              src={`/images/projects/${v.figure.src}`}
              alt={v.figure.alt}
              loading="lazy"
            />
            <figcaption className="mono">{v.caption}</figcaption>
          </figure>
        )}
        {v.kind === 'terminal' && (
          <div className="rd-term">
            <TerminalBlock title={v.title} lines={v.lines} />
          </div>
        )}

        <footer className="rd-foot">
          <span className="proj-tech">
            {p.tech.map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </span>
          <span className="rd-links mono">
            {p.writeup && <a href={p.writeup}>write-up →</a>}
            {p.repo ? (
              <a href={p.repo} target="_blank" rel="noreferrer">
                source ↗
              </a>
            ) : (
              <span className="rd-private">code on request</span>
            )}
          </span>
        </footer>
      </div>
    </article>
  )
}

export function ProjectsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelection)
  const [topic, setTopic] = useState<Topic | null>(null)
  // Must match the .proj-grid breakpoint: the README row slots in after a
  // ROW, and a row is two cards on desktop but one on mobile.
  const oneColumn = useMediaQuery('(max-width: 760px)')

  // Deep links (/projects/#uate-app) land on the opened README, not the top.
  useEffect(() => {
    if (initialSelection()) {
      document
        .querySelector('.proj-readme-row')
        ?.scrollIntoView({ block: 'start' })
    }
  }, [])

  const counts = useMemo(() => {
    const c = Object.fromEntries(TOPIC_ORDER.map((t) => [t, 0])) as Record<
      Topic,
      number
    >
    for (const p of projects) c[p.topic] += 1
    return c
  }, [])

  const visible = topic ? projects.filter((p) => p.topic === topic) : projects

  const select = (id: string) => {
    const next = selectedId === id ? null : id
    setSelectedId(next)
    // Deep-linkable readmes: /projects/#uate-app
    history.replaceState(
      null,
      '',
      next ? `#${next}` : window.location.pathname + window.location.search,
    )
  }

  const pickTopic = (t: Topic | null) => {
    setTopic(t)
    if (selectedId && t) {
      const sel = projects.find((p) => p.id === selectedId)
      if (sel && sel.topic !== t) select(selectedId) // deselect: it left the grid
    }
  }

  return (
    <Shell page="projects">
      <header className="container page-header">
        <span className="file-tab">~/projects</span>
        <h1>Side quests</h1>
        <p className="intro">
          Course builds and rabbit holes that got out of hand, plus one app
          with real users in production. Tap a card to open its README.
        </p>
      </header>

      <section className="container" aria-label="Projects">
        <div
          className="proj-filter mono"
          role="group"
          aria-label="Filter projects by topic"
        >
          <span className="proj-filter-cmd" aria-hidden="true">
            $ ls --topic=
          </span>
          <button
            type="button"
            className="proj-filter-chip"
            aria-pressed={topic === null}
            onClick={() => pickTopic(null)}
          >
            all <span className="proj-count">{projects.length}</span>
          </button>
          {TOPIC_ORDER.map((t) => (
            <button
              key={t}
              type="button"
              className="proj-filter-chip"
              style={{ ['--topic-color' as string]: TOPIC_COLORS[t] } as CSSProperties}
              aria-pressed={topic === t}
              onClick={() => pickTopic(topic === t ? null : t)}
            >
              <span className="proj-dot" aria-hidden="true" />
              {t} <span className="proj-count">{counts[t]}</span>
            </button>
          ))}
        </div>

        {/* The README row spans both columns, so it slots in after the
            selected card's ROW (not the card itself) to avoid a one-card
            row with a hole beside it. */}
        <ul className="proj-grid">
          {(() => {
            const selIdx = visible.findIndex((p) => p.id === selectedId)
            const readmeAfter =
              selIdx === -1
                ? -1
                : !oneColumn && selIdx % 2 === 0 && selIdx + 1 < visible.length
                  ? selIdx + 1
                  : selIdx
            return visible.flatMap((p, i) => {
              const open = p.id === selectedId
              const vars = {
                ['--d' as string]: `${90 + i * 55}ms`,
                ['--topic-color' as string]: TOPIC_COLORS[p.topic],
              } as CSSProperties
              const items = [
              <li
                key={p.id}
                className={open ? 'proj-card is-open' : 'proj-card'}
                style={vars}
              >
                <button
                  type="button"
                  className="proj-open"
                  aria-expanded={open}
                  aria-controls={`readme-${p.id}`}
                  onClick={() => select(p.id)}
                >
                  <Cover p={p} />
                  <span className="proj-body">
                    <span className="proj-head">
                      <span className="proj-name mono">{p.name}</span>
                      <span className="proj-toggle mono" aria-hidden="true">
                        {open ? '−' : '+'}
                      </span>
                    </span>
                    <span className="proj-desc">{p.blurb}</span>
                    <span className="proj-foot">
                      <span className="proj-topic mono">
                        <span className="proj-dot" aria-hidden="true" />
                        {p.topic}
                      </span>
                      <span className="proj-hint mono">
                        {open ? 'close readme' : 'open readme'}
                      </span>
                    </span>
                  </span>
                </button>
              </li>,
              ]
              if (selIdx !== -1 && i === readmeAfter) {
                const sel = visible[selIdx]
                items.push(
                  <li
                    key={`${sel.id}-readme`}
                    className="proj-readme-row"
                    style={
                      {
                        ['--topic-color' as string]: TOPIC_COLORS[sel.topic],
                      } as CSSProperties
                    }
                  >
                    <Readme p={sel} />
                  </li>,
                )
              }
              return items
            })
          })()}
        </ul>

        {alsoShipped.length > 0 && (
          <p className="proj-also mono">
            <span aria-hidden="true"># </span>also shipped:{' '}
            {alsoShipped.map((a, i) => (
              <span key={a.name}>
                {i > 0 && ' · '}
                <strong>{a.name}</strong>: {a.note}
              </span>
            ))}
          </p>
        )}
      </section>
    </Shell>
  )
}
