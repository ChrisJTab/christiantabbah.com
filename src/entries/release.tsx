import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../fonts'
import '../styles/tokens.css'
import '../styles/base.css'
import { ReleasePage } from '../pages/ReleasePage'

// Every release-notes/<slug>/index.html shares this entry; the HTML names
// its release on the root element: <div id="root" data-release="<slug>">.
const root = document.getElementById('root')!
const slug = root.dataset.release ?? ''

createRoot(root).render(
  <StrictMode>
    <ReleasePage slug={slug} />
  </StrictMode>,
)
