import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FirebaseProvider } from './context/Firebase.jsx'
import CanvasProvider from './context/CanvasContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <FirebaseProvider>
        <CanvasProvider>
          <App />
        </CanvasProvider>
      </FirebaseProvider>
    </StrictMode>,
)
