import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../fonts'
import '../styles/tokens.css'
import '../styles/base.css'
import { BucketListPage } from '../pages/BucketListPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BucketListPage />
  </StrictMode>,
)
