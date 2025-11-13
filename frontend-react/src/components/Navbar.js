/*
 * 🧭 COMPONENTE NAVBAR
 * 
 * Este componente maneja la barra de navegación superior.
 * Aprenderás:
 * - Componentes funcionales
 * - Props (propiedades)
 * - Renderizado condicional
 */

import React from 'react';

// 📝 DEFINICIÓN DEL COMPONENTE
// Los componentes en React son funciones que retornan JSX
function Navbar({ carritoCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <a className="navbar-brand" href="#inicio">
          <i className="bi bi-shop"></i>
          Tienda Online React
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#productos">Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#carrito">
                Carrito
                {/* 🔢 RENDERIZADO CONDICIONAL: Solo muestra el badge si hay items */}
                {carritoCount > 0 && (
                  <span className="badge bg-danger ms-1">{carritoCount}</span>
                )}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#pedidos">Pedidos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#tecnologias">Tecnologías</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#desarrollador">Desarrollador</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

/*
 * 📚 CONCEPTOS APRENDIDOS:
 * 
 * 1. PROPS: carritoCount se pasa desde el componente padre (App)
 * 2. JSX: Mezcla de JavaScript y HTML
 * 3. RENDERIZADO CONDICIONAL: {condition && <element>}
 * 4. EXPRESIONES: {variable} para mostrar valores dinámicos
 * 5. EXPORT/IMPORT: Modularización de componentes
 */
