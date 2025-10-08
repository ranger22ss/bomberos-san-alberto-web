import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logoBomberos from '../logo.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ventasOpen, setVentasOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    if (menuOpen) {
      setVentasOpen(false);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setVentasOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `navbar-link${isActive ? ' active' : ''}`;

  return (
    <nav className={`navbar${menuOpen ? ' open' : ''}`}>
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <img
            src={logoBomberos}
            alt="Logo Cuerpo de Bomberos Voluntarios San Alberto"
            className="navbar-logo__image"
          />
          <span className="navbar-logo__text">
            <span className="navbar-logo__highlight">Bomberos</span>
            <span className="navbar-logo__city">San Alberto</span>
          </span>
        </NavLink>

        <button
          className={`menu-toggle${menuOpen ? ' active' : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-links${menuOpen ? ' visible' : ''}`}>
          <li>
            <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/nosotros" className={navLinkClass} onClick={closeMenu}>
              Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink to="/consulta" className={navLinkClass} onClick={closeMenu}>
              Consulta
            </NavLink>
          </li>
          <li
            className={`navbar-dropdown${ventasOpen ? ' open' : ''}`}
            onMouseEnter={() => setVentasOpen(true)}
            onMouseLeave={() => setVentasOpen(false)}
          >
            <button
              className="dropdown-trigger"
              type="button"
              onClick={() => setVentasOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={ventasOpen}
            >
              Ventas
              <span className="dropdown-arrow" aria-hidden="true"></span>
            </button>
            <div className="dropdown-menu">
              <NavLink
                to="/portafolio"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Portafolio
              </NavLink>
              <NavLink
                to="/cotizar"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Cotizar
              </NavLink>
            </div>
          </li>
          <li>
            <NavLink to="/contacto" className={navLinkClass} onClick={closeMenu}>
              Contacto
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
