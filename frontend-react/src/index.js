/*
 * 🚀 PUNTO DE ENTRADA DE LA APLICACIÓN REACT
 * 
 * Este archivo es el punto de entrada de nuestra app React.
 * Aquí se monta el componente App en el DOM.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Importamos Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// 🎯 MONTAJE DE LA APLICACIÓN
// Obtenemos el elemento root del HTML y montamos nuestra app React
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
 * 📚 CONCEPTOS REACT PARA ALUMNOS:
 * 
 * - ReactDOM.createRoot(): Crea un "root" donde se renderiza la app
 * - React.StrictMode: Modo estricto que ayuda a detectar problemas
 * - JSX: Sintaxis que combina JavaScript con HTML
 * - Componentes: Piezas reutilizables de UI
 * - Props: Datos que se pasan entre componentes
 * - State: Datos que cambian y re-renderizan la UI
 * - Hooks: Funciones que permiten usar estado en componentes funcionales
 */
