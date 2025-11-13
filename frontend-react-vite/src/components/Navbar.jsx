/*
 * 🧭 NAVBAR.JSX - Barra de navegación
 * 
 * Componente simple que muestra información básica
 */

function Navbar({ totalItems }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        
        {/* 🏷️ LOGO/TÍTULO */}
        <span className="navbar-brand">
          <i className="bi bi-shop"></i>
          Tienda Online - React Vite
        </span>
        
        {/* 🛒 INDICADOR DEL CARRITO */}
        <div className="d-flex align-items-center text-white">
          <i className="bi bi-cart3 fs-4"></i>
          <span className="badge bg-warning text-dark ms-2">
            {totalItems}
          </span>
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar
