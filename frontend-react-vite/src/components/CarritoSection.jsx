/*
 * 🛒 CARRITO-SECTION.JSX - Sección del carrito de compras
 * 
 * Este componente maneja solo estado local (sin base de datos).
 * Es un buen contraste para entender diferentes tipos de estado.
 */

function CarritoSection({ carrito, onEliminar }) {
  
  /*
   * 💰 CALCULAR TOTAL DEL CARRITO
   * 
   * Esta función calcula el total sumando precio × cantidad de cada producto.
   * Se ejecuta en cada render, pero es eficiente porque es un cálculo simple.
   */
  const calcularTotal = () => {
    return carrito.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad)
    }, 0)
  }

  const calcularTotalItems = () => {
    return carrito.reduce((total, producto) => {
      return total + producto.cantidad
    }, 0)
  }

  return (
    <section className="mt-5">
      <div className="card">
        
        {/* 📋 ENCABEZADO */}
        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <i className="bi bi-cart3"></i>
            Carrito de Compras
          </h4>
          <span className="badge bg-primary">
            {calcularTotalItems()} items
          </span>
        </div>
        
        <div className="card-body">
          
          {/* 📊 INFORMACIÓN SOBRE EL ESTADO LOCAL */}
          <div className="alert alert-warning">
            <i className="bi bi-info-circle"></i>
            <strong>Estado Local:</strong> El carrito se guarda solo en la memoria del navegador. 
            Si recargas la página, se pierde. Esto demuestra la diferencia entre estado local 
            y datos persistentes en base de datos.
          </div>
          
          {/* 🛒 CARRITO VACÍO */}
          {carrito.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-cart-x fs-1"></i>
              <h5>Carrito vacío</h5>
              <p>Agrega productos desde la sección de arriba</p>
            </div>
          )}
          
          {/* 📦 PRODUCTOS EN EL CARRITO */}
          {carrito.length > 0 && (
            <>
              <div className="row g-3 mb-4">
                {carrito.map(producto => (
                  <div key={producto._id} className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row align-items-center">
                          
                          {/* 🖼️ IMAGEN MINIATURA */}
                          <div className="col-auto">
                            <img 
                              src={producto.imagen || 'https://via.placeholder.com/60'} 
                              alt={producto.nombre}
                              className="rounded"
                              style={{ 
                                width: '60px', 
                                height: '60px', 
                                objectFit: 'cover' 
                              }}
                            />
                          </div>
                          
                          {/* 📝 INFORMACIÓN DEL PRODUCTO */}
                          <div className="col">
                            <h6 className="mb-1">{producto.nombre}</h6>
                            <p className="mb-1">
                              <span className="text-success">
                                ${producto.precio.toFixed(2)}
                              </span>
                              {' × '}
                              <span className="badge bg-secondary">
                                {producto.cantidad}
                              </span>
                            </p>
                            <small className="text-muted">
                              Subtotal: ${(producto.precio * producto.cantidad).toFixed(2)}
                            </small>
                          </div>
                          
                          {/* 🗑️ BOTÓN ELIMINAR */}
                          <div className="col-auto">
                            <button 
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => onEliminar(producto._id)}
                              title="Eliminar del carrito"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 💰 TOTAL */}
              <div className="card bg-light">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="mb-0">Total del Carrito:</h5>
                    </div>
                    <div className="col-auto">
                      <h3 className="text-success mb-0">
                        ${calcularTotal().toFixed(2)}
                      </h3>
                    </div>
                  </div>
                  
                  {/* 💳 BOTÓN COMPRAR (SIMULADO) */}
                  <div className="mt-3">
                    <button 
                      className="btn btn-success w-100"
                      onClick={() => {
                        alert(`¡Compra simulada por $${calcularTotal().toFixed(2)}!\n\nEn una app real, aquí enviarías los datos del pedido a la base de datos.`)
                      }}
                    >
                      <i className="bi bi-credit-card"></i>
                      Proceder al Pago (Simulado)
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          
        </div>
      </div>
    </section>
  )
}

export default CarritoSection

/*
 * 📚 DIFERENCIAS CLAVE: ESTADO LOCAL vs BASE DE DATOS
 * 
 * 🛒 CARRITO (Estado Local):
 *    ✅ Rápido: Sin latencia de red
 *    ✅ Simple: No necesita backend
 *    ❌ Temporal: Se pierde al recargar
 *    ❌ Individual: Solo el usuario actual
 * 
 * 🛍️ PRODUCTOS (Base de Datos):
 *    ✅ Persistente: Se mantiene entre sesiones
 *    ✅ Compartido: Todos los usuarios lo ven
 *    ❌ Latencia: Necesita peticiones HTTP
 *    ❌ Complejo: Requiere backend y DB
 * 
 * 💡 CUÁNDO USAR CADA UNO:
 *    - Estado Local: UI temporal, preferencias, formularios
 *    - Base de Datos: Datos importantes, compartidos, persistentes
 */
