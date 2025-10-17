// src/components/Noticias.js
import React, { useState, useEffect, useRef } from 'react';
import './Noticias.css'; // ¡Importando el estilo externo como debe ser!


// Importaciones de imágenes y videos (rutas relativas a 'src/components/')
import Arbol from '..src\pictures\arbol.jpg'
import Capacitacioncuerda from '..src/pictures/cuerdas.jpg';
import Enfermeria from '..src/pictures/enfermeria.jpg';
import Quemaprohi from '..src/pictures/quemaprohibida.jpg';
import Electrico1 from '..src/pictures/electrico.jpg';
import CapacitacionSura from '..src/pictures/capacitacionsura.jpg';


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
    imagen: Arbol,
    titulo: 'Caida de arbol',
    link: 'https://www.facebook.com/share/p/1Jtcg7qiyK/',
    descripcion: 'El Cuerpo de Bomberos de San Alberto atendió una emergencia por la caída de un árbol en el polideportivo.'
  },
  {
    id: 3,
    imagen: Capacitacioncuerda,
    titulo: 'Fortaleciendo habilidades',
    link: 'https://www.facebook.com/share/p/16Cc6yoWU8/',
    descripcion: 'El cuerpo de Bomberos de San Alberto se Capacita en el manejo de cuerdas y nudos de rescate'
  },
  {
    id: 4,
    imagen: Electrico1,
    titulo: 'IUncendio electrico',
    link: 'https://www.facebook.com/share/p/1Bf7ptjrMa/',
    descripcion: 'El cuerpo de Bomberos San Alberto atiende un incendio de lonchera'
  },
  {
    id: 5,
    imagen: Enfermeria,
    titulo: 'Práctica de canalización venosa – Auxiliares de Enfermería',
    link: 'https://www.facebook.com/share/p/16SmeF7Gvj/',
    descripcion: 'El Cuerpo de Bomberos de San Alberto, se retroalimenta en conocimientos para sus Auxiliares de Enfermería.'
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
    imagen: CapacitacionSura,
    titulo: 'Capacitación con la ARL SURA',
    link: 'https://www.facebook.com/share/p/16xnEQSV7L/',
    descripcion: 'Nuestro personal del Cuerpo de Bomberos de San Alberto participó en una jornada de capacitación orientada por la ARL SURA'
  },
  {
    id: 8,
    imagen: Quemaprohi,
    titulo: 'QUEMA PROHIBIDA',
    link: 'https://www.facebook.com/share/p/16dGzjcuLL/',
    descripcion: 'El día 9 de octubre, el Cuerpo de Bomberos de San Alberto atendió una quema prohibida en el sector de la Variante.'
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
