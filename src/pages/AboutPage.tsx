import type { CSSProperties } from 'react'
import { BucketList } from '../components/BucketList'
import { Shell } from '../components/Shell'
import { accolades, heroChips, heroIntro, hobbies } from '../data/about'
import { bucketList } from '../data/bucketList'
import { commitHashFor } from '../lib/hash'
import './about.css'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties

/** Node colors along the hobby log, cycled per entry. */
const NODE_TINTS = [
  'var(--c-education)',
  'var(--c-work)',
  'var(--c-research)',
  'var(--c-leadership)',
  'var(--accent)',
  'var(--primary)',
]

export function AboutPage() {
  const done = bucketList.filter((i) => i.done).length

  return (
    <Shell page="about">
      <section className="container about-hero" aria-label="Introduction">
        <span className="file-tab rise" style={d(0)}>
          ~/about
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
      </section>

      <section className="container about-sec" aria-labelledby="milestones-h">
        <span className="file-tab">$ git tag --list</span>
        <h2 id="milestones-h">Milestones</h2>
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

      <section className="container about-sec" id="todo" aria-labelledby="todo-h">
        <span className="file-tab">TODO.md</span>
        <h2 id="todo-h">The bucket list</h2>
        <p className="intro">
          Things to do before I run out of runtime. {done} of {bucketList.length}{' '}
          merged so far.
        </p>
        <BucketList />
      </section>
    </Shell>
  )
}
