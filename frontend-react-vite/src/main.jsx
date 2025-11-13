/*
 * 🚀 MAIN.JSX - Punto de entrada de la aplicación Vite
 * 
 * Este es EL ARCHIVO MÁS IMPORTANTE del proyecto.
 * Aquí React se "monta" en el DOM del navegador.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/*
 * 🎯 MONTAJE DE LA APLICACIÓN REACT
 * 
 * 1. Obtenemos el elemento HTML con id="root"
 * 2. Creamos un "root" de React 18 
 * 3. Renderizamos nuestro componente <App />
 */

// 1️⃣ OBTENER EL ELEMENTO ROOT DEL HTML
const rootElement = document.getElementById('root')

// 2️⃣ CREAR EL ROOT DE REACT 18
const root = ReactDOM.createRoot(rootElement)

// 3️⃣ RENDERIZAR LA APLICACIÓN
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

/*
 * 📚 EXPLICACIÓN DETALLADA:
 * 
 * 🔍 React.StrictMode:
 *    - Detecta problemas en desarrollo
 *    - Ejecuta efectos dos veces para encontrar bugs
 *    - NO afecta la aplicación en producción
 * 
 * 🔍 ReactDOM.createRoot():
 *    - Nueva API de React 18
 *    - Reemplaza a ReactDOM.render()
 *    - Habilita funciones concurrentes
 * 
 * 🔍 import './index.css':
 *    - Vite procesa automáticamente el CSS
 *    - Se aplicará globalmente a toda la app
 */
