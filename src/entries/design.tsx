import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../fonts'
import '../styles/tokens.css'
import '../styles/base.css'
import { DesignPage } from '../pages/DesignPage'

// Every projects/<slug>/index.html shares this entry; the HTML names its
// design notes on the root element: <div id="root" data-design="<slug>">.
const root = document.getElementById('root')!
const slug = root.dataset.design ?? ''

createRoot(root).render(
  <StrictMode>
    <DesignPage slug={slug} />
  </StrictMode>,
)
