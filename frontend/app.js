/* 
 * 📚 TIENDA ONLINE - Frontend JavaScript (Manual para Alumnos)
 * 
 * Este archivo contiene toda la lógica del frontend de nuestra tienda.
 * Aquí aprenderás:
 * - Cómo conectar frontend con backend
 * - Operaciones CRUD (Create, Read, Update, Delete)
 * - Manipulación del DOM
 * - Manejo de APIs REST con fetch()
 * - Gestión de estados en JavaScript
 */

// ==================== 📡 CONFIGURACIÓN DE LA API ====================
/* 
 * 🔗 CONEXIÓN CON EL BACKEND:
 * Esta URL es la dirección donde está corriendo nuestro servidor backend.
 * Debe coincidir con el puerto que configuraste en server.js
 */
const API_URL = 'http://localhost:3000/api';

// ==================== 💾 ESTADO GLOBAL DE LA APLICACIÓN ====================
/* 
 * 🎯 VARIABLES GLOBALES:
 * Estas variables mantienen el estado de nuestra aplicación
 * - carrito: Array que almacena los productos que el usuario quiere comprar
 * - editandoProducto: ID del producto que estamos editando (null si no editamos nada)
 */
let carrito = [];
let editandoProducto = null;

// ==================== 🎨 FUNCIONES DE UTILIDAD ====================

/* 
 * 💬 MOSTRAR MENSAJES AL USUARIO:
 * Esta función muestra notificaciones tipo "toast" usando Bootstrap
 * Parámetros:
 * - mensaje: El texto que queremos mostrar
 * - tipo: 'success' (verde), 'danger' (rojo), 'info' (azul)
 */
function mostrarMensaje(mensaje, tipo = 'success') {
  // Creamos el HTML del mensaje usando template literals
  const toastHTML = `
    <div class="toast align-items-center text-white bg-${tipo} border-0">
      <div class="d-flex">
        <div class="toast-body">${mensaje}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;
  
  // Buscamos el contenedor de mensajes o lo creamos
  let contenedor = document.getElementById('toast-container');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.id = 'toast-container';
    contenedor.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(contenedor);
  }
  
  // Agregamos el mensaje y lo mostramos
  contenedor.insertAdjacentHTML('beforeend', toastHTML);
  const toast = new bootstrap.Toast(contenedor.lastElementChild);
  toast.show();
}

// ==================== 🛍️ GESTIÓN DE PRODUCTOS ====================

/* 
 * 📖 CARGAR PRODUCTOS DESDE EL BACKEND:
 * Esta función hace una petición GET a la API para obtener todos los productos
 * Es una función async porque usa await para esperar la respuesta del servidor
 */
async function cargarProductos() {
  try {
    console.log('📡 Cargando productos desde el backend...');
    
    /* 
     * 🌐 PETICIÓN HTTP GET:
     * fetch() es la función moderna de JavaScript para hacer peticiones HTTP
     * Por defecto hace una petición GET
     */
    const respuesta = await fetch(`${API_URL}/productos`);
    
    /* 
     * 📦 CONVERTIR RESPUESTA A JSON:
     * .json() convierte la respuesta del servidor a un objeto JavaScript
     */
    const datos = await respuesta.json();
    
    console.log('✅ Productos recibidos:', datos);
    
    // Verificamos si hay productos para mostrar
    if (datos.status === 'ok' && datos.data && datos.data.length > 0) {
      mostrarProductos(datos.data);
    } else {
      // Si no hay productos, mostramos un mensaje amigable
      document.getElementById('productosList').innerHTML = `
        <div class="col-12">
          <div class="alert alert-info text-center">
            <h5>No hay productos</h5>
            <p>Crea tu primer producto usando el formulario.</p>
          </div>
        </div>
      `;
    }
  } catch (error) {
    /* 
     * 🚨 MANEJO DE ERRORES:
     * Si algo sale mal (servidor apagado, sin internet, etc.)
     * mostramos un mensaje de error al usuario
     */
    console.error('❌ Error al cargar productos:', error);
    document.getElementById('productosList').innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center">
          <h5>Error de conexión</h5>
          <p>Verifica que el servidor esté corriendo en el puerto 3000.</p>
        </div>
      </div>
    `;
  }
}

/* 
 * 🖼️ MOSTRAR PRODUCTOS EN LA PÁGINA:
 * Esta función toma un array de productos y los muestra en tarjetas HTML
 */
