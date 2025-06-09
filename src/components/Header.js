// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Importa el archivo CSS

// !! IMPORTANTE: Asegúrate de que estas rutas sean correctas !!
// Si moviste las imágenes a src/assets/, estas rutas deberían funcionar.
import logoBomberos from '../logo.png';
import fondo from '../Fondo.jpg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect para manejar el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'; // Deshabilita el scroll del body
    } else {
      document.body.style.overflow = 'unset'; // Restaura el scroll del body
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <header className="header-container" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="header-overlay"></div>

      <div className="header-content-wrapper">
        <Link to="/" className="header-logo-link" onClick={() => setMenuOpen(false)}>
          <img src={logoBomberos} alt="Logo Cuerpo de Bomberos" className="header-logo" />
        </Link>

        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>

        <nav className={`header-nav ${menuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/consulta" className="nav-link" onClick={() => setMenuOpen(false)}>
                Consulta
              </Link>
            </li>
            <li>
              <Link to="/portafolio" className="nav-link" onClick={() => setMenuOpen(false)}>
                Portafolio
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="nav-link" onClick={() => setMenuOpen(false)}>
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="nav-link" onClick={() => setMenuOpen(false)}>
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/cotizar" className="nav-link" onClick={() => setMenuOpen(false)}>
                Cotizar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;