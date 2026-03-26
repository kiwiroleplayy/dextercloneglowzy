import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

      <App />
      <Toaster />

  </React.StrictMode>,
)