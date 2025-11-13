/*
 * 📊 CONEXION-INFO.JSX - Información del estado de conexión con la base de datos
 * 
 * Este componente muestra de forma visual cómo está la conexión
 * con MongoDB. Es muy educativo para entender el flujo de datos.
 */

function ConexionInfo({ conexion, onReconectar }) {
  
  /*
   * 🎨 OBTENER CLASES CSS SEGÚN EL ESTADO
   * 
   * Esta función ayuda a mostrar visualmente el estado de la conexión
   */
  const obtenerClasesEstado = (estado) => {
    const clases = {
      'conectado': 'alert-success',
      'desconectado': 'alert-secondary', 
      'conectando': 'alert-warning',
      'error': 'alert-danger'
    }
    return clases[estado] || 'alert-info'
  }

  const obtenerIconoEstado = (estado) => {
    const iconos = {
      'conectado': 'bi-wifi',
      'desconectado': 'bi-wifi-off',
      'conectando': 'bi-arrow-repeat',
      'error': 'bi-exclamation-triangle'
    }
    return iconos[estado] || 'bi-question-circle'
  }

  return (
    <div className={`alert ${obtenerClasesEstado(conexion.estado)} d-flex justify-content-between align-items-center`}>
      
      <div className="d-flex align-items-center">
        {/* 📡 ICONO DEL ESTADO */}
        <i className={`bi ${obtenerIconoEstado(conexion.estado)} me-3 fs-5`}></i>
        
        <div>
          {/* 📝 MENSAJE PRINCIPAL */}
          <strong>Base de Datos MongoDB:</strong> {conexion.mensaje}
          
          {/* ⏰ ÚLTIMA ACTUALIZACIÓN */}
          {conexion.ultimaActualizacion && (
            <div>
              <small className="text-muted">
                Última actualización: {conexion.ultimaActualizacion}
              </small>
            </div>
          )}
        </div>
      </div>
      
      {/* 🔄 BOTÓN RECONECTAR */}
      <button 
        className="btn btn-outline-primary btn-sm"
        onClick={onReconectar}
        title="Verificar conexión"
      >
        <i className="bi bi-arrow-clockwise"></i>
        Verificar
      </button>
      
    </div>
  )
}

export default ConexionInfo

/*
 * 📚 CONCEPTOS EDUCATIVOS EN ESTE COMPONENTE:
 * 
 * 1. 🎨 RENDERIZADO CONDICIONAL:
 *    - Mostrar diferentes elementos según el estado
 *    - Usar funciones para calcular clases CSS
 * 
 * 2. 📡 PROPS:
 *    - Recibir datos del componente padre (App.jsx)
 *    - Recibir funciones callback (onReconectar)
 * 
 * 3. 🔄 INTERACTIVIDAD:
 *    - Botón que ejecuta función del padre
 *    - Comunicación hijo → padre mediante callbacks
 * 
 * 4. 💡 UX (EXPERIENCIA DE USUARIO):
 *    - Colores visuales según estado
 *    - Iconos intuitivos
 *    - Información de tiempo actualizada
 */
