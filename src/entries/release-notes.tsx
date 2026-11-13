import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../fonts'
import '../styles/tokens.css'
import '../styles/base.css'
import { ReleaseNotesPage } from '../pages/ReleaseNotesPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReleaseNotesPage />
  </StrictMode>,
)