function mostrarProductos(productos) {
  const contenedor = document.getElementById('productosList');
  contenedor.innerHTML = ''; // Limpiamos el contenedor
  
  /* 
   * 🔄 RECORRER ARRAY DE PRODUCTOS:
   * forEach() ejecuta una función para cada producto en el array
   */
  productos.forEach(producto => {
    // Creamos un div para cada producto
    const divProducto = document.createElement('div');
    divProducto.className = 'col-md-6 col-lg-4 mb-3';
    
    /* 
     * 📝 TEMPLATE LITERALS:
     * Usamos backticks (`) para crear HTML dinámico
     * ${variable} inserta el valor de la variable en el texto
     */
    divProducto.innerHTML = `
      <div class="card h-100">
        <div class="producto-imagen ${!producto.imagen ? 'placeholder' : ''}">
          ${producto.imagen ? 
            `<img src="${producto.imagen}" alt="${producto.nombre}" style="width:100%; height:100%; object-fit:cover;">` : 
            '<i class="bi bi-image"></i><br><small>Sin imagen</small>'
          }
        </div>
        <div class="card-body">
          <h5>${producto.nombre}</h5>
          <div class="precio-tag mb-2">$${producto.precio.toFixed(2)}</div>
          <div class="mb-2">
            <small>Stock: ${producto.stock} unidades</small>
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-success" onclick="agregarAlCarrito('${producto._id}', '${producto.nombre}', ${producto.precio})" 
                    ${producto.stock === 0 ? 'disabled' : ''}>
              🛒 Agregar al Carrito
            </button>
            <div class="btn-group">
              <button class="btn btn-warning btn-sm" onclick="editarProducto('${producto._id}')">
                ✏️ Editar
              </button>
              <button class="btn btn-danger btn-sm" onclick="eliminarProducto('${producto._id}', '${producto.nombre}')">
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Agregamos la tarjeta al contenedor
    contenedor.appendChild(divProducto);
  });
}

/* 
 * ➕ CREAR NUEVO PRODUCTO:
 * Esta función se ejecuta cuando el usuario envía el formulario
 */
async function crearProducto(evento) {
  evento.preventDefault(); // Evitamos que se recargue la página
  
  /* 
   * 📝 OBTENER DATOS DEL FORMULARIO:
   * Usamos document.getElementById() para obtener el valor de cada campo
   */
  const datosProducto = {
    nombre: document.getElementById('nombre').value.trim(),
    precio: parseFloat(document.getElementById('precio').value),
    stock: parseInt(document.getElementById('stock').value) || 0,
    activo: true,
    imagen: document.getElementById('imagen').value.trim() || undefined
  };
  
  console.log('📤 Enviando producto:', datosProducto);
  
  try {
    /* 
     * 🌐 PETICIÓN HTTP POST:
     * Para crear recursos usamos el método POST
     * Enviamos los datos en formato JSON en el body
     */
    const respuesta = await fetch(`${API_URL}/productos`, {
      method: 'POST', // Método HTTP para crear
      headers: { 
        'Content-Type': 'application/json' // Le decimos al servidor que enviamos JSON
      },
      body: JSON.stringify(datosProducto) // Convertimos el objeto a texto JSON
    });
    
    if (respuesta.ok) {
      console.log('✅ Producto creado exitosamente');
      mostrarMensaje('Producto creado exitosamente', 'success');
      
      // Limpiamos el formulario
      document.getElementById('productoForm').reset();
      
      // Recargamos la lista de productos
      cargarProductos();
    } else {
      throw new Error('Error al crear producto');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    mostrarMensaje('Error al crear producto', 'danger');
  }
}

/* 
 * ✏️ EDITAR PRODUCTO EXISTENTE:
 * Carga los datos de un producto en el formulario para editarlo
 */
async function editarProducto(id) {
  try {
    console.log('📖 Cargando producto para editar:', id);
    
    /* 
     * 🌐 PETICIÓN HTTP GET ESPECÍFICA:
     * Obtenemos un producto específico por su ID
     */
    const respuesta = await fetch(`${API_URL}/productos/${id}`);
    const datos = await respuesta.json();
    
    if (datos.status === 'ok') {
      const producto = datos.data;
      
      /* 
       * 📝 LLENAR FORMULARIO CON DATOS EXISTENTES:
       * Colocamos los valores del producto en los campos del formulario
       */
      document.getElementById('nombre').value = producto.nombre;
      document.getElementById('precio').value = producto.precio;
      document.getElementById('stock').value = producto.stock;
      document.getElementById('imagen').value = producto.imagen || '';
      
      // Guardamos que estamos editando este producto
      editandoProducto = id;
      
      // Cambiamos el texto del botón
      const boton = document.querySelector('#productoForm button[type="submit"]');
      boton.innerHTML = '🔄 Actualizar Producto';
      
      mostrarMensaje('Producto cargado para edición', 'info');
    }
  } catch (error) {
    console.error('❌ Error al cargar producto:', error);
    mostrarMensaje('Error al cargar producto', 'danger');
  }
}

/* 
 * 🔄 ACTUALIZAR PRODUCTO:
 * Guarda los cambios de un producto editado
 */
async function actualizarProducto(datosProducto) {
  try {
    console.log('🔄 Actualizando producto:', editandoProducto);
    
    /* 
     * 🌐 PETICIÓN HTTP PUT:
     * PUT se usa para actualizar un recurso completo
     */
    const respuesta = await fetch(`${API_URL}/productos/${editandoProducto}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosProducto)
    });
    
    if (respuesta.ok) {
      console.log('✅ Producto actualizado exitosamente');
      mostrarMensaje('Producto actualizado exitosamente', 'success');
      
      // Limpiamos el estado de edición
      editandoProducto = null;
      const boton = document.querySelector('#productoForm button[type="submit"]');
      boton.innerHTML = '➕ Crear Producto';
      
      // Limpiamos el formulario y recargamos productos
      document.getElementById('productoForm').reset();
      cargarProductos();
    } else {
      throw new Error('Error al actualizar producto');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    mostrarMensaje('Error al actualizar producto', 'danger');
  }
}

