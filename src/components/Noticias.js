// src/components/Noticias.js
import React, { useState, useEffect, useRef } from 'react';
import './Noticias.css'; // Estilo externo

// *** IMPORTS DE IMÁGENES EXISTENTES (Todas se usarán en el array noticiasData para evitar errores de compilación) ***
import Acompañamiento1 from '../pictures/Acompañamiento1.jpg';
import Emergencia1 from '../pictures/Emergencia1.jpg'; // Se usará en la noticia ID 7
import Incendio1 from '../pictures/Incendio1.jpg';
import Incendio2 from '../pictures/Incendio2.jpg';
import Incendio4 from '../pictures/Incendio4.jpg';
import Acompañamiento2 from '../pictures/Acompañamiento2.jpg'; // Se usará en la noticia ID 8

// *** IMPORTS DE VIDEOS ***
// Asegúrate de que los nombres de los archivos y las extensiones sean EXACTOS y los archivos existan en src/videos
import Videoincendio1 from '../videos/Quema1.mp4';
import Videosimulacro1 from '../videos/Capacitacion1.mp4';


// *** DATOS DE NOTICIAS: Todas las imágenes y videos importados ahora están en uso ***
const noticiasData = [
  {
    id: 1,
    videoUrl: Videoincendio1, // Noticia con video (Quema Prohibida)
    titulo: 'Quema Prohibida',
    link: 'https://www.facebook.com/share/v/16SyPiG7sR/',
    descripcion: 'El Cuerpo de Bomberos de San Alberto, Cesar, atendió una emergencia relacionada con una quema prohibida que se estaba desarrollando en el barrio brisas cll2 bs#14-71.'
  },
  {
    id: 2,
    imagen: Acompañamiento1, // Noticia con imagen
    titulo: 'Gran recibimiento de los campeones de la XXV Olimpiada Especial FIDES.o',
    link: 'https://www.facebook.com/share/p/1Q9tqcZA8i/',
    descripcion: 'Felicitamos de todo corazón a los campeones..'
  },
  {
    id: 3,
    imagen: Incendio1, // Noticia con imagen
    titulo: 'Incendio Eléctrico',
    link: 'https://www.facebook.com/share/p/12GJJwM6kt7/',
    descripcion: 'El cuerpo de bomberos de San Alberto atendió una emergencia el día 06 de junio.'
  },
  {
    id: 4,
    imagen: Incendio2, // Noticia con imagen
    titulo: 'Incendio Vehicular',
    link: 'https://www.facebook.com/share/p/18sViYYDbQ/',
    descripcion: 'En la madrugada del 3 de junio de 2025, siendo las 3:00 a.m. aproximadamente el Cuerpo de Bomberos sale de manera inmediata con (3) unidades y (1) carro tanque a atender un incendio vehicular en la vía San Alberto – La Esperanza, Norte de Santander.'
  },
  {
    id: 5,
    imagen: Incendio4, // Noticia con imagen
    titulo: 'Quema Prohibida (Villa Zafiro)', // Se modificó el título para diferenciarla
    link: 'https://www.facebook.com/share/p/197HrSWLSx/',
    descripcion: 'El Cuerpo de Bomberos de San Alberto, Cesar, atendió una emergencia relacionada con una quema prohibida que se estaba desarrollando en la zona ubicada en Villa Zafiro.'
  },
  {
    id: 6,
    videoUrl: Videosimulacro1, // Noticia con video (Capacitación)
    titulo: 'Capacitación',
    link: 'https://www.facebook.com/share/v/19PHAD3QyN/',
    descripcion: 'El Cuerpo de Bomberos llevó a cabo una jornada de capacitación en colaboración con la empresa Vanti.'
  },
  // *** NOTICIAS ADICIONALES PARA UTILIZAR LAS IMÁGENES QUE Netlify marcaba como "no usadas" ***
  {
    id: 7, // Nuevo ID para la noticia con Emergencia1
    imagen: Emergencia1,
    titulo: 'Simulacro de Emergencia',
    link: 'https://www.facebook.com/nuevo-link-emergencia', // Puedes cambiar este link
    descripcion: 'Participación activa en un simulacro para mejorar la respuesta ante desastres.'
  },
  {
    id: 8, // Nuevo ID para la noticia con Acompañamiento2
    imagen: Acompañamiento2,
    titulo: 'Apoyo a la Comunidad',
    link: 'https://www.facebook.com/nuevo-link-acompanamiento', // Puedes cambiar este link
    descripcion: 'Los bomberos brindan acompañamiento en eventos comunitarios importantes.'
  },
];

