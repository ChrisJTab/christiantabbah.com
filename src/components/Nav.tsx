import { profile } from '../data/profile'
import { ThemeToggle } from './ThemeToggle'

export type PageId = 'about' | 'timeline' | 'bucket-list'

const LINKS: { id: PageId; href: string; label: string }[] = [
  { id: 'about', href: '/', label: 'About' },
  { id: 'timeline', href: '/timeline/', label: 'Timeline' },
  { id: 'bucket-list', href: '/bucket-list/', label: 'Bucket List' },
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
        <nav aria-label="Main">
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={l.href} aria-current={page === l.id ? 'page' : undefined}>
                  {l.label}
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
          <a className="btn" href={profile.cvPath} download="Christian-Tabbah-CV.pdf">
            <span aria-hidden="true">↓</span> Download CV
          </a>
        </div>
      </div>
    </header>
  )
}
