/*
 * 🏠 HOME.JSX - Página principal de la tienda
 * 
 * Contiene toda la lógica de la tienda online.
 * Este enfoque separa el contenido de las rutas.
 */

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import TecnologiasInfo from '../components/TecnologiasInfo'
import ProductosList from '../components/ProductosList'
import Carrito from '../components/Carrito'
import PedidosList from '../components/PedidosList'
import DeveloperInfo from '../components/DeveloperInfo'
import Toast, { useToast } from '../components/Toast'

// 📡 Configuración de la API
const API_URL = 'http://localhost:3000/api'

function Home() {
  // 🎯 ESTADO GLOBAL DE LA APLICACIÓN
  const [productos, setProductos] = useState([])
  const [pedidos, setPedidos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [cliente, setCliente] = useState('')
  const [loading, setLoading] = useState(false)
  
  // 🔔 SISTEMA DE NOTIFICACIONES
  const { toast, mostrarToast, ocultarToast } = useToast()

  // 🔄 EFECTOS - se ejecutan cuando el componente se monta
  useEffect(() => {
    console.log('🏠 Página Home cargada')
    cargarProductos()
    cargarPedidos()
  }, [])

  // 📡 FUNCIONES DE API - Comunicación con el backend
  
  // 📖 CARGAR PRODUCTOS
  const cargarProductos = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/productos`)
      const data = await response.json()
      
      if (data.status === 'ok') {
        setProductos(data.data || [])
      }
    } catch (error) {
      console.error('Error al cargar productos:', error)
      mostrarToast('Error al cargar productos', 'error')
    } finally {
      setLoading(false)
    }
  }

  // ➕ CREAR PRODUCTO
  const crearProducto = async (productoData) => {
    try {
      const response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoData)
      })

      if (response.ok) {
        mostrarToast('Producto creado exitosamente', 'success')
        cargarProductos()
      } else {
        throw new Error('Error al crear producto')
      }
    } catch (error) {
      console.error('Error:', error)
      mostrarToast('Error al crear producto', 'error')
    }
  }

  // ✏️ EDITAR PRODUCTO
  const editarProducto = async (id, productoData) => {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoData)
      })

      if (response.ok) {
        mostrarToast('Producto actualizado exitosamente', 'success')
        cargarProductos()
      } else {
        throw new Error('Error al actualizar producto')
      }
    } catch (error) {
      console.error('Error:', error)
      mostrarToast('Error al actualizar producto', 'error')
    }
  }

  // 🗑️ ELIMINAR PRODUCTO
  const eliminarProducto = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar "${nombre}"?`)) return

    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        mostrarToast('Producto eliminado exitosamente', 'success')
        cargarProductos()
        // Remover del carrito si existe
        setCarrito(carrito.filter(item => item.producto !== id))
      } else {
        throw new Error('Error al eliminar producto')
      }
    } catch (error) {
      console.error('Error:', error)
      mostrarToast('Error al eliminar producto', 'error')
    }
  }

  // 📖 CARGAR PEDIDOS
  const cargarPedidos = async () => {
    try {
      const response = await fetch(`${API_URL}/pedidos`)
      const data = await response.json()
      
      if (data.status === 'ok') {
        setPedidos(data.data || [])
      }
    } catch (error) {
      console.error('Error al cargar pedidos:', error)
      mostrarToast('Error al cargar pedidos', 'error')
    }
  }

  // 📝 CREAR PEDIDO
  const crearPedido = async () => {
    if (!cliente.trim()) {
      mostrarToast('Ingresa el nombre del cliente', 'warning')
      return
    }

    if (carrito.length === 0) {
      mostrarToast('El carrito está vacío', 'warning')
      return
    }

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)

    const pedidoData = {
      cliente: cliente.trim(),
      productos: carrito.map(item => ({
        producto: item.producto,
        cantidad: item.cantidad
      })),
      total: total,
      estado: 'pendiente'
    }

    try {
      const response = await fetch(`${API_URL}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoData)
      })

      if (response.ok) {
        mostrarToast('¡Pedido creado exitosamente!', 'success')
        setCarrito([])
        setCliente('')
        cargarPedidos()
      } else {
        throw new Error('Error al crear pedido')
      }
    } catch (error) {
      console.error('Error:', error)
      mostrarToast('Error al crear pedido', 'error')
    }
  }

  // 🔄 CAMBIAR ESTADO DE PEDIDO
  const cambiarEstadoPedido = async (id, nuevoEstado) => {
    try {
      const response = await fetch(`${API_URL}/pedidos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      })

      if (response.ok) {
        mostrarToast(`Pedido ${nuevoEstado} correctamente`, 'success')
        cargarPedidos()
      } else {
        throw new Error('Error al actualizar pedido')
      }
    } catch (error) {
      console.error('Error:', error)
      mostrarToast('Error al actualizar pedido', 'error')
    }
  }

  // 🗑️ ELIMINAR PEDIDO
  const eliminarPedido = async (id, cliente) => {
    if (!window.confirm(`¿Eliminar pedido de ${cliente}?`)) return

    try {
      const response = await fetch(`${API_URL}/pedidos/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        mostrarToast('Pedido eliminado exitosamente', 'success')
        cargarPedidos()
      } else {
        throw new Error('Error al eliminar pedido')
      }
    } catch (error) {
      console.error('Error:', error)
      mostrarToast('Error al eliminar pedido', 'error')
    }
  }

  // 🛒 FUNCIONES DEL CARRITO

  // ➕ AGREGAR AL CARRITO
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.producto === producto._id)
    
    if (existe) {
      // Si ya existe, aumentar cantidad
      setCarrito(carrito.map(item => 
        item.producto === producto._id 
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ))
      mostrarToast(`Cantidad aumentada: ${producto.nombre}`, 'info')
    } else {
      // Si no existe, agregarlo nuevo
      setCarrito([...carrito, {
        producto: producto._id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1
      }])
      mostrarToast(`Agregado al carrito: ${producto.nombre}`, 'success')
    }
  }

  // ➖ QUITAR DEL CARRITO
  const quitarDelCarrito = (productId) => {
    setCarrito(carrito.filter(item => item.producto !== productId))
    mostrarToast('Producto removido del carrito', 'info')
  }

  // 🔢 CAMBIAR CANTIDAD
  const cambiarCantidad = (productId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      quitarDelCarrito(productId)
    } else {
      setCarrito(carrito.map(item => 
        item.producto === productId 
          ? { ...item, cantidad: nuevaCantidad }
          : item
      ))
    }
  }

  // 🗑️ LIMPIAR CARRITO
  const limpiarCarrito = () => {
    if (carrito.length > 0 && window.confirm('¿Limpiar el carrito?')) {
      setCarrito([])
      mostrarToast('Carrito limpiado', 'info')
    }
  }

  // 🎨 RENDERIZAR LA PÁGINA HOME
  return (
    <>
      {/* 🧭 BARRA DE NAVEGACIÓN */}
      <Navbar carritoCount={carrito.reduce((sum, item) => sum + item.cantidad, 0)} />

      <div className="container my-4">
        {/* 📚 INFORMACIÓN DE TECNOLOGÍAS */}
        <TecnologiasInfo />

        {/* 🛍️ SECCIÓN DE PRODUCTOS - Ancho completo */}
        <ProductosList 
          productos={productos}
          loading={loading}
          onCrearProducto={crearProducto}
          onEditarProducto={editarProducto}
          onEliminarProducto={eliminarProducto}
          onAgregarAlCarrito={agregarAlCarrito}
        />

        {/* 🛒📋 CARRITO Y PEDIDOS - Dos columnas */}
        <div className="row mt-5">
          <div className="col-lg-6">
            <Carrito
              carrito={carrito}
              cliente={cliente}
              onClienteChange={setCliente}
              onCambiarCantidad={cambiarCantidad}
              onQuitarDelCarrito={quitarDelCarrito}
              onLimpiarCarrito={limpiarCarrito}
              onCrearPedido={crearPedido}
            />
          </div>
          <div className="col-lg-6">
            <PedidosList
              pedidos={pedidos}
              onActualizarPedido={(id, datos) => cambiarEstadoPedido(id, datos.estado)}
              onEliminarPedido={eliminarPedido}
            />
          </div>
        </div>

        {/* 👨‍💻 INFORMACIÓN DEL DESARROLLADOR */}
        <DeveloperInfo />
      </div>

      {/* 🔔 NOTIFICACIONES */}
      <Toast 
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        visible={toast.visible}
        onClose={ocultarToast}
      />
    </>
  )
}

export default Home

/*
 * 📚 DIFERENCIA CON APP.JS:
 * 
 * 1. RESPONSABILIDAD: Solo contenido, no rutas
 * 2. NOMENCLATURA: Home.jsx vs App.js
 * 3. ESTRUCTURA: Página específica vs contenedor general
 * 4. ESCALABILIDAD: Permite múltiples páginas fácilmente
 */
