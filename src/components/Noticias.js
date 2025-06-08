// src/components/Noticias.js
import React, { useState, useEffect, useRef } from 'react';
import './Noticias.css'; // Estilo externo
import Acompañamiento1 from '../pictures/Acompañamiento1.jpg';
import Emergencia1 from '../pictures/Emergencia1.jpg';
import Incendio1 from '../pictures/Incendio1.jpg'; 
import Incendio2 from '../pictures/Incendio2.jpg'; 
import Incendio3 from '../pictures/Incendio3.jpg';
import Acompañamiento2 from '../pictures/Acompañamiento2.jpg';

const noticiasData = [
  { id: 1, imagen: Emergencia1, titulo: 'Materiales peligrosos', link: 'https://www.facebook.com/share/p/1LHHv6j9Jc/', descripcion: 'Un derrame de un material combustible fue atendido por bomberos' },
  { id: 2, imagen: Acompañamiento1, titulo: 'Gran recibimiento de los campeones de la XXV Olimpiada Especial FIDES.o', link: 'https://www.facebook.com/share/p/1Q9tqcZA8i/', descripcion: 'Felicitamos de todo corazón a los campeones..' },
  { id: 3, imagen: Incendio1, titulo: 'Incendio Electrico', link: 'https://www.facebook.com/share/p/12GJJwM6kt7/', descripcion: 'El cuerpo de bomberos de San Alberto atendió una emergencia el día 06 de junio.' },
  { id: 4, imagen: Incendio2, titulo: 'Incendio Vehicular', link: 'https://www.facebook.com/share/p/18sViYYDbQ/', descripcion: 'En la madrugada del 3 de junio de 2025, siendo las 3:00 a.m. aproximadamente el Cuerpo de Bomberos sale de manera inmediata con (3) unidades y (1) carro tanque a atender un incendio vehicular en la vía San Alberto – La Esperanza, Norte de Santander. ' },
  { id: 5, imagen: Incendio3, titulo: 'Incendio Estructural', link: 'https://www.facebook.com/share/p/16LYL9EZDy/', descripcion: 'El día 30 de mayo de 2025, siendo las 18:05 horas, el Cuerpo de Bomberos de San Alberto, César, atendió un incendio estructural.' },
  { id: 6, imagen: Acompañamiento2, titulo: 'Acompañamiento', link: 'https://www.facebook.com/share/p/1KnWqvgWKQ/', descripcion: 'Acompañamiento cumpleaños de San Alberto - Cesar.' },
  // Agrega más noticias para que el carrusel tenga más elementos
];

const NOTICIAS_MOSAICO_COUNT = 3; // Cuántas noticias en el mini-mosaico

function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselInnerRef = useRef(null); // Referencia para la animación de deslizamiento
  // NUEVO ESTADO: Para controlar si las noticias están ocultas
  const [isNoticiasHidden, setIsNoticiasHidden] = useState(false); // Por defecto, visibles

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % noticiasData.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cuando el currentIndex cambia, aplicamos la transformación
    if (carouselInnerRef.current) {
      const offset = -currentIndex * 100;
      carouselInnerRef.current.style.transform = `translateX(${offset}%)`;
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % noticiasData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + noticiasData.length) % noticiasData.length);
  };

  // NUEVA FUNCIÓN: Para alternar la visibilidad de las noticias
  const toggleNoticiasVisibility = () => {
    setIsNoticiasHidden(!isNoticiasHidden);
  };

  const getMosaicNews = () => {
    const mosaicNewsItems = [];
    for (let i = 1; i <= NOTICIAS_MOSAICO_COUNT; i++) {
      mosaicNewsItems.push(noticiasData[(currentIndex + i) % noticiasData.length]);
    }
    return mosaicNewsItems;
  };

  return (
    <div className="noticias-container">
      <h2 className="noticias-header-toggle">
        Noticias Destacadas
        {/* NUEVO BOTÓN: Para ocultar/mostrar */}
        <button 
          className="toggle-button" 
          onClick={toggleNoticiasVisibility}
          aria-expanded={!isNoticiasHidden} // Para accesibilidad
        >
          {isNoticiasHidden ? 'Mostrar Noticias' : 'Ocultar Noticias'}
        </button>
      </h2>

      {/* NUEVO: Contenedor condicional para ocultar/mostrar */}
      {/* Añadimos una clase 'hidden' si isNoticiasHidden es true */}
      <div className={`noticias-content-wrapper ${isNoticiasHidden ? 'hidden' : ''}`}>
        <div className="carousel-wrapper">
          <div className="carousel-inner" ref={carouselInnerRef}>
            {noticiasData.map((noticiaItem, index) => (
              <div key={noticiaItem.id} className="carousel-slide" style={{ minWidth: '100%' }}>
                <div className="main-news-item">
                  <img src={noticiaItem.imagen} alt={noticiaItem.titulo} onClick={() => window.open(noticiaItem.link, '_blank')} />
                  <div className="main-news-info">
                    <h3>{noticiaItem.titulo}</h3>
                    <p>{noticiaItem.descripcion}</p>
                  </div>
                </div>

                <div className="mini-mosaico">
                  {getMosaicNews().map((mosaicItem, mosaicIndex) => (
                      <div key={`${mosaicItem.id}-${mosaicIndex}`} className="mini-mosaico-item" onClick={() => window.open(mosaicItem.link, '_blank')}>
                        <img src={mosaicItem.imagen} alt={mosaicItem.titulo} />
                        <p>{mosaicItem.titulo}</p>
                      </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-controls">
          <button onClick={prevSlide}>&#10094;</button>
          <button onClick={nextSlide}>&#10095;</button>
        </div>
      </div>
    </div>
  );
}

export default Noticias;