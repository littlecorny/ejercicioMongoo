/*
 * 🛒 COMPONENTE CARRITO
 * 
 * Maneja el carrito de compras y la creación de pedidos.
 * Conceptos:
 * - Cálculos derivados del estado
 * - Renderizado condicional
 * - Manejo de eventos
 */

import React from 'react';

function Carrito({ 
  carrito, 
  cliente, 
  onClienteChange, 
  onCambiarCantidad, 
  onQuitarDelCarrito, 
  onLimpiarCarrito, 
  onCrearPedido 
}) {
  // 💰 CALCULAR TOTAL DEL CARRITO
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <section id="carrito" className="mb-4">
      <div className="card h-100">
        <div className="card-header bg-warning text-dark">
          <h4 className="card-title mb-0">
            <i className="bi bi-cart3"></i>
            Carrito de Compras
            <span className="badge bg-danger ms-2">{totalItems}</span>
          </h4>
        </div>
        
        <div className="card-body">
          {/* 👤 CAMPO DE CLIENTE */}
          <div className="mb-3">
            <label className="form-label">Nombre del Cliente *</label>
            <input
              type="text"
              className="form-control"
              value={cliente}
              onChange={(e) => onClienteChange(e.target.value)}
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>
          
          {/* 🛒 ITEMS DEL CARRITO */}
          <div className="mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {carrito.length === 0 ? (
              // 🔄 CARRITO VACÍO
              <div className="text-muted text-center py-4">
                <i className="bi bi-cart-x fs-1"></i>
                <p>Carrito vacío<br />Agrega productos desde la lista</p>
              </div>
            ) : (
              // 📋 LISTA DE PRODUCTOS EN EL CARRITO
              carrito.map(item => (
                <div key={item.producto} className="carrito-item fade-in">
                  <div className="d-flex align-items-center">
                    
                    {/* 🖼️ IMAGEN MINIATURA */}
                    <div className="flex-shrink-0 me-3">
                      <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        background: '#f8f9fa', 
                        borderRadius: '0.375rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        {item.imagen ? (
                          <img 
                            src={item.imagen} 
                            alt={item.nombre} 
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover', 
                              borderRadius: '0.375rem' 
                            }} 
                          />
                        ) : (
                          <i className="bi bi-image text-muted"></i>
                        )}
                      </div>
                    </div>
                    
                    {/* 📝 INFORMACIÓN DEL ITEM */}
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.nombre}</h6>
                      <small className="text-muted">${item.precio.toFixed(2)} c/u</small>
                      
                      {/* 🔢 CONTROLES DE CANTIDAD */}
                      <div className="d-flex align-items-center mt-1">
                        <button
                          className="btn btn-outline-secondary btn-sm me-2"
                          onClick={() => onCambiarCantidad(item.producto, item.cantidad - 1)}
                        >
                          -
                        </button>
                        
                        <span className="me-2">{item.cantidad}</span>
                        
                        <button
                          className="btn btn-outline-secondary btn-sm me-2"
                          onClick={() => onCambiarCantidad(item.producto, item.cantidad + 1)}
                        >
                          +
                        </button>
                        
                        <strong className="text-success">
                          ${(item.precio * item.cantidad).toFixed(2)}
                        </strong>
                        
                        <button
                          className="btn btn-outline-danger btn-sm ms-auto"
                          onClick={() => onQuitarDelCarrito(item.producto)}
                          title="Eliminar"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 💰 TOTAL Y ACCIONES */}
          <div className="border-top pt-3">
            <div className="d-flex justify-content-between mb-3">
              <h5>Total:</h5>
              <h5 className="text-success">${total.toFixed(2)}</h5>
            </div>
            
            <button
              className="btn btn-primary w-100 mb-2"
              onClick={onCrearPedido}
              disabled={carrito.length === 0 || !cliente.trim()}
            >
              <i className="bi bi-check-circle"></i>
              Crear Pedido
            </button>
            
            <button
              className="btn btn-outline-secondary w-100"
              onClick={onLimpiarCarrito}
              disabled={carrito.length === 0}
            >
              <i className="bi bi-trash"></i>
              Limpiar Carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carrito;

/*
 * 📚 CONCEPTOS APRENDIDOS:
 * 
 * 1. CÁLCULOS DERIVADOS: total calculado a partir del estado
 * 2. RENDERIZADO CONDICIONAL: mostrar contenido según condiciones
 * 3. EVENT HANDLERS: onClick, onChange
 * 4. DISABLED STATE: botones deshabilitados según condiciones
 * 5. INLINE STYLES: estilos dinámicos en JSX
 * 6. MAP CON KEY: renderizar listas correctamente
 * 7. DESTRUCTURING PROPS: extraer props del objeto
 */
