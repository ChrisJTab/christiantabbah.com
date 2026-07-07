import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../fonts'
import '../styles/tokens.css'
import '../styles/base.css'
import { ProjectsPage } from '../pages/ProjectsPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectsPage />
  </StrictMode>,
)
