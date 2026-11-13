import { profile } from '../data/profile'
import { ThemeToggle } from './ThemeToggle'

export type PageId = 'home' | 'research' | 'projects' | 'releases' | 'timeline' | 'about'

/** `short` swaps in below 900px, where six tabs share one row. */
const LINKS: { id: PageId; href: string; label: string; short?: string }[] = [
  { id: 'home', href: '/', label: 'Home' },
  { id: 'research', href: '/research/', label: 'Research' },
  { id: 'projects', href: '/projects/', label: 'Projects' },
  { id: 'releases', href: '/release-notes/', label: 'Release notes', short: 'Releases' },
  { id: 'timeline', href: '/timeline/', label: 'Timeline' },
  { id: 'about', href: '/about/', label: 'About' },
]

/** Icon links rendered as mono chips: on-theme and unambiguous. */
const SOCIALS: { label: string; glyph: string; url: string | null }[] = [
  { label: 'GitHub', glyph: 'gh', url: profile.github },
  { label: 'LinkedIn', glyph: 'in', url: profile.linkedin },
  { label: 'Instagram', glyph: 'ig', url: profile.instagram },
]

export function Nav({ page }: { page: PageId }) {
  return (
    <header className="site-nav">
      <div className="container nav-inner">
        <a className="logo" href="/">
          christian tabbah<span className="logo-dot">.</span>
        </a>
        <nav aria-label="Main" className="nav-main">
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={l.href} aria-current={page === l.id ? 'page' : undefined}>
                  {l.short ? (
                    <>
                      <span className="nav-long">{l.label}</span>
                      <span className="nav-short" aria-hidden="true">
                        {l.short}
                      </span>
                    </>
                  ) : (
                    l.label
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-side">
          {SOCIALS.filter((s) => s.url !== null).map((s) => (
            <a
              key={s.label}
              className="social-chip mono"
              href={s.url!}
              aria-label={s.label}
              title={s.label}
              target="_blank"
              rel="noreferrer"
            >
              {s.glyph}
            </a>
          ))}
          <ThemeToggle />
          <a
            className="btn"
            href={profile.cvPath}
            download="Christian-Tabbah-CV.pdf"
            aria-label="Download CV"
          >
            <span aria-hidden="true">↓</span>
            <span className="btn-label">Download CV</span>
            <span className="btn-label-short" aria-hidden="true">
              CV
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
