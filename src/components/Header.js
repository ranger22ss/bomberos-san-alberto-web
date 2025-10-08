// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import logoBomberos from '../logo.png';
import fondo from '../Fondo.jpg';

function Header() {
  return (
    <header
      className="header-container"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="header-overlay" aria-hidden="true"></div>
      <div className="header-glow" aria-hidden="true"></div>

      <div className="header-top-bar">
        <div className="header-top-info">
          <span>
            <i className="fas fa-phone-alt" aria-hidden="true"></i>
            Emergencias 315 353 8706
          </span>
          <span>
            <i className="fas fa-envelope" aria-hidden="true"></i>
            cuerpobomberossanalberto@gmail.com
          </span>
          <span>
            <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
            San Alberto, Cesar
          </span>
        </div>
        <span className="header-top-pill">Disponibles 24/7</span>
      </div>

      <div className="header-main">
        <div className="header-brand-block">
          <Link to="/" className="header-logo-link">
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

        <div className="header-hero">
          <p className="header-hero-eyebrow">Protección, respuesta y prevención</p>
          <h1 className="header-hero-title">
            Listos para cuidar a San Alberto con tecnología, experiencia y vocación
          </h1>
          <p className="header-hero-description">
            Brindamos acompañamiento integral en gestión del riesgo, emergencias y soluciones logísticas.
            Nuestro equipo operativo permanece activo 24/7 para responder cuando más lo necesitas.
          </p>
          <div className="header-cta-group">
            <Link to="/consulta" className="header-cta primary">
              Consultar certificados
            </Link>
            <Link to="/contacto" className="header-cta ghost">
              Contactar ahora
            </Link>
          </div>
          <div className="header-badges">
            <div className="header-badge">
              <span className="badge-value">+15</span>
              <span className="badge-label">Años de servicio</span>
            </div>
            <div className="header-badge">
              <span className="badge-value">24/7</span>
              <span className="badge-label">Respuesta operativa</span>
            </div>
            <div className="header-badge">
              <span className="badge-value">+120</span>
              <span className="badge-label">Aliados atendidos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="header-bottom-wave" aria-hidden="true"></div>
      <div className="header-floating-spark spark-one" aria-hidden="true"></div>
      <div className="header-floating-spark spark-two" aria-hidden="true"></div>
    </header>
  );
}

export default Header;
