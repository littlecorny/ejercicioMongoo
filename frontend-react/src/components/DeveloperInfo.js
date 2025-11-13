/*
 * 👨‍💻 COMPONENTE DEVELOPER INFO
 * 
 * Información sobre el desarrollador del proyecto.
 * Conceptos:
 * - Componente estático
 * - Estructura de presentación
 * - Enlaces externos
 */

import React from 'react';

function DeveloperInfo() {
  return (
    <section id="developer" className="mb-4">
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h4 className="card-title mb-0">
            <i className="bi bi-code-slash"></i>
            Acerca del Desarrollador
          </h4>
        </div>
        
        <div className="card-body text-center">
          
          {/* 📷 AVATAR DEL DESARROLLADOR */}
          <div className="mb-3">
            <div 
              className="developer-avatar mx-auto"
              style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#f8f9fa',
                border: '3px solid #dee2e6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* 🔄 AQUÍ PUEDES PONER TU FOTO */}
              <i className="bi bi-person-circle fs-1 text-muted"></i>
            </div>
          </div>

          {/* 📝 INFORMACIÓN PERSONAL */}
          <h5 className="mb-2">Tu Nombre Aquí</h5>
          <p className="text-muted mb-3">
            Estudiante de Programación Web
          </p>

          {/* 🛠️ TECNOLOGÍAS UTILIZADAS */}
          <div className="row g-2 mb-4">
            <div className="col-6 col-md-3">
              <div className="skill-badge">
                <i className="bi bi-filetype-js text-warning"></i>
                <small>JavaScript</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="skill-badge">
                <span className="text-info">⚛️</span>
                <small>React</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="skill-badge">
                <i className="bi bi-server text-success"></i>
                <small>Node.js</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="skill-badge">
                <i className="bi bi-database text-success"></i>
                <small>MongoDB</small>
              </div>
            </div>
          </div>

          {/* 📊 ESTADÍSTICAS DEL PROYECTO */}
          <div className="row text-center mb-4">
            <div className="col-4">
              <div className="stat-card">
                <i className="bi bi-code-square fs-4 text-primary"></i>
                <div className="fw-bold">Full Stack</div>
                <small className="text-muted">MERN</small>
              </div>
            </div>
            <div className="col-4">
              <div className="stat-card">
                <i className="bi bi-palette fs-4 text-warning"></i>
                <div className="fw-bold">Bootstrap 5</div>
                <small className="text-muted">UI Framework</small>
              </div>
            </div>
            <div className="col-4">
              <div className="stat-card">
                <i className="bi bi-mortarboard fs-4 text-success"></i>
                <div className="fw-bold">Educativo</div>
                <small className="text-muted">Para Aprender</small>
              </div>
            </div>
          </div>

          {/* 🔗 ENLACES SOCIALES */}
          <div className="d-flex justify-content-center gap-3">
            <a 
              href="https://github.com/tu-usuario" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline-dark btn-sm"
              title="GitHub Profile"
            >
              <i className="bi bi-github"></i>
              GitHub
            </a>
            
            <a 
              href="https://linkedin.com/in/tu-perfil" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline-primary btn-sm"
              title="LinkedIn Profile"
            >
              <i className="bi bi-linkedin"></i>
              LinkedIn
            </a>
            
            <a 
              href="mailto:tu-email@ejemplo.com" 
              className="btn btn-outline-success btn-sm"
              title="Enviar Email"
            >
              <i className="bi bi-envelope"></i>
              Email
            </a>
          </div>

          {/* 📄 MENSAJE FINAL */}
          <div className="mt-4 p-3 bg-light rounded">
            <small className="text-muted">
              <i className="bi bi-lightbulb text-warning"></i>
              Este proyecto demuestra un CRUD completo con 
              <strong> MongoDB, Express, React y Node.js</strong>.
              Perfecto para aprender desarrollo web moderno.
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeveloperInfo;

/*
 * 📚 CONCEPTOS APRENDIDOS:
 * 
 * 1. COMPONENTE ESTÁTICO: sin estado ni props
 * 2. INLINE STYLES: estilos directos en JSX
 * 3. ENLACES EXTERNOS: target="_blank", rel="noopener"
 * 4. ICONOS: Bootstrap Icons
 * 5. GRID SYSTEM: row, col-*
 * 6. UTILITY CLASSES: text-*, bg-*, fw-*
 * 7. COMPONENTE DE PRESENTACIÓN: solo UI
 */
