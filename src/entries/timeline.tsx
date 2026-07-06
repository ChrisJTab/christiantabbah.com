import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../fonts'
import '../styles/tokens.css'
import '../styles/base.css'
import { TimelinePage } from '../pages/TimelinePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TimelinePage />
  </StrictMode>,
)
