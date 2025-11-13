 🚀 Instrucciones de Ejecución - React Vite

 ⚡ Pasos Para Ejecutar

 1️⃣ Instalar Dependencias
```bash
cd frontend-react-vite
npm install
```

 2️⃣ Verificar que el Backend esté Corriendo
```bash
 En otra terminal:
cd ../backend
npm start

 Debe mostrar: "Servidor corriendo en puerto 3000"
```

 3️⃣ Ejecutar el Frontend Vite
```bash
 Desde frontend-react-vite:
npm run dev
```

 4️⃣ Abrir en el Navegador
- Frontend Vite: `http://localhost:3001`
- Backend API: `http://localhost:3000`

---

 🔍 ¿Qué Observar?

 📊 Conexión con Base de Datos:
- Verás un panel que muestra el estado de conexión con MongoDB
- Si está verde: ✅ Conectado correctamente
- Si está rojo: ❌ Hay un problema de conexión

 🛍️ Productos desde MongoDB:
- Los productos que ves vienen directamente de la base de datos
- Puedes crear nuevos productos con el formulario
- Se guardan automáticamente en MongoDB

 🛒 Carrito (Estado Local):
- El carrito se mantiene solo en memoria
- Si recargas la página, se pierde
- Demuestra la diferencia con los datos persistentes

---

 📚 Comentarios Educativos en el Código

Busca estos archivos para entender useEffect:
- `src/App.jsx` - líneas 45-75 (useEffect explicado)
- `src/components/ProductosSection.jsx` - CRUD completo
- `src/components/ConexionInfo.jsx` - Estado de la conexión

Busca estos patrones:
```jsx
// useEffect básico (una sola vez)
useEffect(() => {
  // código
}, [])

// useEffect con dependencias
useEffect(() => {
  // código  
}, [variable])

// Comunicación con backend
const response = await fetch('/api/productos')
const data = await response.json()
```

---

 ⚡ Diferencias con React Scripts

| Aspecto | Vite | React Scripts |
|-------------|----------|-------------------|
| Comando | `npm run dev` | `npm start` |
| Velocidad | ~200ms inicio | ~3-5s inicio |
| Puerto | 3001 | 3000 |
| Config | vite.config.js | Oculta |

---

 🎯 Objetivos de Aprendizaje

Al usar este proyecto entenderás:

1. 📡 useEffect: Cuándo y cómo se ejecuta
2. 🔄 Conexión DB: Fetch, async/await, estados
3. ⚡ Vite: Ventajas sobre herramientas tradicionales
4. 🎨 UX: Loading states, error handling

¡Disfruta aprendiendo React moderno! 🚀
