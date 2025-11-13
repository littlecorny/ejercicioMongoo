/*
 * 📋 COMPONENTE PEDIDOS LISTA
 * 
 * Muestra el historial de pedidos realizados.
 * Conceptos:
 * - Renderizado de listas complejas
 * - Formateo de fechas
 * - Estados visuales
 */

import React from 'react';

function PedidosList({ pedidos, onEliminarPedido, onActualizarPedido }) {
  
  // 📅 FORMATEAR FECHA
  const formatearFecha = (fecha) => {
    try {
      return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Fecha inválida';
    }
  };

  // 🎨 OBTENER CLASE CSS SEGÚN ESTADO
  const getEstadoClase = (estado) => {
    const estados = {
      'pendiente': 'bg-warning text-dark',
      'preparando': 'bg-info text-white',
      'listo': 'bg-success text-white',
      'entregado': 'bg-secondary text-white'
    };
    return estados[estado] || 'bg-secondary text-white';
  };

  // 🔄 SIGUIENTE ESTADO
  const siguienteEstado = (estadoActual) => {
    const secuencia = ['pendiente', 'preparando', 'listo', 'entregado'];
    const indiceActual = secuencia.indexOf(estadoActual);
    return indiceActual < secuencia.length - 1 ? secuencia[indiceActual + 1] : estadoActual;
  };

  return (
    <section id="pedidos" className="mb-4">
      <div className="card h-100">
        <div className="card-header bg-success text-white">
          <h4 className="card-title mb-0">
            <i className="bi bi-clipboard-check"></i>
            Pedidos Realizados
            <span className="badge bg-light text-dark ms-2">{pedidos.length}</span>
          </h4>
        </div>
        
        <div className="card-body p-0">
          {pedidos.length === 0 ? (
            // 🔄 NO HAY PEDIDOS
            <div className="text-muted text-center py-5">
              <i className="bi bi-clipboard-x fs-1"></i>
              <p>No hay pedidos realizados<br />Crea tu primer pedido</p>
            </div>
          ) : (
            // 📋 LISTA DE PEDIDOS
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {pedidos.map(pedido => (
                <div key={pedido._id} className="pedido-card border-bottom p-3">
                  
                  {/* 📊 ENCABEZADO DEL PEDIDO */}
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="mb-1">
                        <i className="bi bi-person-circle"></i>
                        {pedido.cliente}
                      </h6>
                      <small className="text-muted">
                        <i className="bi bi-calendar"></i>
                        {formatearFecha(pedido.fecha)}
                      </small>
                    </div>
                    
                    <div className="text-end">
                      <span className={`badge ${getEstadoClase(pedido.estado)} mb-1`}>
                        {pedido.estado}
                      </span>
                      <div className="text-success">
                        <strong>${pedido.total.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>

                  {/* 📦 PRODUCTOS DEL PEDIDO */}
                  <div className="productos-pedido">
                    {pedido.productos.map((item, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center py-1">
                        <span className="text-truncate me-2">
                          {item.nombre}
                        </span>
                        <small className="text-muted">
                          {item.cantidad} x ${item.precio.toFixed(2)}
                        </small>
                      </div>
                    ))}
                  </div>

                  {/* 🔧 ACCIONES DEL PEDIDO */}
                  <div className="acciones-pedido mt-3 d-flex gap-2">
                    
                    {/* ⏭️ AVANZAR ESTADO */}
                    {pedido.estado !== 'entregado' && (
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => onActualizarPedido(
                          pedido._id, 
                          { estado: siguienteEstado(pedido.estado) }
                        )}
                        title={`Cambiar a ${siguienteEstado(pedido.estado)}`}
                      >
                        <i className="bi bi-arrow-right-circle"></i>
                        Avanzar Estado
                      </button>
                    )}
                    
                    {/* 🗑️ ELIMINAR PEDIDO */}
                    <button
                      className="btn btn-outline-danger btn-sm ms-auto"
                      onClick={() => {
                        if (window.confirm('¿Está seguro de eliminar este pedido?')) {
                          onEliminarPedido(pedido._id);
                        }
                      }}
                      title="Eliminar pedido"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PedidosList;

/*
 * 📚 CONCEPTOS APRENDIDOS:
 * 
 * 1. FORMATEO DE DATOS: fechas, números
 * 2. FUNCIONES HELPER: formatearFecha, getEstadoClase
 * 3. MAPEO ANIDADO: productos dentro de pedidos
 * 4. CONFIRMACIÓN DE ACCIONES: window.confirm
 * 5. ESTILOS CONDICIONALES: clases según estado
 * 6. TÍTULOS DE BOTONES: title attribute
 * 7. SCROLL VERTICAL: overflow-y en contenedores
 */
