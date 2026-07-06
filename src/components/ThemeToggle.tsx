import { useState } from 'react'
import { syncThemeColor } from '../lib/themeColor'

type Mode = 'light' | 'dark'

/** The inline <head> script sets data-theme before React mounts. */
function currentMode(): Mode {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>(currentMode)
  const next: Mode = mode === 'dark' ? 'light' : 'dark'

  const flip = () => {
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
    setMode(next)
    requestAnimationFrame(syncThemeColor)
  }

  return (
    <button
      type="button"
      className="social-chip theme-toggle"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      onClick={flip}
    >
      {mode === 'dark' ? (
        /* sun */
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <circle cx="8" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="8" y1="0.8" x2="8" y2="2.6" />
            <line x1="8" y1="13.4" x2="8" y2="15.2" />
            <line x1="0.8" y1="8" x2="2.6" y2="8" />
            <line x1="13.4" y1="8" x2="15.2" y2="8" />
            <line x1="2.9" y1="2.9" x2="4.2" y2="4.2" />
            <line x1="11.8" y1="11.8" x2="13.1" y2="13.1" />
            <line x1="2.9" y1="13.1" x2="4.2" y2="11.8" />
            <line x1="11.8" y1="4.2" x2="13.1" y2="2.9" />
          </g>
        </svg>
      ) : (
        /* moon */
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path
            d="M 13.4 10.1 A 5.8 5.8 0 1 1 5.9 2.6 A 4.6 4.6 0 0 0 13.4 10.1 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}
