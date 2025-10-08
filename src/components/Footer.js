// src/components/Footer/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="modern-footer">
      <div className="footer-content-wrapper">
        <div className="footer-section footer-logo-section">
          <h3 className="footer-title">Cuerpo de Bomberos Voluntarios</h3>
          <p className="footer-tagline">Proteger y Servir a la Comunidad</p>
          <div className="footer-badge">
            <span className="footer-badge__value">+15</span>
            <span className="footer-badge__label">Años de experiencia</span>
          </div>
        </div>

        <div className="footer-section footer-contact-section">
          <h4 className="section-title">Contáctanos</h4>
          <ul className="contact-list">
            <li>
              Emergencias: <a href="tel:+573153538706" className="footer-link">315-353-8706</a>
            </li>
            <li>
              Atención al Cliente: <a href="tel:+573001751212" className="footer-link">300-175-1212</a>
            </li>
            <li>
              <a href="mailto:cuerpobomberosanalberto@gmail.com" className="footer-link">
                cuerpobomberosanalberto@gmail.com
              </a>
            </li>
            <li>
              <a href="mailto:cuerpobomberosvoluntariossanalberto@gmail.com" className="footer-link">
                cuerpobomberosvoluntariossanalberto@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section footer-nav-section">
          <h4 className="section-title">Navegación</h4>
          <ul className="footer-nav-list">
            <li><Link to="/" className="footer-link">Inicio</Link></li>
            <li><Link to="/nosotros" className="footer-link">Nosotros</Link></li>
            <li><Link to="/consulta" className="footer-link">Consulta</Link></li>
            <li><Link to="/portafolio" className="footer-link">Portafolio</Link></li>
            <li><Link to="/cotizar" className="footer-link">Cotizar</Link></li>
            <li><Link to="/contacto" className="footer-link">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-section footer-social-section">
          <h4 className="section-title">Síguenos</h4>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/BomberosSanAlbertoCesar/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link social-text-link"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Cuerpo de Bomberos Voluntarios de San Alberto, Cesar. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
