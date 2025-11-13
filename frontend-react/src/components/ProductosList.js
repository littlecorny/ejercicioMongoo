/*
 * 🛍️ COMPONENTE PRODUCTOS LIST
 * 
 * Maneja la lista de productos y el formulario de creación.
 * Conceptos clave:
 * - Estado local con useState
 * - Manejo de formularios
 * - Comunicación con componente padre via props
 * - Renderizado de listas
 */

import React, { useState } from 'react';

function ProductosList({ productos, loading, onCrearProducto, onEditarProducto, onEliminarProducto, onAgregarAlCarrito }) {
  // 🎯 ESTADO LOCAL DEL COMPONENTE
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: 0,
    imagen: ''
  });
  const [editandoProducto, setEditandoProducto] = useState(null);

  // 📝 MANEJAR CAMBIOS EN EL FORMULARIO
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ ENVIAR FORMULARIO
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productoData = {
      nombre: formData.nombre.trim(),
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock) || 0,
      activo: true,
      imagen: formData.imagen.trim() || undefined
    };

    if (editandoProducto) {
      await onEditarProducto(editandoProducto, productoData);
      setEditandoProducto(null);
    } else {
      await onCrearProducto(productoData);
    }

    // Limpiar formulario
    setFormData({ nombre: '', precio: '', stock: 0, imagen: '' });
  };

  // ✏️ PREPARAR EDICIÓN
  const prepararEdicion = (producto) => {
    setFormData({
      nombre: producto.nombre,
      precio: producto.precio.toString(),
      stock: producto.stock,
      imagen: producto.imagen || ''
    });
    setEditandoProducto(producto._id);
  };

  // ❌ CANCELAR EDICIÓN
  const cancelarEdicion = () => {
    setFormData({ nombre: '', precio: '', stock: 0, imagen: '' });
    setEditandoProducto(null);
  };

  return (
    <section id="productos" className="mb-5">
      <div className="card">
        <div className="card-header bg-success text-white">
          <h3 className="card-title mb-0">
            <i className="bi bi-box-seam"></i>
            Gestión de Productos
          </h3>
        </div>
        <div className="card-body">
          
          {/* 📝 FORMULARIO DE PRODUCTOS */}
          <div className="mb-4">
            <h5>
              <i className="bi bi-plus-circle"></i>
              {editandoProducto ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h5>
            
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Nombre del Producto *</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Laptop Gaming"
                  required
                />
              </div>
              
              <div className="col-md-2">
                <label className="form-label">Precio ($) *</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  placeholder="999.99"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="col-md-2">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="10"
                  min="0"
                />
              </div>
              
              <div className="col-md-4">
                <label className="form-label">URL de Imagen (opcional)</label>
                <input
                  type="url"
                  className="form-control"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleInputChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              
              <div className="col-12">
                <div className="form-text mb-3">
                  💡 Deja vacío el campo imagen para usar el placeholder automático
                </div>
                <button type="submit" className="btn btn-success me-2">
                  <i className="bi bi-plus-lg"></i>
                  {editandoProducto ? 'Actualizar Producto' : 'Crear Producto'}
                </button>
                
                {editandoProducto && (
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={cancelarEdicion}
                  >
                    <i className="bi bi-x-lg"></i>
                    Cancelar Edición
                  </button>
                )}
              </div>
            </form>
          </div>

          <hr />

          {/* 📋 LISTA DE PRODUCTOS */}
          <h5>
            <i className="bi bi-list-ul"></i>
            Catálogo de Productos
          </h5>

          {/* 🔄 ESTADO DE CARGA */}
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2">Cargando productos...</p>
            </div>
          ) : (
            <div className="row">
              {/* 📦 RENDERIZAR LISTA DE PRODUCTOS */}
              {productos.length === 0 ? (
                <div className="col-12">
                  <div className="alert alert-info text-center">
                    <h5>No hay productos</h5>
                    <p>Crea tu primer producto usando el formulario.</p>
                  </div>
                </div>
              ) : (
                productos.map(producto => (
                  <div key={producto._id} className="col-md-6 col-lg-4 mb-3">
                    <div className="card h-100 fade-in">
                      
                      {/* 🖼️ IMAGEN DEL PRODUCTO */}
                      <div className={`producto-imagen ${!producto.imagen ? 'placeholder' : ''}`}>
                        {producto.imagen ? (
                          <img src={producto.imagen} alt={producto.nombre} />
                        ) : (
                          <>
                            <i className="bi bi-image"></i>
                            <br />
                            <small>Sin imagen</small>
                          </>
                        )}
                      </div>
                      
                      {/* 📄 INFORMACIÓN DEL PRODUCTO */}
                      <div className="card-body">
                        <h5>{producto.nombre}</h5>
                        <div className="precio-tag mb-2">
                          ${producto.precio.toFixed(2)}
                        </div>
                        
                        <div className="mb-2">
                          <small>Stock: {producto.stock} unidades</small>
                        </div>
                        
                        <div className="mb-3">
                          <span className={`badge ${producto.activo ? 'bg-success' : 'bg-secondary'}`}>
                            {producto.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                        
                        {/* 🔘 BOTONES DE ACCIÓN */}
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-success"
                            onClick={() => onAgregarAlCarrito(producto)}
                            disabled={producto.stock === 0 || !producto.activo}
                          >
                            🛒 Agregar al Carrito
                          </button>
                          
                          <div className="btn-group">
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => prepararEdicion(producto)}
                            >
                              ✏️ Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => onEliminarProducto(producto._id, producto.nombre)}
                            >
                              🗑️ Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductosList;

/*
 * 📚 CONCEPTOS REACT APRENDIDOS:
 * 
 * 1. ESTADO LOCAL: useState para manejar el formulario
 * 2. CONTROLLED COMPONENTS: inputs controlados por React
 * 3. EVENT HANDLING: onChange, onSubmit, onClick
 * 4. CONDITIONAL RENDERING: {condition ? true : false}
 * 5. LISTS & KEYS: map() con key única
 * 6. PROPS FUNCTIONS: comunicación hacia el componente padre
 * 7. DESTRUCTURING: extraer propiedades de objetos/eventos
 */