/* 
 * 🗑️ ELIMINAR PRODUCTO:
 * Borra un producto del servidor
 */
async function eliminarProducto(id, nombre) {
  // Confirmamos la acción con el usuario
  if (!confirm(`¿Estás seguro de eliminar "${nombre}"?`)) {
    return; // Si cancela, no hacemos nada
  }
  
  try {
    console.log('🗑️ Eliminando producto:', id);
    
    /* 
     * 🌐 PETICIÓN HTTP DELETE:
     * DELETE se usa para eliminar recursos
     */
    const respuesta = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE'
    });
    
    if (respuesta.ok) {
      console.log('✅ Producto eliminado exitosamente');
      mostrarMensaje('Producto eliminado exitosamente', 'success');
      
      // Removemos del carrito si estaba agregado
      carrito = carrito.filter(item => item.producto !== id);
      actualizarVistaCarrito();
      
      // Recargamos la lista de productos
      cargarProductos();
    } else {
      throw new Error('Error al eliminar producto');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    mostrarMensaje('Error al eliminar producto', 'danger');
  }
}

// ==================== 🛒 GESTIÓN DEL CARRITO ====================

/* 
 * ➕ AGREGAR PRODUCTO AL CARRITO:
 * Añade un producto al carrito de compras
 */
function agregarAlCarrito(id, nombre, precio) {
  console.log('🛒 Agregando al carrito:', { id, nombre, precio });
  
  // Buscamos si el producto ya está en el carrito
  const productoExistente = carrito.find(item => item.producto === id);
  
  if (productoExistente) {
    // Si ya existe, aumentamos la cantidad
    productoExistente.cantidad++;
    mostrarMensaje(`Cantidad aumentada: ${nombre}`, 'info');
  } else {
    // Si no existe, lo agregamos nuevo
    carrito.push({
      producto: id,
      nombre: nombre,
      precio: precio,
      cantidad: 1
    });
    mostrarMensaje(`Agregado al carrito: ${nombre}`, 'success');
  }
  
  // Actualizamos la vista del carrito
  actualizarVistaCarrito();
}

/* 
 * ➖ QUITAR PRODUCTO DEL CARRITO:
 * Elimina un producto completamente del carrito
 */
function quitarDelCarrito(id) {
  console.log('🗑️ Quitando del carrito:', id);
  
  // Filtramos el carrito para remover el producto
  carrito = carrito.filter(item => item.producto !== id);
  
  mostrarMensaje('Producto removido del carrito', 'info');
  actualizarVistaCarrito();
}

