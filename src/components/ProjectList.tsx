import { projects } from '../data/projects'

/** Pinned-repos-style rows (deliberately a list, not a card grid). */
export function ProjectList() {
  return (
    <ol className="repo-list">
      {projects.map((p) => (
        <li key={p.id} className="repo-row">
          <span className="repo-name mono">
            {p.repo ? (
              <a href={p.repo} target="_blank" rel="noreferrer">
                {p.name}
              </a>
            ) : (
              p.name
            )}
          </span>
          <span className="repo-blurb">{p.blurb}</span>
          <span className="repo-tech">
            {p.tech.map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </span>
        </li>
      ))}
    </ol>
  )
}
