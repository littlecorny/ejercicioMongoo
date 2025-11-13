 🛒 Tienda Online - Sistema de Gestión CRUD

🔍 📋 Descripción del Proyecto

Este es un proyecto educativo que implementa una tienda online completa con sistema de gestión de productos y pedidos. Es perfecto para alumnos que están aprendiendo desarrollo web full-stack.

🔍 🚀 Tecnologías Utilizadas

🔍 Backend (Servidor)
- Node.js - Entorno de ejecución JavaScript del lado del servidor
- Express.js - Framework minimalista para crear APIs REST
- MongoDB - Base de datos NoSQL orientada a documentos
- Mongoose - ODM (Object Document Mapper) para MongoDB
- CORS - Para permitir peticiones desde el frontend

🔍 Frontend (Cliente)
- HTML5 - Estructura semántica de la aplicación
- CSS3 - Estilos y diseño responsivo
- JavaScript ES6+ - Lógica del cliente y manipulación del DOM
- Bootstrap 5 - Framework CSS para diseño responsivo
- Bootstrap Icons - Iconografía moderna
- Fetch API - Para comunicación asíncrona con el backend

🔍 📁 Estructura del Proyecto

```
mongoEjercicio1/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               Configuración de MongoDB
│   │   ├── controllers/
│   │   │   ├── productosController.js     Lógica de productos
│   │   │   └── pedidosController.js       Lógica de pedidos
│   │   ├── models/
│   │   │   ├── producto.js         Esquema de productos
│   │   │   └── pedido.js           Esquema de pedidos
│   │   ├── routes/
│   │   │   ├── productos.js        Rutas de productos
│   │   │   └── pedidos.js          Rutas de pedidos
│   │   └── server.js               Servidor principal
│   └── package.json                Dependencias del backend
├── frontend/
│   ├── index.html                  Página principal
│   ├── styles.css                  Estilos personalizados
│   └── app.js                      Lógica del frontend
└── README.md                       Documentación
```

🔍 ⚙️ Instalación y Configuración

🔍 Prerrequisitos
- Node.js (v14 o superior)
- MongoDB (local o MongoDB Atlas)
- Git

🔍 Paso 1: Clonar o descargar el proyecto
```bash
git clone <repository-url>
cd mongoEjercicio1
```

🔍 Paso 2: Configurar el Backend
```bash
cd backend
npm install
```

🔍 Paso 3: Configurar MongoDB
- Asegúrate de tener MongoDB corriendo en `mongodb://localhost:27017`
- O configura tu string de conexión en `backend/src/config/db.js`

🔍 Paso 4: Iniciar el servidor
```bash
cd backend
npm start
```
El servidor se ejecutará en `http://localhost:3000`

🔍 Paso 5: Abrir el Frontend
- Navega a la carpeta `frontend`
- Abre `index.html` en tu navegador
- O usa un servidor local como Live Server de VS Code

🔍 🔧 API Endpoints

🔍 Productos
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener un producto por ID
- `POST /api/productos` - Crear un nuevo producto
- `PUT /api/productos/:id` - Actualizar un producto completo
- `PATCH /api/productos/:id` - Actualizar parcialmente un producto
- `DELETE /api/productos/:id` - Eliminar un producto

🔍 Pedidos
- `GET /api/pedidos` - Obtener todos los pedidos
- `GET /api/pedidos/:id` - Obtener un pedido por ID
- `POST /api/pedidos` - Crear un nuevo pedido
- `PATCH /api/pedidos/:id` - Actualizar un pedido
- `DELETE /api/pedidos/:id` - Eliminar un pedido

🔍 📊 Modelos de Datos

🔍 Producto
```javascript
{
  nombre: String,      // Nombre del producto (requerido)
  precio: Number,      // Precio del producto (requerido, mínimo: 0)
  stock: Number,       // Cantidad en stock (por defecto: 0)
  activo: Boolean,     // Si el producto está activo (por defecto: true)
  imagen: String,      // URL de la imagen (opcional)
  createdAt: Date,     // Fecha de creación (automático)
  updatedAt: Date      // Fecha de actualización (automático)
}
```

