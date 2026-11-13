import { useState } from 'react'
import type { ReleasePhoto } from '../data/releases'

/**
 * Photos under a release section. A listed photo whose file is not in
 * public/images/releases/<slug>/ yet shows a labelled placeholder in dev
 * and renders nothing in production, so a page can ship before its photos.
 */
export function ReleasePhotos({
  slug,
  photos,
}: {
  slug: string
  photos: ReleasePhoto[]
}) {
  return (
    <div className={`rel-photos n-${Math.min(photos.length, 3)}`}>
      {photos.map((p) => (
        <Photo key={p.src} slug={slug} photo={p} />
      ))}
    </div>
  )
}

function Photo({ slug, photo }: { slug: string; photo: ReleasePhoto }) {
  const [missing, setMissing] = useState(false)
  const src = `/images/releases/${slug}/${photo.src}`

  if (missing) {
    if (!import.meta.env.DEV) return null
    return (
      <figure className="rel-photo is-missing mono" role="note">
        <span>missing photo (dev only)</span>
        <span>public{src}</span>
      </figure>
    )
  }

  return (
    <figure className="rel-photo">
      <img
        src={src}
        alt={photo.alt}
        loading="lazy"
        style={photo.position ? { objectPosition: photo.position } : undefined}
        onError={() => setMissing(true)}
      />
      {photo.caption && <figcaption className="mono">{photo.caption}</figcaption>}
    </figure>
  )
}