/* 
 * 🔢 CAMBIAR CANTIDAD EN EL CARRITO:
 * Modifica la cantidad de un producto en el carrito
 */
function cambiarCantidad(id, nuevaCantidad) {
  console.log('🔢 Cambiando cantidad:', { id, nuevaCantidad });
  
  const producto = carrito.find(item => item.producto === id);
  
  if (producto && nuevaCantidad > 0) {
    producto.cantidad = nuevaCantidad;
    actualizarVistaCarrito();
  } else if (nuevaCantidad <= 0) {
    quitarDelCarrito(id);
  }
}

/* 
 * 🖼️ ACTUALIZAR VISTA DEL CARRITO:
 * Refresca la interfaz del carrito en la página
 */
function actualizarVistaCarrito() {
  const contenedorCarrito = document.getElementById('carritoItems');
  const spanTotal = document.getElementById('totalPedido');
  const badgeContador = document.getElementById('carritoCount');
  const botonCrearPedido = document.getElementById('crearPedido');
  
  // Calculamos el total de items
  const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  badgeContador.textContent = totalItems;
  
  // Si el carrito está vacío
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = `
      <div class="text-muted text-center py-4">
        <i class="bi bi-cart-x fs-1"></i>
        <p>Carrito vacío<br>Agrega productos desde la lista</p>
      </div>
    `;
    spanTotal.textContent = '0.00';
    botonCrearPedido.disabled = true;
    return;
  }
  
  // Si hay productos, los mostramos
  contenedorCarrito.innerHTML = '';
  let total = 0;
  
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    
    const divItem = document.createElement('div');
    divItem.className = 'carrito-item';
    divItem.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>${item.nombre}</strong><br>
          <small>$${item.precio.toFixed(2)} c/u</small>
        </div>
        <div class="d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad('${item.producto}', ${item.cantidad - 1})">-</button>
          <span class="mx-2">${item.cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad('${item.producto}', ${item.cantidad + 1})">+</button>
          <button class="btn btn-sm btn-outline-danger ms-2" onclick="quitarDelCarrito('${item.producto}')">🗑️</button>
        </div>
      </div>
      <div class="text-end mt-1">
        <strong>Subtotal: $${subtotal.toFixed(2)}</strong>
      </div>
    `;
    contenedorCarrito.appendChild(divItem);
  });
  
  spanTotal.textContent = total.toFixed(2);
  botonCrearPedido.disabled = false;
}

// ==================== 📋 GESTIÓN DE PEDIDOS ====================

/* 
 * 📝 CREAR NUEVO PEDIDO:
 * Envía el carrito al backend para crear un pedido
 */
async function crearPedido() {
  const nombreCliente = document.getElementById('cliente').value.trim();
  
  // Validaciones básicas
  if (!nombreCliente) {
    mostrarMensaje('Por favor ingresa el nombre del cliente', 'danger');
    return;
  }
  
  if (carrito.length === 0) {
    mostrarMensaje('El carrito está vacío', 'danger');
    return;
  }
  
  // Calculamos el total
  const total = carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
  
  /* 
   * 📦 PREPARAR DATOS DEL PEDIDO:
   * Creamos el objeto que enviaremos al backend
   */
  const datosPedido = {
    cliente: nombreCliente,
    productos: carrito.map(item => ({
      producto: item.producto, // ID del producto
      cantidad: item.cantidad
    })),
    total: total,
    estado: 'pendiente'
  };
  
  console.log('📤 Creando pedido:', datosPedido);
  
  try {
    /* 
     * 🌐 PETICIÓN HTTP POST PARA CREAR PEDIDO:
     * Enviamos el pedido al backend
     */
    const respuesta = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosPedido)
    });
    
    if (respuesta.ok) {
      console.log('✅ Pedido creado exitosamente');
      mostrarMensaje('¡Pedido creado exitosamente!', 'success');
      
      // Limpiamos el carrito y el formulario
      carrito = [];
      actualizarVistaCarrito();
      document.getElementById('cliente').value = '';
      
      // Recargamos los pedidos
      cargarPedidos();
    } else {
      const error = await respuesta.json();
      throw new Error(error.message || 'Error al crear pedido');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    mostrarMensaje('Error al crear pedido: ' + error.message, 'danger');
  }
}

/* 
 * 📖 CARGAR PEDIDOS DESDE EL BACKEND:
 * Obtiene y muestra todos los pedidos realizados
 */
async function cargarPedidos() {
  try {
    console.log('📡 Cargando pedidos desde el backend...');
    
    /* 
     * 🌐 PETICIÓN HTTP GET PARA OBTENER PEDIDOS:
     * Similar a cargar productos, pero para pedidos
     */
    const respuesta = await fetch(`${API_URL}/pedidos`);
    const datos = await respuesta.json();
    
    console.log('✅ Pedidos recibidos:', datos);
    
    if (datos.status === 'ok') {
      mostrarPedidos(datos.data || []);
    }
  } catch (error) {
    console.error('❌ Error al cargar pedidos:', error);
    document.getElementById('pedidosList').innerHTML = `
      <div class="alert alert-danger">
        Error al cargar pedidos
      </div>
    `;
  }
}

/* 
 * 🖼️ MOSTRAR PEDIDOS EN LA PÁGINA:
 * Renderiza la lista de pedidos en tarjetas
 */
function mostrarPedidos(pedidos) {
  const contenedor = document.getElementById('pedidosList');
  contenedor.innerHTML = '';
  
  if (pedidos.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-info text-center">
        <h6>No hay pedidos aún</h6>
        <p class="mb-0 small">Los pedidos aparecerán aquí cuando se realicen compras.</p>
      </div>
    `;
    return;
  }
  
  pedidos.forEach(pedido => {
    const divPedido = document.createElement('div');
    divPedido.className = 'card mb-3';
    
    // Creamos la lista de productos del pedido
    const productosHTML = pedido.productos.map(p => 
      `<li>${p.producto?.nombre || 'Producto eliminado'} - ${p.cantidad} un.</li>`
    ).join('');
    
    divPedido.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h6>👤 ${pedido.cliente}</h6>
          <span class="badge estado-${pedido.estado}">${pedido.estado}</span>
        </div>
        <p><strong>💰 Total: $${pedido.total.toFixed(2)}</strong></p>
        <p><small>📅 ${new Date(pedido.createdAt).toLocaleString()}</small></p>
        <div class="mt-3">
          <h6>📦 Productos:</h6>
          <ul class="small">${productosHTML}</ul>
        </div>
        <div class="mt-3">
          <button class="btn btn-success btn-sm" onclick="cambiarEstadoPedido('${pedido._id}', 'completado')" 
                  ${pedido.estado === 'completado' ? 'disabled' : ''}>
            ✅ Completar
          </button>
          <button class="btn btn-warning btn-sm ms-1" onclick="cambiarEstadoPedido('${pedido._id}', 'cancelado')"
                  ${pedido.estado === 'cancelado' ? 'disabled' : ''}>
            ❌ Cancelar
          </button>
          <button class="btn btn-danger btn-sm ms-1" onclick="eliminarPedido('${pedido._id}', '${pedido.cliente}')">
            🗑️ Eliminar
          </button>
        </div>
      </div>
    `;
    contenedor.appendChild(divPedido);
  });
}

/* 
 * 🔄 CAMBIAR ESTADO DE PEDIDO:
 * Actualiza el estado de un pedido (pendiente → completado/cancelado)
 */
async function cambiarEstadoPedido(id, nuevoEstado) {
  try {
    console.log('🔄 Cambiando estado de pedido:', { id, nuevoEstado });
    
    /* 
     * 🌐 PETICIÓN HTTP PATCH:
     * PATCH se usa para actualizar parcialmente un recurso
     */
    const respuesta = await fetch(`${API_URL}/pedidos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado })
    });
    
    if (respuesta.ok) {
      console.log('✅ Estado de pedido actualizado');
      mostrarMensaje(`Pedido ${nuevoEstado} correctamente`, 'success');
      cargarPedidos(); // Recargamos la lista
    } else {
      throw new Error('Error al actualizar pedido');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    mostrarMensaje('Error al actualizar pedido', 'danger');
  }
}

