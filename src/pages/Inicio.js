import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css'; // ¡IMPORTANTE! Asegúrate de que esta línea esté presente

function Inicio() {
    const anioActual = new Date().getFullYear();
    const aniosServicio = anioActual - 2009; // Asumiendo que 2009 es el año de fundación

    return (
        <div className="inicio-container">
            {/* Encabezado Principal */}
            <header className="inicio-header">
                <div className="inicio-content-wrapper"> {/* Nuevo wrapper para centrar contenido */}
                    <h1 className="inicio-header-title">
                        Cuerpo de Bomberos Voluntarios de San Alberto, Cesar
                    </h1>
                    <p className="inicio-header-slogan">
                        "Servir a la comunidad es nuestro compromiso"
                    </p>
                </div>
            </header>

            <main className="inicio-content-wrapper"> {/* Contenedor principal de secciones */}

                {/* Sección de Misión, Visión y Valores (Consolidada y Mejorada) */}
                <section className="inicio-section">
                    <h2 className="inicio-section-title">Nuestra Esencia: Misión, Visión y Valores</h2>
                    <p>
                        Desde el 14 de abril de 2009, el Cuerpo de Bomberos Voluntarios de San Alberto, Cesar, se ha dedicado con abnegación a proteger a nuestra comunidad. Con <strong>{aniosServicio} años de entrega y compromiso</strong>, nuestros pilares definen cada acción que emprendemos:
                    </p>
                    <p>
                        <strong>Misión:</strong> Proteger la vida, la propiedad y el medio ambiente, brindando servicios de prevención, atención de emergencias y educación a la comunidad.
                    </p>
                    <p>
                        <strong>Visión:</strong> Ser el referente en gestión de riesgos y atención de emergencias en el Cesar, reconocidos por nuestra profesionalidad, abnegación y compromiso social.
                    </p>
                    <h3 className="inicio-section-subtitle" style={{textAlign: 'center', color: 'var(--secondary-color)', fontSize: '1.5em', marginBottom: '15px'}}>Nuestros Valores</h3>
                    <ul className="inicio-list">
                        <li><i className="fas fa-fire-alt"></i> Valor</li>
                        <li><i className="fas fa-hand-holding-heart"></i> Abnegación</li>
                        <li><i className="fas fa-ruler"></i> Disciplina</li>
                        <li><i className="fas fa-handshake"></i> Compromiso</li>
                        <li><i className="fas fa-life-ring"></i> Servicio</li>
                        <li><i className="fas fa-medal"></i> Honor</li>
                    </ul>
                </section>

                {/* Sección "Nuestros Servicios" */}
                <section className="inicio-section">
                    <h2 className="inicio-section-title">Nuestros Servicios Principales</h2>
                    <p>
                        Ofrecemos una amplia gama de servicios esenciales para la seguridad y bienestar de la comunidad de San Alberto y sus alrededores:
                    </p>
                    <ul className="inicio-list">
                        <li><i className="fas fa-ambulance"></i> Atención de Emergencias</li>
                        <li><i className="fas fa-fire-extinguisher"></i> Prevención y Control de Incendios</li>
                        <li><i className="fas fa-chalkboard-teacher"></i> Capacitación y Educación en Riesgos</li>
                        <li><i className="fas fa-hands-helping"></i> Apoyo y Asistencia a la Comunidad</li>
                        <li><i className="fas fa-building"></i> Inspecciones y Conceptos Técnicos</li>
                        <li><i className="fas fa-water"></i> Suministro de Agua a Presión</li>
                        <li><i className="fas fa-certificate"></i> Recarga y Mantenimiento de Extintores</li>
                        <li><i className="fas fa-shopping-cart"></i> Venta de Equipos de Seguridad</li>
                    </ul>
                    <div className="inicio-button-wrapper" style={{marginTop: '40px'}}>
                        <Link to="/portafolio" className="inicio-button">
                            Ver Portafolio Completo
                        </Link>
                    </div>
                </section>

                {/* Sección de "Otras Páginas" - con links más descriptivos */}
                <section className="inicio-section">
                    <h2 className="inicio-section-title">Explora Nuestra Plataforma</h2>
                    <p>
                        Te invitamos a descubrir más sobre nuestro trabajo y cómo podemos ayudarte:
                    </p>
                    <ul className="otras-paginas-list">
                        <li>
                            <Link to="/portafolio">Portafolio</Link>
                            <p>Detalle de todos nuestros servicios y productos.</p>
                        </li>
                        <li>
                            <Link to="/cotizar">Cotizar</Link>
                            <p>Solicita una cotización personalizada de nuestros servicios.</p>
                        </li>
                        <li>
                            <Link to="/contacto">Contacto</Link>
                            <p>Ponte en contacto con nosotros para cualquier consulta o emergencia.</p>
                        </li>
                        {/* Puedes añadir más enlaces aquí si creas otras páginas como /noticias, /galeria, etc. */}
                        {/* Ejemplo si tuvieras una página "Nosotros" separada de Misión/Visión:
                        <li>
                            <Link to="/nosotros">Nosotros</Link>
                            <p>Conoce nuestra historia y el equipo detrás de los bomberos.</p>
                        </li>
                        */}
                    </ul>
                </section>

                {/* Botón final "Conócenos" si aún lo deseas, aunque la sección de Misión/Visión ya lo incluye implicitamente */}
                {/* Puedes quitar este div si crees que es redundante con la sección de Misión/Visión */}
                <div className="inicio-button-wrapper">
                    <Link
                        to="/contacto" // Podría ser a /contacto o a una futura /nosotros
                        className="inicio-button"
                    >
                        Contáctanos Directamente
                    </Link>
                </div>

            </main>
        </div>
    );
}

export default Inicio;