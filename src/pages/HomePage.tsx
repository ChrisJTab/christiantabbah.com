import { Fragment, useEffect, type CSSProperties } from 'react'
import { Shell } from '../components/Shell'
import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from '../components/SocialIcons'
import { Cover } from '../components/projects/Cover'
import { Schematic } from '../components/projects/Schematic'
import { TOPIC_COLORS } from '../components/projects/topics'
import {
  contact,
  hero,
  selectedProjectIds,
  skills,
  stack,
} from '../data/home'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { research } from '../data/research'
import './home.css'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties
const vars = (v: Record<string, string>) => v as CSSProperties

const selected = selectedProjectIds.flatMap((id) => {
  const p = projects.find((x) => x.id === id)
  return p ? [p] : []
})

/** Skill items of up to three words ("PCIe and DMA") stay on one line;
    longer phrases wrap like prose. */
const isKeyword = (item: string) => item.split(' ').length <= 3

/** Display form of a URL: no scheme, no www, no trailing slash. */
const bare = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

/** The arrow at the foot of a screen, named for the section it leads to.
    It only shows where the page snaps screen by screen (see home.css). */
function Next({
  to,
  label,
  className,
  style,
}: {
  to: string
  label: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <a
      className={className ? 'next ' + className : 'next'}
      style={style}
      href={'#' + to}
    >
      {label}
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M8 2.5v10.5M3.75 8.75 8 13l4.25-4.25" />
      </svg>
    </a>
  )
}

export function HomePage() {
  // The page renders after load, too late for the browser's own jump to a
  // link like /#research, so make the jump once the screens exist.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <Shell page="home">
      {/* Four screens: the README, the research, selected work, and
          contact. On laptop and desktop windows each one fills the window
          and scrolling snaps between them. */}
      <section className="screen" aria-label="Introduction">
        <div className="container readme">
          <span className="file-tab readme-tab rise" style={d(0)}>
            README.md
          </span>

          <div className="readme-intro">
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
                  className="social-chip social-chip-lg"
                  href={profile.github}
                  aria-label="GitHub"
                  title="GitHub"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon />
                </a>
              </li>
              {profile.linkedin && (
                <li>
                  <a
                    className="social-chip social-chip-lg"
                    href={profile.linkedin}
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon />
                  </a>
                </li>
              )}
              <li>
                <a className="hero-link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>

          <section
            className="stack rise"
            style={d(250)}
            aria-labelledby="stack-h"
          >
            <h2 id="stack-h" className="readme-h">
              {stack.heading}
            </h2>
            <dl className="stack-rows">
              {skills.map((g) => (
                <div key={g.group}>
                  <dt className="mono">{g.group}</dt>
                  <dd>
                    <ul className="stack-items">
                      {g.items.map((item) => (
                        <Fragment key={item}>
                          <li className={isKeyword(item) ? 'keep' : undefined}>
                            {item}
                          </li>{' '}
                        </Fragment>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
            <a className="stack-more mono" href="/timeline/">
              {stack.more}
            </a>
          </section>
        </div>
        <Next to="research" label="research" className="rise" style={d(640)} />
      </section>

      <section id="research" className="screen" aria-labelledby="research-h">
        <div className="container home-sec">
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
        </div>
        <Next to="work" label="selected work" />
      </section>

      <section id="work" className="screen" aria-labelledby="work-h">
        <div className="container home-sec">
          <span className="file-tab">~/projects/selected</span>
          <div className="sel-head">
            <h2 id="work-h">Selected work</h2>
            <a className="mono" href="/projects/">
              All projects →
            </a>
          </div>
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
        </div>
        <Next to="contact" label="contact" />
      </section>

      <section
        id="contact"
        className="screen screen-last"
        aria-labelledby="contact-h"
      >
        <div className="container home-sec">
          <span className="file-tab">$ git remote -v</span>
          <h2 id="contact-h">{contact.heading}</h2>
          <p className="contact-note">{contact.note}</p>
          <ul className="remotes mono">
            <li>
              <MailIcon />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            {profile.linkedin && (
              <li>
                <LinkedInIcon />
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  {bare(profile.linkedin)}
                </a>
              </li>
            )}
            <li>
              <GitHubIcon />
              <a href={profile.github} target="_blank" rel="noreferrer">
                {bare(profile.github)}
              </a>
            </li>
            <li>
              <DownloadIcon />
              <a href={profile.cvPath} download="Christian-Tabbah-CV.pdf">
                Christian-Tabbah-CV.pdf
              </a>
            </li>
          </ul>
        </div>
      </section>
    </Shell>
  )
}