/* 
 * 🗑️ ELIMINAR PEDIDO:
 * Borra completamente un pedido
 */
async function eliminarPedido(id, cliente) {
  if (!confirm(`¿Eliminar el pedido de ${cliente}?`)) return;
  
  try {
    console.log('🗑️ Eliminando pedido:', id);
    
    const respuesta = await fetch(`${API_URL}/pedidos/${id}`, {
      method: 'DELETE'
    });
    
    if (respuesta.ok) {
      console.log('✅ Pedido eliminado');
      mostrarMensaje('Pedido eliminado correctamente', 'success');
      cargarPedidos();
    } else {
      throw new Error('Error al eliminar pedido');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    mostrarMensaje('Error al eliminar pedido', 'danger');
  }
}

// ==================== 🚀 INICIALIZACIÓN DE LA APLICACIÓN ====================

/* 
 * 🎯 EVENTOS Y CONFIGURACIÓN INICIAL:
 * Este código se ejecuta cuando la página termina de cargar
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Iniciando aplicación...');
  
  /* 
   * 📝 CONFIGURAR FORMULARIO DE PRODUCTOS:
   * Detectamos si es crear nuevo o actualizar existente
   */
  document.getElementById('productoForm').addEventListener('submit', async function(evento) {
    evento.preventDefault();
    
    // Obtenemos los datos del formulario
    const datosProducto = {
      nombre: document.getElementById('nombre').value.trim(),
      precio: parseFloat(document.getElementById('precio').value),
      stock: parseInt(document.getElementById('stock').value) || 0,
      activo: true,
      imagen: document.getElementById('imagen').value.trim() || undefined
    };
    
    // Decidimos si crear o actualizar
    if (editandoProducto) {
      await actualizarProducto(datosProducto);
    } else {
      await crearProducto(evento);
    }
  });
  
  /* 
   * 🛒 CONFIGURAR BOTÓN DE CREAR PEDIDO:
   */
  document.getElementById('crearPedido').addEventListener('click', crearPedido);
  
  /* 
   * 🔄 CONFIGURAR BOTÓN DE REFRESCAR PEDIDOS:
   */
  document.getElementById('refrescarPedidos').addEventListener('click', function() {
    cargarPedidos();
    mostrarMensaje('Pedidos actualizados', 'info');
  });
  
  /* 
   * 🗑️ CONFIGURAR BOTÓN DE LIMPIAR CARRITO:
   */
  document.getElementById('limpiarCarrito').addEventListener('click', function() {
    if (carrito.length > 0 && confirm('¿Limpiar el carrito?')) {
      carrito = [];
      actualizarVistaCarrito();
      mostrarMensaje('Carrito limpiado', 'info');
    }
  });
  
  /* 
   * 📡 CARGAR DATOS INICIALES:
   * Cargamos productos y pedidos cuando la página inicia
   */
  cargarProductos();
  cargarPedidos();
  actualizarVistaCarrito();
  
  // Mensaje de bienvenida
  setTimeout(() => {
    mostrarMensaje('¡Bienvenido a la Tienda Online! 🛒', 'info');
  }, 1000);
  
  console.log('✅ Aplicación iniciada correctamente');
});

