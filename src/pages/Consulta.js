// src/pages/Consulta.js
import React, { useState } from 'react';
import './Consulta.css'; // Importa los estilos para la página de consulta
import certificadosData from '../data/certificados.json'; // Importa tus datos de certificados

function Consulta() {
  const [nitBusqueda, setNitBusqueda] = useState('');
  const [resultadoBusqueda, setResultadoBusqueda] = useState(null); // null, 'no_encontrado', o el objeto del certificado
  const [mensajeError, setMensajeError] = useState('');

  // Función para normalizar el NIT: quitar espacios y guiones, convertir a mayúsculas
  const normalizarNit = (nit) => {
    return nit.trim().replace(/[- ]/g, '').toUpperCase();
  };

  // Función para manejar la búsqueda del certificado
  const handleBuscarCertificado = () => {
    setResultadoBusqueda(null); // Limpiar resultado anterior
    setMensajeError(''); // Limpiar mensaje de error anterior

    if (!nitBusqueda.trim()) {
      setMensajeError('Por favor, ingresa un NIT para buscar.');
      return;
    }

    // Normalizar el NIT de búsqueda ingresado por el usuario
    const nitNormalizadoUsuario = normalizarNit(nitBusqueda);

    // Buscar el certificado en los datos
    const certificadoEncontrado = certificadosData.find(
      // Normalizar el NIT de cada certificado en el JSON para la comparación
      (cert) => normalizarNit(cert.nit) === nitNormalizadoUsuario
    );

    if (certificadoEncontrado) {
      // Si se encuentra el certificado, determinar su estado de vigencia
      const fechaVencimiento = new Date(certificadoEncontrado.fechaVencimiento);
      const hoy = new Date();
      
      // Ajustar hoy a medianoche para una comparación precisa solo con la fecha
      hoy.setHours(0, 0, 0, 0); 
      fechaVencimiento.setHours(0, 0, 0, 0);

      let estadoVigencia;
      if (fechaVencimiento >= hoy) {
        estadoVigencia = 'Vigente';
      } else {
        estadoVigencia = 'Vencido';
      }
      setResultadoBusqueda({ ...certificadoEncontrado, estadoVigencia });
    } else {
      setResultadoBusqueda('no_encontrado');
    }
  };

  return (
    <div className="consulta-container">
      <h1 className="consulta-title">Consulta de Certificados de Inspecion de seguridad huamana contra incendios</h1>
      <p className="consulta-description">Ingresa el NIT de la empresa para verificar la vigencia de su certificado. Agrega el cv de tu establecimiento con un "-"</p>

      <div className="search-box">
        <input
          type="text"
          className="nit-input"
          placeholder="Ej: 824006767-7 o 824006767"
          value={nitBusqueda}
          onChange={(e) => setNitBusqueda(e.target.value)}
          onKeyPress={(e) => { // Permite buscar al presionar Enter
            if (e.key === 'Enter') {
              handleBuscarCertificado();
            }
          }}
        />
        <button className="search-button" onClick={handleBuscarCertificado}>
          Buscar Certificado
        </button>
      </div>

      {mensajeError && <p className="error-message">{mensajeError}</p>}

      {resultadoBusqueda && (
        <div className="results-box">
          {resultadoBusqueda === 'no_encontrado' ? (
            <p className="not-found-message">No se encontró ningún certificado con el NIT: <strong>{nitBusqueda}</strong>. Por favor, verifica el número e intenta de nuevo.</p>
          ) : (
            <div className={`certificate-details ${resultadoBusqueda.estadoVigencia === 'Vigente' ? 'vigente' : 'vencido'}`}>
              <h3>Detalles del Certificado</h3>
              <p><strong>NIT:</strong> {resultadoBusqueda.nit}</p>
              <p><strong>Empresa:</strong> {resultadoBusqueda.nombreEmpresa}</p>
              <p><strong>Dirección:</strong> {resultadoBusqueda.direccion}</p>
              <p><strong>Expedido el:</strong> {resultadoBusqueda.fechaExpedicion}</p>
              <p><strong>Vencimiento el:</strong> {resultadoBusqueda.fechaVencimiento}</p>
              <p className="status-label">
                <strong>Estado:</strong> 
                <span className={`status-text ${resultadoBusqueda.estadoVigencia.toLowerCase()}`}>
                  {resultadoBusqueda.estadoVigencia}
                </span>
              </p>
              {resultadoBusqueda.estadoVigencia === 'Vencido' && (
                <p className="action-required-message">Su certificado se encuentra VENCIDO. Por favor, comuníquese con nosotros para iniciar el proceso de renovación.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Consulta;