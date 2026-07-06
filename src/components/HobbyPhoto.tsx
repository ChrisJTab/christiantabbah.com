import { useState, type CSSProperties } from 'react'
import type { Hobby } from '../data/about'

/**
 * Photo card that degrades gracefully: until a real photo lands in
 * public/images/hobbies/, a tinted "pending" tile keeps the grid designed.
 */
export function HobbyPhoto({ hobby, tint }: { hobby: Hobby; tint: string }) {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <div
        className="ph-fallback"
        role="img"
        aria-label={hobby.alt}
        style={{ ['--ph-tint' as string]: tint } as CSSProperties}
      >
        <span className="ph-name">{hobby.name}</span>
        <span className="ph-note mono">{'// photo pending'}</span>
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
