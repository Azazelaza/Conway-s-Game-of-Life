import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/App.css'
import App from './App.tsx'
import { GameProvider } from './context/GameContext.tsx'
import { ControlProvider } from './context/ControlContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <ControlProvider>
        <App />
      </ControlProvider>
    </GameProvider>
  </StrictMode>,
)
