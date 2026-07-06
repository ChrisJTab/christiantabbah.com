import { useState, type CSSProperties } from 'react'
import type { Hobby } from '../data/about'

/**
 * Photo card with two non-photo states:
 * - hobby.noPhoto set: a deliberate, permanent "no photo" tile (no request made)
 * - photo expected but missing: a "photo pending" tile until the file lands
 */
export function HobbyPhoto({ hobby, tint }: { hobby: Hobby; tint: string }) {
  const [missing, setMissing] = useState(false)

  if (hobby.noPhoto || missing) {
    return (
      <div
        className={`ph-fallback${hobby.noPhoto ? ' is-permanent' : ''}`}
        role="img"
        aria-label={hobby.noPhoto ? hobby.name : hobby.alt}
        style={{ ['--ph-tint' as string]: tint } as CSSProperties}
      >
        <span className="ph-name">{hobby.name}</span>
        <span className="ph-note mono">{`// ${hobby.noPhoto ?? 'photo pending'}`}</span>
      </div>
    )
  }

  return (
    <img
      src={`/images/hobbies/${hobby.img}`}
      alt={hobby.alt}
      loading="lazy"
      width="640"
      height="480"
      onError={() => setMissing(true)}
    />
  )
}
