import { useEffect, useState, type FormEvent } from 'react'
import type { Ctf } from '../data/releases'
import './ctf.css'

const solvedKey = (id: string) => `ctf-solved:${id}`

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join(
    '',
  )
}

function readSolved(id: string): boolean {
  try {
    return localStorage.getItem(solvedKey(id)) === '1'
  } catch {
    return false
  }
}

/**
 * Playable CTF challenges. The flag never ships: each guess is hashed in
 * the browser and compared with the SHA-256 in the data file. Solved
 * challenges are remembered per browser.
 */
export function CtfList({ intro, items }: { intro: string; items: Ctf[] }) {
  if (items.length === 0) return null
  return (
    <div className="ctf-list">
      <p>{intro}</p>
      <ol className="ctf-items">
        {items.map((c, i) => (
          <CtfCard key={c.id} ctf={c} n={i + 1} />
        ))}
      </ol>
    </div>
  )
}

type CheckState = 'idle' | 'checking' | 'right' | 'wrong'

function CtfCard({ ctf, n }: { ctf: Ctf; n: number }) {
  const [value, setValue] = useState('')
  const [state, setState] = useState<CheckState>('idle')
  const [solved, setSolved] = useState(false)
  const inputId = `flag-${ctf.id}`

  useEffect(() => {
    setSolved(readSolved(ctf.id))
  }, [ctf.id])

  async function check(e: FormEvent) {
    e.preventDefault()
    const guess = value.trim()
    if (!guess) return
    setState('checking')
    const ok = (await sha256Hex(guess)) === ctf.flagSha256.toLowerCase()
    setState(ok ? 'right' : 'wrong')
    if (ok) {
      setSolved(true)
      try {
        localStorage.setItem(solvedKey(ctf.id), '1')
      } catch {
        // Private mode or storage off: the result still shows, it just won’t stick.
      }
    }
  }

  return (
    <li className={`ctf${solved ? ' is-solved' : ''}`} id={`ctf-${ctf.id}`}>
      <header className="ctf-head">
        <span className="ctf-n mono" aria-hidden="true">
          {String(n).padStart(2, '0')}
        </span>
        <h3 className="ctf-title">{ctf.title}</h3>
        <span className="pill">{ctf.category}</span>
        {ctf.points !== undefined && <span className="pill">{ctf.points} pts</span>}
        {solved && <span className="ctf-solved mono">solved</span>}
      </header>

      {ctf.prompt.map((p) => (
        <p key={p}>{p}</p>
      ))}

      {ctf.files && ctf.files.length > 0 && (
        <ul className="ctf-files mono">
          {ctf.files.map((f) => (
            <li key={f.href}>
              <a href={f.href} download>
                <span aria-hidden="true">↓</span> {f.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {ctf.hints && ctf.hints.length > 0 && (
        <details className="ctf-details">
          <summary className="mono">hints ({ctf.hints.length})</summary>
          <ol className="ctf-hints">
            {ctf.hints.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ol>
        </details>
      )}

      <form className="ctf-form" onSubmit={check}>
        <label className="visually-hidden" htmlFor={inputId}>
          Flag for {ctf.title}
        </label>
        <input
          id={inputId}
          className="ctf-input mono"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setState('idle')
          }}
          placeholder="flag{...}"
          autoComplete="off"
          spellCheck={false}
        />
        <button className="btn" type="submit" disabled={state === 'checking'}>
          Check
        </button>
        <output className={`ctf-result mono is-${state}`} htmlFor={inputId}>
          {state === 'right' ? 'correct' : state === 'wrong' ? 'not it' : ''}
        </output>
      </form>

      <details className="ctf-details">
        <summary className="mono">show solution</summary>
        {ctf.solution.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </details>
    </li>
  )
}
