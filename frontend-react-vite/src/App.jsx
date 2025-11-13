/*
 * 🚀 APP.JSX - Componente principal de la aplicación
 * 
 * Este componente orquesta toda la aplicación.
 * Aquí explicaremos useEffect y la conexión con la base de datos.
 */

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import ProductosSection from './components/ProductosSection.jsx'
import CarritoSection from './components/CarritoSection.jsx'
import ConexionInfo from './components/ConexionInfo.jsx'

/*
 * 📡 CONFIGURACIÓN DE LA API
 * 
 * Esta constante define la URL base para todas las peticiones
 * al backend que contiene nuestra base de datos MongoDB.
 */
const API_BASE_URL = '/api'  // Gracias al proxy de Vite: /api -> http://localhost:3000/api

function App() {
  /*
   * 🎯 ESTADO GLOBAL DE LA APLICACIÓN
   * 
   * useState nos permite crear variables reactivas que,
   * cuando cambian, hacen que React re-renderice los componentes.
   */
  
  // 📦 PRODUCTOS: Array con todos los productos de la base de datos
  const [productos, setProductos] = useState([])
  
  // 🛒 CARRITO: Array con los productos que el usuario ha seleccionado
  const [carrito, setCarrito] = useState([])
  
  // ⏳ LOADING: Boolean que indica si hay una petición en curso
  const [loading, setLoading] = useState(false)
  
  // ❌ ERROR: String con mensajes de error si algo falla
  const [error, setError] = useState('')
  
  // 🔌 CONEXION: Estado de la conexión con la base de datos
  const [conexionDB, setConexionDB] = useState({
    estado: 'desconectado', // 'conectado', 'desconectado', 'error'
    mensaje: '',
    ultimaActualizacion: null
  })

  /*
   * 🔄 useEffect - EL CORAZÓN DE LA CONEXIÓN CON LA BASE DE DATOS
   * 
   * useEffect es un Hook que nos permite ejecutar código cuando:
   * 1. El componente se monta por primera vez
   * 2. Cuando ciertos valores cambian
   * 3. Cuando el componente se desmonta
   */

  // 🚀 useEffect #1: CARGAR DATOS AL INICIAR LA APLICACIÓN
  useEffect(() => {
    /*
     * 📚 EXPLICACIÓN DE ESTE useEffect:
     * 
     * - Se ejecuta UNA SOLA VEZ cuando el componente App se monta
     * - El array vacío [] como segundo parámetro significa "sin dependencias"
     * - Sin dependencias = solo se ejecuta al montar el componente
     * - Es perfecto para cargar datos iniciales
     */
    
    console.log('🚀 Aplicación iniciada - Cargando datos desde la base de datos...')
    
    // Verificar conexión y cargar productos
    verificarConexionBaseDatos()
    cargarProductosDesdeDB()
    
  }, []) // ← Array vacío = se ejecuta solo UNA VEZ al montar

  // 🔄 useEffect #2: MONITOREAR ESTADO DE LA CONEXIÓN
  useEffect(() => {
    /*
     * 📚 EXPLICACIÓN DE ESTE useEffect:
     * 
     * - Se ejecuta cuando 'productos' cambia
     * - Útil para actualizar el estado de conexión basado en los datos
     * - [productos] significa "ejecutar cuando productos cambie"
     */
    
    if (productos.length > 0) {
      setConexionDB(prev => ({
        ...prev,
        estado: 'conectado',
        mensaje: `✅ ${productos.length} productos cargados correctamente`,
        ultimaActualizacion: new Date().toLocaleTimeString()
      }))
    }
    
  }, [productos]) // ← Se ejecuta cuando 'productos' cambia

  /*
   * 📡 FUNCIONES PARA COMUNICARSE CON LA BASE DE DATOS
   * 
   * Estas funciones encapsulan las peticiones HTTP al backend,
   * que a su vez se comunica con MongoDB.
   */

  // 🔍 VERIFICAR CONEXIÓN CON LA BASE DE DATOS
  const verificarConexionBaseDatos = async () => {
    try {
      console.log('🔍 Verificando conexión con la base de datos...')
      
      setConexionDB(prev => ({
        ...prev,
        estado: 'conectando',
        mensaje: '🔄 Verificando conexión...'
      }))

      // Petición simple para verificar que el backend responde
      const response = await fetch(`${API_BASE_URL}/productos`)
      
      if (response.ok) {
        console.log('✅ Conexión con base de datos exitosa')
        setConexionDB(prev => ({
          ...prev,
          estado: 'conectado',
          mensaje: '✅ Conexión establecida con MongoDB',
          ultimaActualizacion: new Date().toLocaleTimeString()
        }))
      } else {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      
    } catch (error) {
      console.error('❌ Error de conexión:', error)
      setConexionDB({
        estado: 'error',
        mensaje: `❌ Error: ${error.message}`,
        ultimaActualizacion: new Date().toLocaleTimeString()
      })
    }
  }

  // 📖 CARGAR PRODUCTOS DESDE LA BASE DE DATOS
  const cargarProductosDesdeDB = async () => {
    try {
      console.log('📖 Iniciando carga de productos desde MongoDB...')
      
      // 1️⃣ INDICAR QUE ESTAMOS CARGANDO
      setLoading(true)
      setError('') // Limpiar errores previos
      
      // 2️⃣ REALIZAR PETICIÓN HTTP AL BACKEND
      const response = await fetch(`${API_BASE_URL}/productos`)
      
      // 3️⃣ VERIFICAR QUE LA RESPUESTA SEA EXITOSA
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`)
      }
      
      // 4️⃣ CONVERTIR RESPUESTA JSON A OBJETO JAVASCRIPT
      const data = await response.json()
      console.log('📦 Datos recibidos del backend:', data)
      
      // 5️⃣ ACTUALIZAR ESTADO CON LOS PRODUCTOS
      if (data.status === 'ok') {
        setProductos(data.data || [])
        console.log(`✅ ${data.data?.length || 0} productos cargados en el estado`)
      } else {
        throw new Error(data.message || 'Respuesta inválida del servidor')
      }
      
    } catch (error) {
      // 6️⃣ MANEJAR ERRORES
      console.error('❌ Error al cargar productos:', error)
      setError(`Error al cargar productos: ${error.message}`)
      setProductos([]) // Asegurar que productos esté vacío si hay error
      
    } finally {
      // 7️⃣ SIEMPRE QUITAR EL INDICADOR DE CARGA
      setLoading(false)
      console.log('🏁 Carga de productos finalizada')
    }
  }

  // 🆕 CREAR NUEVO PRODUCTO EN LA BASE DE DATOS
  const crearProducto = async (datosProducto) => {
    try {
      console.log('🆕 Creando nuevo producto:', datosProducto)
      
      setLoading(true)
      
      // Petición POST para crear producto
      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosProducto)
      })
      
      if (!response.ok) {
        throw new Error(`Error al crear producto: ${response.status}`)
      }
      
      const resultado = await response.json()
      console.log('✅ Producto creado:', resultado)
      
      // Recargar productos para mostrar el nuevo
      await cargarProductosDesdeDB()
      
      return true
      
    } catch (error) {
      console.error('❌ Error al crear producto:', error)
      setError(`Error al crear producto: ${error.message}`)
      return false
      
    } finally {
      setLoading(false)
    }
  }

  // 🛒 FUNCIONES DEL CARRITO (Sin base de datos - solo estado local)
  const agregarAlCarrito = (producto) => {
    console.log('🛒 Agregando al carrito:', producto.nombre)
    
    setCarrito(carritoActual => {
      // Verificar si el producto ya está en el carrito
      const existe = carritoActual.find(item => item._id === producto._id)
      
      if (existe) {
        // Si existe, aumentar cantidad
        return carritoActual.map(item => 
          item._id === producto._id 
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...carritoActual, { ...producto, cantidad: 1 }]
      }
    })
  }

  const eliminarDelCarrito = (idProducto) => {
    console.log('🗑️ Eliminando del carrito:', idProducto)
    setCarrito(carritoActual => 
      carritoActual.filter(item => item._id !== idProducto)
    )
  }

  /*
   * 🎨 RENDERIZADO DEL COMPONENTE
   * 
   * JSX que define la estructura visual de nuestra aplicación
   */
  return (
    <>
      {/* 🧭 BARRA DE NAVEGACIÓN */}
      <Navbar 
        totalItems={carrito.reduce((total, item) => total + item.cantidad, 0)}
      />
      
      <div className="container my-4">
        
        {/* 📊 INFORMACIÓN DE CONEXIÓN CON LA BASE DE DATOS */}
        <ConexionInfo 
          conexion={conexionDB}
          onReconectar={verificarConexionBaseDatos}
        />
        
        {/* ❌ MOSTRAR ERRORES SI LOS HAY */}
        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i>
            {error}
          </div>
        )}
        
        {/* 🛍️ SECCIÓN DE PRODUCTOS */}
        <ProductosSection 
          productos={productos}
          loading={loading}
          onAgregar={agregarAlCarrito}
          onCrearProducto={crearProducto}
          onRecargar={cargarProductosDesdeDB}
        />
        
        {/* 🛒 SECCIÓN DEL CARRITO */}
        <CarritoSection 
          carrito={carrito}
          onEliminar={eliminarDelCarrito}
        />
        
      </div>
    </>
  )
}

export default App

/*
 * 📚 RESUMEN DE CONCEPTOS CLAVE:
 * 
 * 🔄 useEffect:
 *    - Hook para efectos secundarios (peticiones, timers, etc.)
 *    - Primer parámetro: función a ejecutar
 *    - Segundo parámetro: array de dependencias
 *    - [] = solo al montar, [variable] = cuando variable cambie
 * 
 * 📡 Conexión con Base de Datos:
 *    - fetch() para peticiones HTTP
 *    - async/await para código asíncrono
 *    - try/catch para manejar errores
 *    - Estados de loading para UX
 * 
 * 🎯 Estado con useState:
 *    - Variables reactivas que disparan re-renderizado
 *    - Siempre usar la función setter (setVariable)
 *    - Inmutabilidad: no modificar directamente, crear nuevo
 */
