import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/home.css'
import './styles/pages.css'
import './styles/character-detail.css'
import './styles/article.css'
import './styles/steam-lp.css'
import './styles/list-pages.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
