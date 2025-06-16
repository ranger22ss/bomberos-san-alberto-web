// src/components/Noticias.js
import React, { useState, useEffect, useRef } from 'react';
import './Noticias.css'; // ¡Importando el estilo externo como debe ser!


// Importaciones de imágenes y videos (rutas relativas a 'src/components/')
import Acompañamiento1 from '../pictures/Acompañamiento1.jpg';
import Incendio1 from '../pictures/Incendio1.jpg';
import Incendio4 from '../pictures/Incendio4.jpg';
import capacitacion1 from '../pictures/Capacitacion1.jpg';
import Incendio5 from '../pictures/Incendio5.jpg';
import Emergencia2 from '../pictures/Emergencia2.jpg';


import Videoincendio1 from '../videos/Quema1.mp4';
import Videosimulacro1 from '../videos/Capacitacion1.mp4';



const noticiasData = [
  {
    id: 1,
    videoUrl: Videoincendio1,
    titulo: 'Quema Prohibida',
    link: 'https://www.facebook.com/share/v/16SyPiG7sR/',
    descripcion: 'El Cuerpo de Bomberos de San Alberto, Cesar, atendió una emergencia relacionada con una quema prohibida que se estaba desarrollando en el barrio brisas cll2 bs#14-71.'
  },
  {
    id: 2,
    imagen: Acompañamiento1,
    titulo: 'Gran recibimiento de los campeones de la XXV Olimpiada Especial FIDES',
    link: 'https://www.facebook.com/share/p/1Q9tqcZA8i/',
    descripcion: 'Felicitamos de todo corazón a los campeones..'
  },
  {
    id: 3,
    imagen: Incendio1,
    titulo: 'Incendio Eléctrico',
    link: 'https://www.facebook.com/share/p/12GJJwM6kt7/',
    descripcion: 'El cuerpo de bomberos de San Alberto atendió una emergencia el día 06 de junio.'
  },
  {
    id: 4,
    imagen: Incendio5,
    titulo: 'Incendio electrico',
    link: 'https://www.facebook.com/share/p/1Hg692hwjV/',
    descripcion: 'Se atiende incendio de lonchera'
  },
  {
    id: 5,
    imagen: Incendio4,
    titulo: 'Quema Prohibida (Villa Zafiro)',
    link: 'https://www.facebook.com/share/p/197HrSWLSx/',
    descripcion: 'El Cuerpo de Bomberos de San Alberto, Cesar, atendió una emergencia relacionada con una quema prohibida que se estaba desarrollando en la zona ubicada en Villa Zafiro.'
  },
  {
    id: 6,
    videoUrl: Videosimulacro1,
    titulo: 'Capacitación',
    link: 'https://www.facebook.com/share/v/19PHAD3QyN/',
    descripcion: 'El Cuerpo de Bomberos llevó a cabo una jornada de capacitación en colaboración con la empresa Vanti.'
  },

  {
    id: 7,
    imagen: Emergencia2,
    titulo: 'Fuga de gas',
    link: 'https://www.facebook.com/share/p/1QLBgwtmuo/',
    descripcion: 'Participación activa en una fuga de gas que estaba afectando la comunidad'
  },
  {
    id: 8,
    imagen: capacitacion1,
    titulo: 'Capacitacion de cuerpo de bomberos de san alberto',
    link: 'https://www.facebook.com/share/p/1Ri4V8Shj5/',
    descripcion: 'Los bomberos de San Alberto se capacitan en tema de Gestion y Administracion de cuerpo de bomberos'
  },
];

const NOTICIAS_MOSAICO_COUNT = 3;

function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselInnerRef = useRef(null);
  const [isNoticiasHidden, setIsNoticiasHidden] = useState(false);


  const videoRefs = useRef([]);

  useEffect(() => {

    videoRefs.current = videoRefs.current.slice(0, noticiasData.length);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % noticiasData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (carouselInnerRef.current) {
      const offset = -currentIndex * 100;
      carouselInnerRef.current.style.transform = `translateX(${offset}%)`;
    }


    videoRefs.current.forEach((videoElement, index) => {
      if (videoElement) {
        if (index === currentIndex) {
          if (noticiasData[index].videoUrl) {
            videoElement.currentTime = 0;
            videoElement.play().catch(error => {
              console.warn("Autoplay bloqueado para el video principal (asegúrate de que está muted):", error);
            });
          }
        } else {

          if (noticiasData[index].videoUrl) {
            videoElement.pause();
          }
        }
      }
    });

  }, [currentIndex]);


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
