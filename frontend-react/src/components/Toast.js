/*
 * 🔔 COMPONENTE TOAST
 * 
 * Sistema de notificaciones para feedback al usuario.
 * Conceptos:
 * - Rendering condicional
 * - Auto-dismiss con useEffect
 * - Portal rendering (posición fija)
 */

import React, { useEffect } from 'react';

function Toast({ mensaje, tipo, visible, onClose }) {
  
  // ⏰ AUTO-CERRAR DESPUÉS DE 3 SEGUNDOS
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      // 🧹 LIMPIEZA: cancelar timer si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  // 🚫 NO RENDERIZAR SI NO ES VISIBLE
  if (!visible) return null;

  // 🎨 CONFIGURACIÓN SEGÚN TIPO
  const configuraciones = {
    success: {
      icono: 'bi-check-circle',
      clase: 'bg-success text-white',
      titulo: '¡Éxito!'
    },
    error: {
      icono: 'bi-x-circle',
      clase: 'bg-danger text-white', 
      titulo: 'Error'
    },
    warning: {
      icono: 'bi-exclamation-triangle',
      clase: 'bg-warning text-dark',
      titulo: 'Advertencia'
    },
    info: {
      icono: 'bi-info-circle',
      clase: 'bg-info text-white',
      titulo: 'Información'
    }
  };

  const config = configuraciones[tipo] || configuraciones.info;

  return (
    // 📍 POSICIÓN FIJA EN LA ESQUINA
    <div 
      className="position-fixed top-0 end-0 p-3"
      style={{ 
        zIndex: 1050,  // Por encima de modales
        animation: visible ? 'slideInRight 0.3s ease-out' : 'slideOutRight 0.3s ease-in'
      }}
    >
      <div className={`toast show ${config.clase}`} role="alert">
        <div className="toast-header">
          <i className={`bi ${config.icono} me-2`}></i>
          <strong className="me-auto">{config.titulo}</strong>
          <small className="text-muted">ahora</small>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Cerrar"
          ></button>
        </div>
        
        <div className="toast-body">
          {mensaje}
        </div>
      </div>
    </div>
  );
}

// 🎯 HOOK PERSONALIZADO PARA MANEJAR TOASTS
export function useToast() {
  const [toast, setToast] = React.useState({
    visible: false,
    mensaje: '',
    tipo: 'info'
  });

  const mostrarToast = (mensaje, tipo = 'info') => {
    setToast({
      visible: true,
      mensaje,
      tipo
    });
  };

  const ocultarToast = () => {
    setToast(prev => ({
      ...prev,
      visible: false
    }));
  };

  return {
    toast,
    mostrarToast,
    ocultarToast
  };
}

export default Toast;

/*
 * 📚 CONCEPTOS APRENDIDOS:
 * 
 * 1. useEffect CON CLEANUP: setTimeout y clearTimeout
 * 2. RENDERING CONDICIONAL: return null
 * 3. CONFIGURACIONES: objeto con múltiples opciones
 * 4. POSICIÓN FIJA: position-fixed, z-index
 * 5. CUSTOM HOOKS: useToast para reutilizar lógica
 * 6. ESTADO COMPLEJO: objeto con múltiples propiedades
 * 7. AUTO-DISMISS: temporizador automático
 */
