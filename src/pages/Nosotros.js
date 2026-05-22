import React, { useState, useEffect, useRef } from "react";
import './Nosotros.css'; // Asegúrate de que esta ruta sea correcta

// Importa tus imágenes aquí
import maritzaImage from '../assets/barrionuevo.png';
import joseImage from '../assets/barrionuevo2.png';
import mauricioImage from '../assets/monroy2.png';
import angelImage from '../assets/fuentes.png';
import nathaliaImage from '../assets/monroy3.jpg';
import javierImage from '../assets/monroy.jpg';
import ChanagaImage from '../assets/chanaga.png';
import martinezImage from '../assets/martinez.png';
import SierraImage from '../assets/sierra.png';
import VeraImage from '../assets/vera.jpg';
import MoralesImage from '../assets/morales.jpg';
import GermanImage from '../assets/german.jpg';
import JorgeImage from '../assets/jorge.jpg';
import NavasImage from '../assets/navas.jpg';

const equipoCategorizado = {
    "Comandancia": [
        {
            nombre: "Maritza Barrionuevo Quiñonez",
            cargo: "Comandante",
            foto: maritzaImage,
            biografia: "Líder con más de una década de experiencia, impulsora del crecimiento técnico y humano de la institución desde 2023, ha logrado importantes alianzas estratégicas para el fortalecimiento del cuerpo, destacándose por su visión estratégica y capacidad de gestión.",
            rangoIcono: "🎖️"
        },
        {
            nombre: "Ángel Miguel Fuentes Barajas",
            cargo: "Teniente",
            foto: angelImage,
            biografia: "Fundador y pilar fundamental del cuerpo de bomberos, con una dedicación inquebrantable desde 2009. Teniente del cuerpo de bomberos. Posee formación, experiencia y liderazgo institucional. Participa activamente en operaciones y procesos administrativos estratégicos.",
            rangoIcono: "⭐"
        },
    ],
    "Personal Operativo": [
        {
            nombre: "Mayerly Sierra",
            cargo: "Bombera Operativa",
            foto: SierraImage,
            biografia: "Incorporación reciente al cuerpo. Actualmente en proceso de capacitación y fortalecimiento de habilidades operativas. Con disposición y compromiso con la labor bomberil.",
            rangoIcono: "👩‍🚒"
        },
                {
            nombre: "José Barrionuevo",
            cargo: "Bombero Operativo",
            foto: joseImage,
            biografia: "Miembro comprometido, con alto sentido del deber y respeto por la jerarquía. Su actitud colaborativa lo convierte en un apoyo constante durante las intervenciones.",
            rangoIcono: "👩‍🚒"
        },
        {
            nombre: "Maribel Chanaga",
            cargo: "Cabo",
            foto: ChanagaImage,
            biografia: "Especialista en incendios forestales y atención prehospitalaria (APH). Como cabo, combina conocimiento técnico y liderazgo operativo. Referente dentro del equipo.",
            rangoIcono: "👩‍🚒"
        },
        {
            nombre: "Erika Martínez",
            cargo: "Cabo",
            foto: martinezImage,
            biografia: "Capacitada en control de incendios forestales y APH. Su profesionalismo, experiencia y temple en emergencias la convierten en una figura clave del cuerpo operativo.",
            rangoIcono: "👩‍🚒"
        },
        {
            nombre: "Cristian Navas",
            cargo: "Bombero Operativo",
            foto: NavasImage,
            biografia: "Bombero capacitado y conductor habilitado para manejar máquina extintora. Cuenta con sólida experiencia en emergencias, destacándose por su responsabilidad y precisión al momento de conducir bajo presión.",
            rangoIcono: "🧑‍🚒"
        },
        {
            nombre: "Sebastián Morales",
            cargo: "Cabo",
            foto: MoralesImage,
            biografia: "Cabo activo con experiencia en manejo de máquina extintora. Se destaca por su liderazgo en emergencias y por su compromiso con la formación y disciplina del equipo.",
            rangoIcono: "🧑‍🚒"
        },
        {
            nombre: "Nathalia Monroy",
            cargo: "Bombera Operativa",
            foto: nathaliaImage,
            biografia: "Encargada de la estrategia de comunicación institucional. Asegura que la comunidad esté informada con transparencia, veracidad y responsabilidad sobre las acciones del cuerpo de bomberos.",
            rangoIcono: "✍️"
        },
        {
            nombre: "Shayra Vera",
            cargo: "Bombera Operativa",
            foto: VeraImage,
            biografia: "Miembro activo del equipo. Participa con disposición en las actividades operativas y está en constante proceso de formación.",
            rangoIcono: "👩‍🚒"
        },
    ],
    "Personal Administrativo y de Apoyo": [
        {
            nombre: "Javier Monroy",
            cargo: "Cabo",
            foto: javierImage,
            biografia: "El más experimentado del grupo en conducción de vehículos de emergencia. Actualmente lidera el equipo de conductores, asegurando que cada movilización sea oportuna y segura.",
            rangoIcono: "🧑‍🚒"
        },
        {
            nombre: "Mauricio Monroy",
            cargo: "Bombero Operativo",
            foto: mauricioImage,
            biografia: "Apoya tanto en la línea operativa como en la gestión interna del cuerpo. Con amplia experiencia y sentido estratégico, es enlace clave entre lo administrativo y lo operativo. Siempre dispuesto, resolutivo y con una visión clara de crecimiento institucional.",
            rangoIcono: "✍️"
        },
        {
            nombre: "German Gonzales",
            cargo: "Psicologo",
            foto: GermanImage,
            biografia: "Brinda apoyo emocional y psicosocial al personal operativo y administrativo. Su trabajo fortalece la salud mental, la convivencia y la preparación emocional ante situaciones de alto estrés, propias del servicio bomberil.",
            rangoIcono: "✍️"
        },
        {
            nombre: "Jorge Nuñez",
            cargo: "Juridico",
            foto: JorgeImage,
            biografia: "Encargado de brindar soporte legal al cuerpo de bomberos. Garantiza que cada acción institucional esté dentro del marco normativo vigente. Su orientación jurídica fortalece la transparencia, el cumplimiento y la toma de decisiones responsables.",
            rangoIcono: "✍️"
        },
        {
            nombre: "Diana Martinez",
            cargo: "Fiscal",
            foto: "https://placehold.co/150x150/007bff/ffffff?text=Diana+M.",
            biografia: "Vigila y evalúa los procesos contables, financieros y administrativos del cuerpo. Asegura que los recursos sean bien gestionados y que las operaciones se mantengan bajo los principios de legalidad, eficiencia y honestidad.",
            rangoIcono: "✍️"
        },
        {
            nombre: "Jesus Cabrera ",
            cargo: "Profesional de SST",
            foto: "https://placehold.co/150x150/007bff/ffffff?text=Jesus+C.",
            biografia: "Responsable de implementar y mantener las condiciones seguras en las actividades operativas y administrativas. Su labor garantiza que cada miembro del cuerpo trabaje bajo estándares que protejan su integridad física y mental.",
            rangoIcono: "✍️"
        },
    ],
};


