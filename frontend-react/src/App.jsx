/*
 * 🚀 APP.JSX - Configuración de rutas principales
 * 
 * Este archivo solo maneja:
 * - Configuración de rutas
 * - Layout general de la aplicación
 * - Providers globales (futuro: Context, Theme, etc.)
 */

import React from 'react'
import './App.css'

// Importamos las páginas
import Home from './pages/Home.jsx'

// Para futuras rutas, instalaríamos React Router:
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  /*
   * 📋 VERSIÓN SIMPLE (Sin React Router)
   * 
   * Por ahora solo mostramos la página Home.
   * En el futuro podríamos agregar más páginas.
   */

  return (
    <div className="App">
      {/* 🏠 Página principal */}
      <Home />
    </div>
  )

  /*
   * 🛣️ VERSIÓN CON REACT ROUTER (Futuro)
   * 
   * Descomenta esto cuando quieras agregar más páginas:
   * 
   * return (
   *   <Router>
   *     <div className="App">
   *       <Routes>
   *         <Route path="/" element={<Home />} />
   *         <Route path="/productos" element={<ProductosPage />} />
   *         <Route path="/pedidos" element={<PedidosPage />} />
   *         <Route path="/admin" element={<AdminPage />} />
   *       </Routes>
   *     </div>
   *   </Router>
   * )
   */
}

export default App

/*
 * 📚 VENTAJAS DE ESTA ESTRUCTURA:
 * 
 * 1. SEPARACIÓN DE RESPONSABILIDADES:
 *    - App.jsx = Rutas y configuración
 *    - Home.jsx = Lógica de negocio
 * 
 * 2. ESCALABILIDAD:
 *    - Fácil agregar nuevas páginas
 *    - Rutas organizadas en un lugar
 * 
 * 3. MANTENIMIENTO:
 *    - Código más organizado
 *    - Componentes con responsabilidades claras
 * 
 * 4. TESTING:
 *    - Testear páginas independientemente
 *    - Mock de rutas más sencillo
 */
