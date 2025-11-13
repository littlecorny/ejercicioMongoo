/*
 * 🚀 MAIN.JSX - Punto de entrada principal
 * 
 * Este es el archivo principal que monta React en el DOM.
 * Similar al index.js pero con nomenclatura más moderna.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import App from './App.jsx'

// Crear root para React 18
const root = ReactDOM.createRoot(document.getElementById('root'))

// Renderizar aplicación principal
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

/*
 * 📚 DIFERENCIAS CON INDEX.JS:
 * 
 * 1. NOMENCLATURA: main.jsx vs index.js (más moderno)
 * 2. EXTENSIÓN: .jsx indica que contiene JSX
 * 3. FUNCIONALIDAD: Exactamente igual
 */
