// src/components/Noticias.js
import React, { useState, useEffect, useRef } from 'react';
import './Noticias.css'; // Estilo externo
import Emergencia1 from '../pictures/Emergencia1.jpg';
import Emergencia2 from '../pictures/Emergencia2.jpg';
import ImagenExtra1 from '../pictures/Emergencia1.jpg'; 
import ImagenExtra2 from '../pictures/Emergencia2.jpg'; 
import ImagenExtra3 from '../pictures/Emergencia1.jpg';


const noticiasData = [
  { id: 1, imagen: Emergencia1, titulo: 'Incendio en Edificio Central', link: 'https://www.facebook.com/profile.php?id=61563465837882', descripcion: 'Un incendio de grandes proporciones fue controlado por los bomberos en el corazón de la ciudad.' },
  { id: 2, imagen: Emergencia2, titulo: 'Rescate Acuático en Río', link: 'https://www.facebook.com/profile.php?id=61563465837882', descripcion: 'Equipo de rescate logra salvar a dos personas atrapadas por la corriente en el río Caucana.' },
  { id: 3, imagen: ImagenExtra1, titulo: 'Nueva Estación de Bomberos', link: 'https://www.facebook.com/profile.php?id=61563465837882', descripcion: 'Inaugurada la estación "Phoenix", reforzando la capacidad de respuesta en la zona norte.' },
  { id: 4, imagen: ImagenExtra2, titulo: 'Simulacro Masivo de Terremoto', link: 'https://www.facebook.com/profile.php?id=61563465837882', descripcion: 'Con éxito se realizó el simulacro anual, evaluando la preparación de la comunidad ante sismos.' },
  { id: 5, imagen: ImagenExtra3, titulo: 'Campaña de Prevención Incendios', link: 'https://www.facebook.com/profile.php?id=61563465837882', descripcion: 'Iniciada campaña de concientización sobre la importancia de las alarmas de humo en hogares.' },
  { id: 6, imagen: Emergencia1, titulo: 'Accidente de Tránsito Grave', link: 'https://www.facebook.com/profile.php?id=61563465837882', descripcion: 'Rescate de víctimas tras colisión múltiple en la autopista central.' },
  // Agrega más noticias para que el carrusel tenga más elementos
];

const NOTICIAS_MOSAICO_COUNT = 3; // Cuántas noticias en el mini-mosaico

function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselInnerRef = useRef(null); // Referencia para la animación de deslizamiento

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % noticiasData.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cuando el currentIndex cambia, aplicamos la transformación
    if (carouselInnerRef.current) {
      // Calculamos el desplazamiento necesario
      const offset = -currentIndex * 100; // Desplaza 100% por cada índice
      carouselInnerRef.current.style.transform = `translateX(${offset}%)`;
    }
  }, [currentIndex]);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % noticiasData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + noticiasData.length) % noticiasData.length);
  };

  // Noticia principal - NO NECESITAMOS DECLARAR mainNews si solo la usamos una vez en el JSX
  // const mainNews = noticiasData[currentIndex]; // Esta línea es la que se eliminó

  // Noticias para el mini-mosaico
  const getMosaicNews = () => {
    const mosaicNewsItems = []; // Renombramos para claridad
    for (let i = 1; i <= NOTICIAS_MOSAICO_COUNT; i++) {
      mosaicNewsItems.push(noticiasData[(currentIndex + i) % noticiasData.length]);
    }
    return mosaicNewsItems;
  };

  // NO NECESITAMOS DECLARAR mosaicNews aquí si solo la usamos directamente en el mapeo
  // const mosaicNews = getMosaicNews(); // Esta línea es la que se eliminó

  return (
    <div className="noticias-container">
      <h2>Noticias Destacadas</h2>

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
                    // Asegúrate de que los IDs sean únicos si estás mapeando el mismo array varias veces
                    // Para evitar duplicados en 'key', puedes usar una combinación de id y el index en el mosaico
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
  );
}

export default Noticias;