export default function Nosotros() {
    const [expandedSections, setExpandedSections] = useState({
        historia: true,
        misionVisionObjetivos: false,
        vehiculos: false,
        himno: false,
        talentoHumano: false,
    });

    const toggleSection = (sectionName) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [sectionName]: !prevState[sectionName]
        }));
    };

    const [selectedMember, setSelectedMember] = useState(null);
    const talentoBottomRef = useRef(null);
    const talentoGridRef = useRef(null);

    useEffect(() => {
        if (selectedMember) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [selectedMember]);

    const openModal = (member) => {
        setSelectedMember(member);
    };

    const closeModal = () => {
        setSelectedMember(null);
    };

    const scrollToFullTeam = () => {
        if (talentoBottomRef.current) {
            talentoBottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
        if (talentoGridRef.current) {
            talentoGridRef.current.classList.add('talento-highlight');
            setTimeout(() => {
                talentoGridRef.current?.classList.remove('talento-highlight');
            }, 1600);
        }
    };

    return (
        // NUEVO CONTENEDOR PRINCIPAL PARA AISLAR EL LAYOUT DE ESTA PÁGINA
        <div className="nosotros-page-wrapper">
            <div className="nosotros-main-container">
                {/* Sección Hero */}
                <header className="nosotros-hero-section">
                    <h1 className="nosotros-h1">Nosotros</h1>
                    <p className="nosotros-hero-subtitle">
                        Conoce la historia, la misión y al valioso equipo humano que día a día protege a San Alberto.
                    </p>
                </header>

                {/* Contenedor principal para las secciones del acordeón */}
                <div className="accordion-sections-wrapper">

                    {/* Sección: Nuestra Historia */}
                    <div className="accordion-item">
                        <button
                            className={`accordion-header ${expandedSections.historia ? 'active' : ''}`}
                            onClick={() => toggleSection('historia')}
                        >
                            Nuestra Historia
                            <i className={`fas fa-chevron-down ${expandedSections.historia ? 'rotate' : ''}`}></i>
                        </button>
                        <div className={`accordion-content ${expandedSections.historia ? 'expanded' : ''}`}>
                            <p className="nosotros-historia-paragraph">
                                El Cuerpo de Bomberos Voluntarios de San Alberto, Cesar, fue fundado oficialmente el 14 de abril de 2009...
                            </p>
                            {/* ... el resto de los párrafos de la historia ... */}
                             <p className="nosotros-historia-paragraph">
                                El Cuerpo de Bomberos Voluntarios de San Alberto, Cesar, fue fundado oficialmente el 14 de abril de 2009, en respuesta a la urgente necesidad de atención de emergencias en el municipio. Esta valiosa iniciativa fue liderada por el entonces alcalde Rubiel Pérez Estupiñán, quien no solo impulsó la creación del cuerpo bomberil, sino que también estableció la sobretasa bomberil, garantizando una fuente de financiación esencial para su sostenimiento. Junto a él, el fundador Ángel Miguel Fuentes Barajas, actual teniente, asumió el reto de conformar esta importante institución.
                            </p>
                            <p className="nosotros-historia-paragraph">
                                En sus primeros años, los recursos fueron muy limitados. El primer vehículo operativo fue una motocicleta propiedad del comandante Ángel Fuentes, utilizada para transportar extintores y atender emergencias básicas, reflejando el compromiso y sacrificio de sus miembros fundadores.
                            </p>
                            <p className="nosotros-historia-paragraph">
                                En septiembre de 2014, gracias a la gestión de la exalcaldesa Nury Estella Cataño Cardona, se adquirió el terreno donde se construiría la sede institucional, concretándose la entrega en 2016 y brindando una base sólida para el crecimiento del cuerpo de bomberos.
                            </p>
                            <p className="nosotros-historia-paragraph">
                                A partir de entonces, la institución se fortaleció considerablemente. Bajo la administración del alcalde Pedro Rafael Guevara Chogo, se hicieron entregas significativas de recursos estratégicos: en 2017 un vehículo de intervención rápida, en 2019 dos camionetas para logística, y en 2020 un carro tanque de 5.000 litros para atención de incendios estructurales y forestales.
                            </p>
                            <p className="nosotros-historia-paragraph">
                                En 2021, se recibió una máquina extintora, fruto de una gestión iniciada en 2016 por el coordinador departamental Jorge Zuleta y la entonces subcomandante Maritza Barrionuevo Quiñonez, con respaldo del Ministerio del Interior, la Dirección Nacional de Bomberos, la Unidad Nacional para la Gestión del Riesgo de Desastres y el gobierno nacional.
                            </p>
                            <p className="nosotros-historia-paragraph">
                                La subcomandante Maritza Barrionuevo Quiñonez, quien estuvo en el cargo desde 2010 hasta 2022, asumió la comandancia en 2023, impulsando una nueva etapa de crecimiento técnico, humano y estructural para la institución.
                            </p>
                            <p className="nosotros-historia-paragraph">
                                En 2024, bajo la administración del alcalde Edgar Ricardo, se iniciaron convenios para el fortalecimiento del personal, promoviendo formación, disciplina y organización. Ese mismo año, la cooperativa Crediservir, aliada desde 2016, donó herramientas y uniformes forestales, reafirmando su compromiso con el cuerpo de bomberos.
                            </p>
                            <p className="nosotros-historia-paragraph">
                                En 2025, se firmó un nuevo convenio con la alcaldía para fortalecer personal y equipos técnicos. Gracias a la gestión de la comandante Barrionuevo y alianzas con entidades locales e internacionales, se adquirieron equipos de respiración autónoma, un compresor para recarga de aire, y herramientas esenciales como la mandíbula de la vida.
                            </p>
                            <p className="nosotros-historia-paragraph">
                                Además, con el apoyo de la Dirección Nacional de Bomberos y autoridades regionales, se entregaron equipos especializados para atención de incendios forestales, aumentando la capacidad operativa del cuerpo.
                            </p>
                            <p className="nosotros-historia-paragraph">
                                Actualmente, el Cuerpo de Bomberos Voluntarios de San Alberto cuenta con 18 miembros activos, entre personal operativo y administrativo, comprometidos con la seguridad y bienestar de la comunidad. Su nivel técnico y organizativo lo ha consolidado como un referente regional en capacitación y fortalecimiento del sistema bomberil en el Cesar.
                            </p>
                        </div>
                    </div>

                    {/* Sección: Misión, Visión y Objetivos */}
                    <div className="accordion-item">
                         <button
                            className={`accordion-header ${expandedSections.misionVisionObjetivos ? 'active' : ''}`}
                            onClick={() => toggleSection('misionVisionObjetivos')}
                        >
                            Misión, Visión y Valores
                            <i className={`fas fa-chevron-down ${expandedSections.misionVisionObjetivos ? 'rotate' : ''}`}></i>
                        </button>
                        <div className={`accordion-content ${expandedSections.misionVisionObjetivos ? 'expanded' : ''}`}>
                            <div className="nosotros-mvv-grid">
                                <div className="nosotros-mvv-card nosotros-mvv-mission">
                                    <h3 className="nosotros-mvv-title">Misión</h3>
                                    <p className="nosotros-mvv-text">
                                        Proteger la vida, el patrimonio y el medio ambiente de la comunidad de San Alberto, a través de la atención oportuna y eficiente de emergencias, la prevención y la formación constante de nuestro personal, siempre actuando con compromiso y profesionalismo.
                                    </p>
                                </div>
                                <div className="nosotros-mvv-card nosotros-mvv-vision">
                                    <h3 className="nosotros-mvv-title">Visión</h3>
                                    <p className="nosotros-mvv-text">
                                        Ser una institución líder en la región, reconocida por su excelencia operativa, compromiso social y capacidad técnica, promoviendo una cultura de prevención y seguridad integral que sirva de modelo para otros cuerpos de bomberos.
                                    </p>
                                </div>
                                <div className="nosotros-mvv-card nosotros-mvv-values">
                                    <h3 className="nosotros-mvv-title">Valores</h3>
                                    <ul className="nosotros-mvv-list">
                                        <li><span className="nosotros-mvv-value-title">Compromiso:</span> Dedicación total a la seguridad de la comunidad.</li>
                                        <li><span className="nosotros-mvv-value-title">Disciplina:</span> Adherencia a los más altos estándares de rigor y orden.</li>
                                        <li><span className="nosotros-mvv-value-title">Trabajo en equipo:</span> Colaboración y cohesión para lograr objetivos comunes.</li>
                                        <li><span className="nosotros-mvv-value-title">Responsabilidad:</span> Actuar con ética y profesionalismo en cada intervención.</li>
                                        <li><span className="nosotros-mvv-value-title">Vocación de servicio:</span> Pasión por ayudar y proteger a los demás.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ... Resto de las secciones del acordeón (Vehículos, Himno) ... */}

                     {/* Sección: Vehículos */}
                    <div className="accordion-item">
                        <button
                            className={`accordion-header ${expandedSections.vehiculos ? 'active' : ''}`}
                            onClick={() => toggleSection('vehiculos')}
                        >
                            Nuestros Vehículos
                            <i className={`fas fa-chevron-down ${expandedSections.vehiculos ? 'rotate' : ''}`}></i>
                        </button>
                        <div className={`accordion-content ${expandedSections.vehiculos ? 'expanded' : ''}`}>
                            <div className="vehiculos-grid">
                               <div className="vehiculo-card">
                                    <img src="https://placehold.co/400x250/2c3e50/ffffff?text=Maquina+Extintora" alt="Máquina Extintora" />
                                    <h3>Máquina Extintora</h3>
                                    <p>Vehículo principal para el combate de incendios, equipado con bomba de alta presión y gran capacidad de agua.</p>
                                </div>
                                <div className="vehiculo-card">
                                    <img src="https://placehold.co/400x250/3498db/ffffff?text=Carro+Tanque" alt="Carro Tanque" />
                                    <h3>Carro Tanque</h3>
                                    <p>Vehículo de apoyo con una cisterna de 5.000 litros para abastecimiento de agua en incendios prolongados.</p>
                                </div>
                                <div className="vehiculo-card">
                                    <img src="https://placehold.co/400x250/e67e22/ffffff?text=Camioneta+Despliegue+Rapido" alt="Camioneta de Despliegue Rápido" />
                                    <h3>Camioneta de Despliegue Rápido</h3>
                                    <p>Vehículo ágil para la primera respuesta en emergencias que requieren intervención rápida y equipos menores.</p>
                                </div>
                                <div className="vehiculo-card">
                                    <img src="https://placehold.co/400x250/1a252f/ffffff?text=Camioneta+Estacas+1" alt="Camioneta de Estacas 1" />
                                    <h3>Camioneta de Estacas (Unidad 1)</h3>
                                    <p>Utilizada para el transporte de personal, equipos de gran volumen y materiales en intervenciones.</p>
                                </div>
                                <div className="vehiculo-card">
                                    <img src="https://placehold.co/400x250/bdc3c7/000000?text=Camioneta+Estacas+2" alt="Camioneta de Estacas 2" />
                                    <h3>Camioneta de Estacas (Unidad 2)</h3>
                                    <p>Vehículo adicional de apoyo logístico y transporte de recursos para operaciones y emergencias.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Sección: Himno */}
                     <div className="accordion-item">
                        <button
                            className={`accordion-header ${expandedSections.himno ? 'active' : ''}`}
                            onClick={() => toggleSection('himno')}
                        >
                            Himno del Bombero Colombiano
                            <i className={`fas fa-chevron-down ${expandedSections.himno ? 'rotate' : ''}`}></i>
                        </button>
                        <div className={`accordion-content ${expandedSections.himno ? 'expanded' : ''}`}>
                             <div className="himno-content">
                                <h3>Himno Oficial del Bombero Colombiano</h3>
                                <p>
                                    ESTROFA I<br/>
                                    ABRIDNOS EL PASO, SONÓ LA SIRENA.<br/>
                                    CON LENGUAS DE FUEGO NOS LLAMA EL DEBER,<br/>
                                    EL ROSTRO TRANQUILO Y EL ALMA SERENA<br/>
                                    LA VIDA OFRENDAMOS CON HONDO PLACER.
                                </p>
                                {/* ... más estrofas ... */}
                                 <p>
                                    ESTROFA II<br/>
                                    LAS LLAMAS EXTIENDEN SUS FÚNEBRES ALAS;<br/>
                                    SE ESCUCHAN LAMENTOS DE ANGUSTIA Y DOLOR.<br/>
                                    ¡ARRIBA BOMBEROS! TENDED LAS ESCALAS,<br/>
                                    QUÉ IMPORTA LA VIDA SI QUEDA EL HONOR.
                                </p>
                                <p>
                                    ESTROFA III<br/>
                                    TENEMOS POR LEMA SERVIR A LOS HOMBRES;<br/>
                                    CUMPLAMOS GUSTOSOS LA NOBLE MISIÓN,<br/>
                                    EN MEDIO DE LLAMAS SE VEN NUESTROS NOMBRES<br/>
                                    AL PIE DEL ESCUDO DE LA ABNEGACIÓN.
                                </p>
                                <p>
                                    ESTROFA IV<br/>
                                    JAMÁS NOS DETIENEN PELIGROS NI HORRORES,<br/>
                                    SI NOBLES MANDATOS DEBEMOS CUMPLIR,<br/>
                                    Y SOMOS FELICES QUITANDO DOLORES,<br/>
                                    AL VER QUE POR OTROS DEBEMOS MORIR.
                                </p>
                                <p>
                                    ESTROFA V<br/>
                                    EL AGUA QUE SALTA GENTIL, ES HERMANA<br/>
                                    DE TODO BOMBERO SU HERMANA MAYOR,<br/>
                                    CON ELLA VOLVEMOS AL SON DE LA DIANA Y<br/>
                                    EN ELLA HEMOS PUESTO LA FE Y EL HONOR.
                                </p>
                                <p className="himno-link">
                                    Escucha el Himno Oficial aquí: <a href="https://www.youtube.com/watch?v=4Ma0VwLaGUU" target="_blank" rel="noopener noreferrer">Ver en YouTube</a>
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* Sección: Talento Humano */}
                    <div className="accordion-item">
                        <button
                            className={`accordion-header ${expandedSections.talentoHumano ? 'active' : ''}`}
                            onClick={() => toggleSection('talentoHumano')}
                        >
                            Nuestro Talento Humano
                            <i className={`fas fa-chevron-down ${expandedSections.talentoHumano ? 'rotate' : ''}`}></i>
                        </button>
                        <div className={`accordion-content ${expandedSections.talentoHumano ? 'expanded' : ''}`}>
                            <div className="talento-scroll-controls">
                                <button
                                    type="button"
                                    className="talento-scroll-button"
                                    onClick={scrollToFullTeam}
                                >
                                    Ver a todo el talento humano
                                    <span className="talento-scroll-icon" aria-hidden="true">↓</span>
                                </button>
                            </div>
                            <div className="equipo-categorias" ref={talentoGridRef}>
                                {Object.entries(equipoCategorizado).map(([categoria, miembros]) => (
                                    <div key={categoria} className="equipo-categoria-container">
                                        <h3 className="equipo-categoria-title">
                                            {categoria}
                                        </h3>
                                        <div className="equipo-grid">
                                            {miembros.map((member) => (
                                                <div
                                                    key={member.nombre}
                                                    className="miembro-card"
                                                    onClick={() => openModal(member)}
                                                >
                                                    <div className="miembro-foto-container">
                                                        <img
                                                            src={member.foto}
                                                            alt={member.nombre}
                                                            className="miembro-foto"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "https://placehold.co/150x150/cccccc/000000?text=No+Foto";
                                                            }}
                                                        />
                                                        {member.rangoIcono && (
                                                            <span className="miembro-rango-icon">
                                                                {member.rangoIcono}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h4 className="miembro-nombre">{member.nombre}</h4>
                                                    <p className="miembro-cargo">{member.cargo}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <div ref={talentoBottomRef} aria-hidden="true"></div>
                            </div>
                        </div>
                    </div>

                </div> {/* Fin de accordion-sections-wrapper */}

                {/* Modal para información del miembro */}
                {selectedMember && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={closeModal}
                                className="modal-close-button"
                            >
                                &times;
                            </button>
                            <div className="modal-header">
                                <img
                                    src={selectedMember.foto}
                                    alt={selectedMember.nombre}
                                    className="modal-foto"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/150x150/cccccc/000000?text=No+Foto";
                                    }}
                                />
                                <h3 className="modal-nombre">{selectedMember.nombre}</h3>
                                <p className="modal-cargo">{selectedMember.cargo}</p>
                            </div>
                            <p className="modal-biography">{selectedMember.biografia}</p>
                        </div>
                    </div>
                )}

                {/* Sección de Contacto */}
                <section className="nosotros-contacto-section">
                    <h2 className="nosotros-contacto-title">Contáctanos</h2>
                    <div className="nosotros-contacto-card">
                        <p className="nosotros-contacto-text">
                            ¿Tienes alguna pregunta o quieres saber más sobre nuestro trabajo? Estamos aquí para servir a la comunidad.
                        </p>
                        <a
                            href="mailto:info@bomberosanalberto.org"
                            className="nosotros-contacto-button"
                        >
                            Enviar Email
                        </a>
                        <p className="nosotros-contacto-social-text">
                            También puedes seguirnos en nuestras redes sociales para estar al tanto de nuestras últimas actividades y novedades.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
