import { profile } from '../data/profile'

export function Footer() {
  const hash = __COMMIT_HASH__
  const commitUrl =
    profile.repoUrl && hash !== 'dev' ? `${profile.repoUrl}/commit/${hash}` : null

  return (
    <footer className="site-footer">
      <div className="container footer-inner mono">
        <p>
          © {new Date().getFullYear()} Christian Tabbah ·{' '}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        {/* Easter egg: the site knows which commit it was built from. */}
        <p className="footer-hash">
          <span aria-hidden="true">*</span> built from{' '}
          {commitUrl ? (
            <a href={commitUrl} target="_blank" rel="noreferrer">
              {hash}
            </a>
          ) : (
            <span>{hash}</span>
          )}{' '}
          on main — no uncommitted changes
        </p>
      </div>
    </footer>
  )
}
