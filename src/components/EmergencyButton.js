// src/components/EmergencyButton.js
import React, { useState } from 'react';
import './EmergencyButton.css'; // Importar los estilos CSS específicos

function EmergencyButton() {
  // Estado para controlar la visibilidad del modal de emergencia
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir/cerrar el modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Función para llamar a un número (solo funciona en dispositivos móviles)
  const callNumber = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <>
      {/* Botón flotante de emergencia */}
      <button
        className="emergency-float-button"
        onClick={toggleModal}
        aria-label="Reportar emergencia"
      >
        <span className="emergency-icon">🚨</span> {/* Icono de alarma */}
        {/* Puedes cambiar el icono o añadir texto como "Emergencia" */}
      </button>

      {/* Modal de emergencia (se muestra condicionalmente) */}
      {isModalOpen && (
        <div className="emergency-modal-overlay">
          <div className="emergency-modal-content">
            <button className="emergency-modal-close" onClick={toggleModal} aria-label="Cerrar">
              &times; {/* Símbolo de "x" para cerrar */}
            </button>
            <h3 className="emergency-modal-title">Números de Emergencia</h3>
            <p className="emergency-modal-description">
              En caso de emergencia, contacta a los siguientes números:
            </p>
            <ul className="emergency-contact-list">
              <li>
                <strong>Línea de Bomberos Colombia:</strong>{' '}
                <button
                  className="emergency-call-button"
                  onClick={() => callNumber('119')} // Número de emergencia (ej. 119, 911, 123)
                >
                  📞 119
                </button>
              </li>
              <li>
                <strong>Policía Nacional:</strong>{' '}
                <button
                  className="emergency-call-button"
                  onClick={() => callNumber('123')} // Número de policía
                >
                  📞 123
                </button>
              </li>
              <li>
                <strong>Linea de Atencio Bomberos San Alberto:</strong>{' '}
                <button
                  className="emergency-call-button"
                  onClick={() => callNumber('3153538706')} // Número de ambulancia/emergencias médicas
                >
                  📞 315 - 353 - 8706
                </button>
              </li>
            </ul>
            <p className="emergency-modal-footer">
              Mantén la calma y proporciona información clara.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default EmergencyButton;
