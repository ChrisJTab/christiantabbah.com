import { useEffect, type ReactNode } from 'react'
import { profile } from '../data/profile'
import { Footer } from './Footer'
import { Nav, type PageId } from './Nav'
import './shell.css'

export function Shell({ page, children }: { page: PageId; children: ReactNode }) {
  useEffect(() => {
    const amber = getComputedStyle(document.documentElement)
      .getPropertyValue('--amber')
      .trim()
    const mono = 'font-family: ui-monospace, monospace'
    // For fellow console-openers.
    console.log(
      `%c*  ${__COMMIT_HASH__} (HEAD -> you) opened the dev tools\n` +
        `%c|\n` +
        `|  hi! this site is a static Vite + React build. no trackers, no backend.\n` +
        `|  say hello: ${profile.email}\n` +
        `|\n` +
        `*  2018-06 the log starts at /timeline/`,
      `${mono}; color: ${amber}`,
      mono,
    )
  }, [])

  return (
    <>
      <a className="skip-link mono" href="#main">
        Skip to content
      </a>
      <Nav page={page} />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
