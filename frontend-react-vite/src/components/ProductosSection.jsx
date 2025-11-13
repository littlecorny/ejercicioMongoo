/*
 * 🛍️ PRODUCTOS-SECTION.JSX - Sección de productos con conexión a base de datos
 * 
 * Este componente demuestra cómo los datos fluyen desde MongoDB
 * hasta la interfaz de usuario, y cómo enviar datos de vuelta.
 */

import { useState } from 'react'

function ProductosSection({ productos, loading, onAgregar, onCrearProducto, onRecargar }) {
  
  /*
   * 🎯 ESTADO LOCAL PARA EL FORMULARIO
   * 
   * Este estado NO está conectado a la base de datos directamente.
   * Solo maneja los datos del formulario antes de enviarlos.
   */
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    imagen: ''
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [enviando, setEnviando] = useState(false)

  /*
   * 📝 MANEJAR CAMBIOS EN EL FORMULARIO
   * 
   * Cada vez que el usuario escribe, actualizamos el estado local
   */
  const manejarCambio = (event) => {
    const { name, value } = event.target
    
    /*
     * 📚 EXPLICACIÓN DEL SPREAD OPERATOR (...):
     * 
     * ...nuevoProducto = copia todas las propiedades del objeto actual
     * [name]: value = sobrescribe la propiedad específica que cambió
     * 
     * Es como decir: "mantén todo igual, excepto esta propiedad"
     */
    setNuevoProducto(previo => ({
      ...previo,           // Copiar todo lo que había antes
      [name]: value        // Actualizar solo el campo que cambió
    }))
  }

  /*
   * 💾 ENVIAR PRODUCTO A LA BASE DE DATOS
   * 
   * Esta función toma los datos del formulario y los envía
   * al componente padre (App.jsx), que se encarga de la comunicación
   * con la base de datos.
   */
  const manejarEnvio = async (event) => {
    // Prevenir que el formulario recargue la página
    event.preventDefault()
    
    try {
      console.log('📤 Enviando producto a la base de datos:', nuevoProducto)
      
      setEnviando(true) // Mostrar indicador de carga
      
      /*
       * 🔄 LLAMADA A LA FUNCIÓN DEL PADRE
       * 
       * onCrearProducto es una función que viene del componente App.jsx
       * Esta función se encargará de:
       * 1. Hacer fetch() al backend
       * 2. El backend lo guardará en MongoDB
       * 3. Actualizar la lista de productos
       */
      const exito = await onCrearProducto({
        nombre: nuevoProducto.nombre.trim(),
        precio: parseFloat(nuevoProducto.precio),
        imagen: nuevoProducto.imagen.trim() || 'https://via.placeholder.com/150'
      })
      
      if (exito) {
        console.log('✅ Producto enviado exitosamente a MongoDB')
        
        // Limpiar formulario después del éxito
        setNuevoProducto({ nombre: '', precio: '', imagen: '' })
        setMostrarFormulario(false)
      }
      
    } catch (error) {
      console.error('❌ Error al enviar producto:', error)
      
    } finally {
      setEnviando(false) // Quitar indicador de carga
    }
  }

  return (
    <section className="mb-5">
      
      {/* 📋 ENCABEZADO DE LA SECCIÓN */}
      <div className="card">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <i className="bi bi-box-seam"></i>
            Productos desde MongoDB
          </h4>
          
          <div className="d-flex gap-2">
            {/* 🔄 BOTÓN RECARGAR */}
            <button 
              className="btn btn-light btn-sm"
              onClick={onRecargar}
              disabled={loading}
              title="Recargar productos desde la base de datos"
            >
              <i className="bi bi-arrow-clockwise"></i>
              {loading ? 'Cargando...' : 'Recargar'}
            </button>
            
            {/* ➕ BOTÓN AGREGAR */}
            <button 
              className="btn btn-warning btn-sm"
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >
              <i className="bi bi-plus-circle"></i>
              {mostrarFormulario ? 'Cancelar' : 'Agregar Producto'}
            </button>
          </div>
        </div>
        
        <div className="card-body">
          
          {/* 📝 FORMULARIO PARA CREAR PRODUCTOS */}
          {mostrarFormulario && (
            <div className="bg-light p-4 rounded mb-4">
              <h5>
                <i className="bi bi-plus-square"></i>
                Crear Nuevo Producto
              </h5>
              
              <form onSubmit={manejarEnvio}>
                <div className="row g-3">
                  
                  {/* 🏷️ CAMPO NOMBRE */}
                  <div className="col-md-4">
                    <label className="form-label">Nombre del Producto *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={nuevoProducto.nombre}
                      onChange={manejarCambio}
                      placeholder="Ej: Laptop Gaming"
                      required
                    />
                  </div>
                  
                  {/* 💰 CAMPO PRECIO */}
                  <div className="col-md-4">
                    <label className="form-label">Precio *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="precio"
                      value={nuevoProducto.precio}
                      onChange={manejarCambio}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  
                  {/* 🖼️ CAMPO IMAGEN */}
                  <div className="col-md-4">
                    <label className="form-label">URL de Imagen</label>
                    <input
                      type="url"
                      className="form-control"
                      name="imagen"
                      value={nuevoProducto.imagen}
                      onChange={manejarCambio}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                  
                </div>
                
                {/* 💾 BOTÓN GUARDAR */}
                <div className="mt-3">
                  <button 
                    type="submit"
                    className="btn btn-success"
                    disabled={enviando || !nuevoProducto.nombre || !nuevoProducto.precio}
                  >
                    {enviando ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2"></div>
                        Guardando en MongoDB...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-save"></i>
                        Guardar en Base de Datos
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* 📊 INFORMACIÓN SOBRE LOS DATOS */}
          <div className="alert alert-info">
            <i className="bi bi-info-circle"></i>
            <strong>Conexión con Base de Datos:</strong> Los productos que ves abajo vienen directamente 
            desde MongoDB. Cada vez que agregas uno nuevo, se guarda en la base de datos y la lista 
            se actualiza automáticamente.
          </div>
          
          {/* ⏳ INDICADOR DE CARGA */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando productos desde MongoDB...</span>
              </div>
              <p className="mt-3 text-muted">
                Consultando la base de datos...
              </p>
            </div>
          )}
          
          {/* 📦 LISTA DE PRODUCTOS */}
          {!loading && productos.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox fs-1"></i>
              <h5>No hay productos en la base de datos</h5>
              <p>Agrega el primer producto usando el botón de arriba</p>
            </div>
          )}
          
          {!loading && productos.length > 0 && (
            <div className="row g-3">
              {productos.map(producto => (
                <div key={producto._id} className="col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm">
                    
                    {/* 🖼️ IMAGEN DEL PRODUCTO */}
                    <img 
                      src={producto.imagen || 'https://via.placeholder.com/150'} 
                      className="card-img-top"
                      alt={producto.nombre}
                      style={{ 
                        height: '200px', 
                        objectFit: 'cover' 
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=Sin+Imagen'
                      }}
                    />
                    
                    <div className="card-body">
                      {/* 🏷️ NOMBRE */}
                      <h5 className="card-title">{producto.nombre}</h5>
                      
                      {/* 💰 PRECIO */}
                      <p className="card-text">
                        <span className="h4 text-success">
                          ${producto.precio?.toFixed(2)}
                        </span>
                      </p>
                      
                      {/* 🆔 ID DE MONGODB */}
                      <small className="text-muted d-block mb-3">
                        <i className="bi bi-database"></i>
                        ID: {producto._id}
                      </small>
                      
                      {/* 🛒 BOTÓN AGREGAR AL CARRITO */}
                      <button 
                        className="btn btn-primary w-100"
                        onClick={() => onAgregar(producto)}
                      >
                        <i className="bi bi-cart-plus"></i>
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </div>
    </section>
  )
}

export default ProductosSection

/*
 * 📚 CONCEPTOS CLAVE EN ESTE COMPONENTE:
 * 
 * 🔄 FLUJO DE DATOS CON BASE DE DATOS:
 *    1. App.jsx hace fetch() a /api/productos
 *    2. Backend consulta MongoDB y devuelve JSON
 *    3. App.jsx actualiza estado 'productos'
 *    4. Este componente recibe productos via props
 *    5. Se renderizan en pantalla automáticamente
 * 
 * 📝 FORMULARIOS CONTROLADOS:
 *    - useState para cada campo del formulario
 *    - onChange para actualizar estado en tiempo real
 *    - onSubmit para enviar datos al backend
 * 
 * ⏳ ESTADOS DE CARGA:
 *    - loading: cuando se cargan productos
 *    - enviando: cuando se crea un producto
 *    - Indicadores visuales para mejor UX
 * 
 * 🔄 COMUNICACIÓN PADRE-HIJO:
 *    - Props para recibir datos (productos, loading)
 *    - Callbacks para enviar acciones (onAgregar, onCrear)
 */
