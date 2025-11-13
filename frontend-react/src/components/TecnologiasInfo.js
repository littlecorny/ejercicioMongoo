/*
 * 📚 COMPONENTE TECNOLOGIAS INFO
 * 
 * Componente informativo sobre las tecnologías utilizadas.
 * Es un componente simple sin estado (stateless).
 */

import React from 'react';

function TecnologiasInfo() {
  return (
    <section id="tecnologias" className="mb-5">
      <div className="card">
        <div className="card-header bg-info text-white">
          <h3 className="card-title mb-0">
            <i className="bi bi-gear-fill"></i>
            Tecnologías Utilizadas - Versión React
          </h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5><i className="bi bi-server text-danger"></i> Backend (Servidor)</h5>
              <ul className="list-unstyled">
                <li><i className="bi bi-check-circle text-success"></i> <strong>Node.js</strong> - Entorno de ejecución JavaScript</li>
                <li><i className="bi bi-check-circle text-success"></i> <strong>Express.js</strong> - Framework para crear APIs REST</li>
                <li><i className="bi bi-check-circle text-success"></i> <strong>MongoDB</strong> - Base de datos NoSQL</li>
                <li><i className="bi bi-check-circle text-success"></i> <strong>Mongoose</strong> - ODM para MongoDB</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h5><i className="bi bi-browser-chrome text-primary"></i> Frontend React</h5>
              <ul className="list-unstyled">
                <li><i className="bi bi-check-circle text-success"></i> <strong>React 18</strong> - Librería para interfaces de usuario</li>
                <li><i className="bi bi-check-circle text-success"></i> <strong>JSX</strong> - Sintaxis que combina JS + HTML</li>
                <li><i className="bi bi-check-circle text-success"></i> <strong>Hooks</strong> - useState, useEffect</li>
                <li><i className="bi bi-check-circle text-success"></i> <strong>Bootstrap 5</strong> - Framework CSS</li>
                <li><i className="bi bi-check-circle text-success"></i> <strong>Componentes</strong> - Arquitectura modular</li>
              </ul>
            </div>
          </div>
          <div className="alert alert-info mt-3">
            <i className="bi bi-lightbulb"></i>
            <strong>React vs JavaScript Vanilla:</strong> React nos permite crear interfaces más organizadas 
            con componentes reutilizables, estado reactivo y mejor mantenimiento del código.
          </div>
        </div>
      </div>
    </section>
  );
}

export default TecnologiasInfo;