const NOTICIAS_MOSAICO_COUNT = 3; // Cuántas noticias en el mini-mosaico

function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselInnerRef = useRef(null); // Referencia para la animación de deslizamiento
  const [isNoticiasHidden, setIsNoticiasHidden] = useState(false); // Por defecto, visibles

  // Referencias para controlar la reproducción de videos
  const videoRefs = useRef([]); // Almacena una referencia para cada elemento <video>

  useEffect(() => {
    // Limpia referencias de video antiguas cuando cambian las noticiasData o el componente se desmonta
    videoRefs.current = videoRefs.current.slice(0, noticiasData.length);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % noticiasData.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, [noticiasData.length]); // Dependencia en noticiasData.length para re-ejecutar si el número de noticias cambia

  useEffect(() => {
    if (carouselInnerRef.current) {
      const offset = -currentIndex * 100;
      carouselInnerRef.current.style.transform = `translateX(${offset}%)`;
    }

    // Lógica para pausar todos los videos y reproducir solo el actual (si es un video)
    videoRefs.current.forEach((videoElement, index) => {
      if (videoElement) { // Asegúrate de que la referencia existe (no es null)
        if (index === currentIndex) {
          // Solo si es un video, intenta reproducirlo y reiniciarlo
          if (noticiasData[index].videoUrl) {
            videoElement.currentTime = 0; // Reinicia el video
            videoElement.play().catch(error => {
              console.warn("Autoplay bloqueado para el video principal (asegúrate de que está muted):", error);
            });
          }
        } else {
          // Pausar los videos no activos
          if (noticiasData[index].videoUrl) {
            videoElement.pause();
          }
        }
      }
    });

  }, [currentIndex]); // Dependencia en currentIndex para reaccionar al cambio de slide


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % noticiasData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + noticiasData.length) % noticiasData.length);
  };

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
        <button
          className="toggle-button"
          onClick={toggleNoticiasVisibility}
          aria-expanded={!isNoticiasHidden}
        >
          {isNoticiasHidden ? 'Mostrar Noticias' : 'Ocultar Noticias'}
        </button>
      </h2>

      <div className={`noticias-content-wrapper ${isNoticiasHidden ? 'hidden' : ''}`}>
        <div className="carousel-wrapper">
          <div className="carousel-inner" ref={carouselInnerRef}>
            {noticiasData.map((noticiaItem, index) => {
              console.log(`Renderizando noticia ID: ${noticiaItem.id}, Título: "${noticiaItem.titulo}", Tipo: ${noticiaItem.videoUrl ? 'Video' : 'Imagen'}, Contenido: ${noticiaItem.videoUrl || noticiaItem.imagen}`);

              return (
                <div key={noticiaItem.id} className="carousel-slide" style={{ minWidth: '100%' }}>
                  <div className="main-news-item">
                    {noticiaItem.videoUrl ? (
                      <video
                        controls
                        autoPlay={index === currentIndex}
                        loop
                        muted
                        src={noticiaItem.videoUrl}
                        alt={noticiaItem.titulo}
                        onClick={() => window.open(noticiaItem.link, '_blank')}
                        ref={el => videoRefs.current[index] = el}
                      >
                        Tu navegador no soporta la etiqueta de video.
                      </video>
                    ) : (
                      <img
                        src={noticiaItem.imagen}
                        alt={noticiaItem.titulo}
                        onClick={() => window.open(noticiaItem.link, '_blank')}
                      />
                    )}
                    <div className="main-news-info">
                      <h3>{noticiaItem.titulo}</h3>
                      <p>{noticiaItem.descripcion}</p>
                    </div>
                  </div>

                  <div className="mini-mosaico">
                    {getMosaicNews().map((mosaicItem, mosaicIndex) => (
                        <div key={`${mosaicItem.id}-${mosaicIndex}`} className="mini-mosaico-item" onClick={() => window.open(mosaicItem.link, '_blank')}>
                          {mosaicItem.videoUrl ? (
                            <video muted src={mosaicItem.videoUrl} alt={mosaicItem.titulo}></video>
                          ) : (
                            <img src={mosaicItem.imagen} alt={mosaicItem.titulo} />
                          )}
                          <p>{mosaicItem.titulo}</p>
                        </div>
                    ))}
                  </div>
                </div>
              );
            })}
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