import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🔧 CONFIGURACIÓN DE VITE
// Este archivo le dice a Vite cómo construir y servir nuestra aplicación

// https://vitejs.dev/config/
export default defineConfig({
  // 🔌 PLUGINS: Herramientas que Vite usará
  plugins: [react()], // Plugin para compilar React/JSX
  
  // 🌐 CONFIGURACIÓN DEL SERVIDOR DE DESARROLLO
  server: {
    port: 3001, // Puerto donde se ejecutará (para no chocar con el backend en 3000)
    
    // 🔄 PROXY: Redirigir peticiones API al backend
    proxy: {
      '/api': {
        target: 'http://localhost:3000',    // Backend en puerto 3000
        changeOrigin: true,                 // Cambiar el origin para evitar problemas CORS
        rewrite: (path) => path             // Mantener la ruta tal como está
      }
    }
  },
  
  // 🏗️ CONFIGURACIÓN DE BUILD (construcción para producción)
  build: {
    outDir: 'dist',                        // Carpeta donde se genera el build
    sourcemap: true                        // Generar sourcemaps para debugging
  }
})

/*
 * 📚 DIFERENCIAS CLAVE VITE vs REACT SCRIPTS:
 * 
 * 1. VELOCIDAD: Vite es mucho más rápido en desarrollo
 * 2. CONFIGURACIÓN: Más flexible y personalizable
 * 3. HOT MODULE REPLACEMENT: Recarga instantánea de cambios
 * 4. BUNDLING: Usa esbuild (más rápido que webpack)
 */
