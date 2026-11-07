import type { Project } from '../../data/projects'
import { RPlaceCanvas, Schematic } from './Schematic'
import './covers.css'

export function TerminalBlock({
  title,
  lines,
  compact,
}: {
  title: string
  lines: string[]
  compact?: boolean
}) {
  return (
    <div className={compact ? 'term term-compact' : 'term'}>
      <div className="term-chrome" aria-hidden="true">
        <span className="term-dot td-1" />
        <span className="term-dot td-2" />
        <span className="term-dot td-3" />
        <span className="term-title">{title}</span>
      </div>
      <div className="term-lines mono">
        {lines.map((line, i) => (
          <div
            key={i}
            className={line.includes('$') ? 'term-cmd' : 'term-out'}
          >
            {line}
            {!compact && i === lines.length - 1 && (
              <span className="term-cursor" aria-hidden="true">
                ▮
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/** A project’s cover strip: screenshots, a schematic, or a terminal teaser.
    Shared by the Projects grid and the home page’s selected-work rows. */
export function Cover({ p }: { p: Project }) {
  const v = p.visual
  if (v.kind === 'shots') {
    // With a logo, the cover is a composed backdrop (icon tile + framed
    // phone) instead of cropped screenshots.
    if (v.logo) {
      const phone = v.shots[v.coverShot ?? 0]
      return (
        <div className="proj-cover proj-cover-app" aria-hidden="true">
          <img
            className="cover-logo"
            src={`/images/projects/${v.logo}`}
            alt=""
          />
          <img
            className="cover-phone"
            src={`/images/projects/${phone.src}`}
            alt=""
          />
        </div>
      )
    }
    return (
      <div className="proj-cover proj-cover-shots" aria-hidden="true">
        {v.shots.slice(0, 2).map((s) => (
          <img
            key={s.src}
            src={`/images/projects/${s.src}`}
            alt=""
            style={s.pos ? { objectPosition: s.pos } : undefined}
          />
        ))}
      </div>
    )
  }
  if (v.kind === 'figures') {
    return (
      <div className="proj-cover proj-cover-fig" aria-hidden="true">
        <img src={`/images/projects/${v.cover.src}`} alt="" />
      </div>
    )
  }
  if (v.kind === 'schematic') {
    if (v.pixelCover) {
      return (
        <div className="proj-cover proj-cover-px" aria-hidden="true">
          <RPlaceCanvas />
        </div>
      )
    }
    return (
      <div className="proj-cover proj-cover-sch">
        <Schematic id={v.schematic} />
      </div>
    )
  }
  return (
    <div className="proj-cover proj-cover-term" aria-hidden="true">
      <TerminalBlock title={v.title} lines={v.lines.slice(0, 5)} compact />
    </div>
  )
}