🔍 Pedido
```javascript
{
  cliente: String,     // Nombre del cliente (requerido)
  productos: [{        // Array de productos en el pedido
    producto: ObjectId,  // Referencia al producto
    cantidad: Number     // Cantidad pedida
  }],
  total: Number,       // Total del pedido (requerido)
  estado: String,      // 'pendiente', 'completado', 'cancelado'
  createdAt: Date,     // Fecha de creación (automático)
  updatedAt: Date      // Fecha de actualización (automático)
}
```

🔍 🎯 Funcionalidades

🔍 Gestión de Productos
- ✅ Crear productos con imagen
- ✅ Listar todos los productos
- ✅ Editar productos existentes
- ✅ Eliminar productos
- ✅ Control de stock
- ✅ Estado activo/inactivo

🔍 Sistema de Carrito
- ✅ Agregar productos al carrito
- ✅ Modificar cantidades
- ✅ Eliminar productos del carrito
- ✅ Cálculo automático del total
- ✅ Persistencia visual del carrito

🔍 Gestión de Pedidos
- ✅ Crear pedidos desde el carrito
- ✅ Ver historial de pedidos
- ✅ Cambiar estado de pedidos
- ✅ Eliminar pedidos
- ✅ Visualización de productos con populate

🔍 🎨 Características del Frontend

- Diseño Responsivo con Bootstrap 5
- Interfaz Intuitiva para principiantes
- Notificaciones con toasts de Bootstrap
- Iconografía moderna con Bootstrap Icons
- Formularios Validados con feedback visual
- Estados de Carga para mejor UX
- Placeholders para imágenes no disponibles

🔍 📚 Conceptos de Aprendizaje

Este proyecto enseña:

1. Arquitectura Cliente-Servidor
2. APIs RESTful y métodos HTTP
3. CRUD Operations (Create, Read, Update, Delete)
4. Base de Datos NoSQL con MongoDB
5. Modelado de Datos con Mongoose
6. Async/Await y Promises en JavaScript
7. Fetch API para peticiones HTTP
8. DOM Manipulation con JavaScript vanilla
9. CSS Grid y Flexbox
10. Responsive Design con Bootstrap

🔍 🐛 Resolución de Problemas

🔍 El frontend no se conecta al backend
- Verifica que el servidor esté corriendo en `http://localhost:3000`
- Revisa la consola del navegador para errores CORS
- Asegúrate de que MongoDB esté funcionando

🔍 No aparecen las imágenes
- Las URLs de imágenes deben ser públicas
- Usa placeholders cuando no hay imagen disponible
- Verifica que las URLs sean válidas

🔍 Error al crear productos/pedidos
- Revisa que todos los campos requeridos estén completos
- Verifica la conexión a MongoDB
- Comprueba los logs del servidor

🔍 🤝 Contribuciones

Este es un proyecto educativo. Si encuentras errores o tienes sugerencias:

1. Crea un issue describiendo el problema
2. Fork el proyecto
3. Crea una rama para tu feature
4. Commit tus cambios
5. Push a la rama
6. Abre un Pull Request



🔍 👨‍🏫 Para Instructores

Este proyecto está diseñado para ser:
- Progresivo: Se puede enseñar por partes
- Modular: Cada funcionalidad es independiente
- Documentado: Código comentado para facilitar el aprendizaje
- Escalable: Se pueden agregar más funcionalidades

🔍 Sugerencias de Ejercicios
1. Agregar paginación a los productos
2. Implementar filtros de búsqueda
3. Agregar autenticación de usuarios
4. Crear un panel de administración
5. Implementar un sistema de categorías

---

¡Happy Coding! 🚀
