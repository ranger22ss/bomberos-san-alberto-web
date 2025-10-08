// src/components/Header.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import logoBomberos from '../logo.png';
import fondo from '../Fondo.jpg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // Evitar scroll cuando el menú está abierto en móvil
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Ajustar altura dinámica del header
  const updateHeaderHeight = useCallback(() => {
    if (!headerRef.current) return;
    const height = headerRef.current.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  }, []);

  useEffect(() => {
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [updateHeaderHeight]);

  return (
    <header
      className="header-container"
      style={{ backgroundImage: `url(${fondo})` }}
      ref={headerRef}
    >
      <div className="header-overlay"></div>

      {/* Top bar: contacto */}
      <div className="header-top-bar">
        <div className="header-top-info">
          <span><i className="fas fa-phone-alt"></i> Emergencias 315 353 8706</span>
          <span><i className="fas fa-envelope"></i> cuerpobomberossanalberto@gmail.com</span>
          <span><i className="fas fa-map-marker-alt"></i> San Alberto, Cesar</span>
        </div>
        <span className="header-top-pill">Disponibles 24/7</span>
      </div>

      {/* Cuerpo principal */}
      <div className="header-main-row">
        {/* Logo e identidad */}
        <div className="header-brand-block">
          <Link to="/" className="header-logo-link" onClick={() => setMenuOpen(false)}>
            <img
              src={logoBomberos}
              alt="Logo Cuerpo de Bomberos Voluntarios San Alberto"
              className="header-logo"
            />
          </Link>
          <div className="header-identity">
            <p className="header-institution">Cuerpo de Bomberos Voluntarios</p>
            <p className="header-location">San Alberto, Cesar</p>
          </div>
        </div>

        {/* Menú y acciones */}
        <div className="header-controls">
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
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
              <li><Link to="/consulta" onClick={() => setMenuOpen(false)}>Consulta</Link></li>
              <li><Link to="/portafolio" onClick={() => setMenuOpen(false)}>Portafolio</Link></li>
              <li><Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link></li>
              <li><Link to="/nosotros" onClick={() => setMenuOpen(false)}>Nosotros</Link></li>
              <li className="nav-cta">
                <a href="tel:3153538706" className="nav-emergency" onClick={() => setMenuOpen(false)}>
                  <i className="fas fa-fire-extinguisher"></i> Emergencias 315 353 8706
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