/* 
 * 🌐 FUNCIONES GLOBALES:
 * Estas funciones deben ser accesibles desde el HTML (onclick)
 * Las asignamos al objeto window para que sean globales
 */
window.agregarAlCarrito = agregarAlCarrito;
window.quitarDelCarrito = quitarDelCarrito;
window.cambiarCantidad = cambiarCantidad;
window.editarProducto = editarProducto;
window.eliminarProducto = eliminarProducto;
window.cambiarEstadoPedido = cambiarEstadoPedido;
window.eliminarPedido = eliminarPedido;

/* 
 * 📚 RESUMEN PARA ALUMNOS:
 * 
 * 1. CONFIGURACIÓN: API_URL define dónde está nuestro backend
 * 2. ESTADO: Variables globales mantienen el estado de la app
 * 3. PRODUCTOS: Operaciones CRUD completas (Create, Read, Update, Delete)
 * 4. CARRITO: Gestión local del carrito de compras
 * 5. PEDIDOS: Comunicación con backend para gestionar pedidos
 * 6. EVENTOS: Configuración de interacciones del usuario
 * 
 * MÉTODOS HTTP UTILIZADOS:
 * - GET: Obtener datos (productos, pedidos)
 * - POST: Crear nuevos recursos (productos, pedidos)
 * - PUT: Actualizar recursos completos (productos)
 * - PATCH: Actualizar parcialmente (estado de pedidos)
 * - DELETE: Eliminar recursos (productos, pedidos)
 * 
 * ESTRUCTURA DE DATOS:
 * - Productos: {nombre, precio, stock, activo, imagen}
 * - Pedidos: {cliente, productos[{producto, cantidad}], total, estado}
 * - Carrito: [{producto, nombre, precio, cantidad}]
 */
