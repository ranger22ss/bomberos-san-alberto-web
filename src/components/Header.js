// src/components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import logoBomberos from '../logo.png';
import fondo from '../Fondo.jpg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (!headerRef.current) return;
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--header-height-desktop', `${height}px`);
      document.documentElement.style.setProperty('--header-height-mobile', `${height}px`);
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <header
      className="header-container"
      style={{ backgroundImage: `url(${fondo})` }}
      ref={headerRef}
    >
      <div className="header-overlay" aria-hidden="true"></div>

      <div className="header-content-wrapper">
        <div className="header-top-bar">
          <div className="header-top-info">
            <span><i className="fas fa-phone-alt" aria-hidden="true"></i> Emergencias 315 353 8706</span>
            <span><i className="fas fa-envelope" aria-hidden="true"></i> cuerpobomberossanalberto@gmail.com</span>
            <span><i className="fas fa-map-marker-alt" aria-hidden="true"></i> San Alberto, Cesar</span>
          </div>
          <span className="header-top-pill">Disponibles 24/7</span>
        </div>

        <div className="header-main-row">
          <div className="header-brand-block">
            <Link to="/" className="header-logo-link" onClick={() => setMenuOpen(false)}>
              <img src={logoBomberos} alt="Logo Cuerpo de Bomberos Voluntarios San Alberto" className="header-logo" />
            </Link>
            <div className="header-identity">
              <p className="header-institution">Cuerpo de Bomberos Voluntarios</p>
              <p className="header-location">San Alberto, Cesar</p>
            </div>
          </div>

          <div className="header-actions">
            <div className="header-message">
              <p>Prevención, respuesta y acompañamiento para su organización.</p>
              <div className="header-cta-group">
                <Link to="/cotizar" className="header-cta primary" onClick={() => setMenuOpen(false)}>
                  Solicitar cotización
                </Link>
                <Link to="/portafolio" className="header-cta secondary" onClick={() => setMenuOpen(false)}>
                  Ver portafolio
                </Link>
              </div>
            </div>

            <button
              className={`nav-toggle ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <nav className={`header-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Menú principal">
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
                  <Link to="/cotizar" className="nav-link" onClick={() => setMenuOpen(false)}>
                    Cotizar
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
                <li className="nav-cta">
                  <a href="tel:3153538706" className="nav-link nav-emergency" onClick={() => setMenuOpen(false)}>
                    <i className="fas fa-fire-extinguisher" aria-hidden="true"></i>
                    Línea de emergencia 315 353 8706
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
