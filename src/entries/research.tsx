import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../fonts'
import '../styles/tokens.css'
import '../styles/base.css'
import { ResearchPage } from '../pages/ResearchPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResearchPage />
  </StrictMode>,
)
