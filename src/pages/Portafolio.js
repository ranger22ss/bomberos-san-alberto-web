import React from 'react';
import './Portafolio.css';
import { Link } from 'react-router-dom'; // Asegúrate de usar 'react-router-dom'

const Portafolio = () => {
    // Datos actualizados para las tarifas
    const tarifasEjemplo = [
        { actividad: "Inspección Técnica de Seguridad Humana y Contra Incendios", tarifa: "Desde $150.000 COP" },
        {
            actividad: "Capacitación (Primeros Auxilios, Evacuación, Manejo de Extintores)",
            tarifa: "Desde $50.000 COP (por tipo de capacitación)"
        },
        { actividad: "Recarga y Mantenimiento de Extintores", tarifa: "Según tipo, tamaño y forma del extintor" },
        { actividad: "Agua a Presión de 2.5 GAL", tarifa: "$30.000 COP" },
        { actividad: "Venta de Extintor ABC de 10 LBS (sin soporte/señalización)", tarifa: "$60.000 COP" },
        { actividad: "Venta de Extintor ABC de 20 LBS (sin soporte/señalización)", tarifa: "$80.000 COP" },
        { actividad: "Venta de Extintor ABC de 30 LBS (sin soporte/señalización)", tarifa: "$100.000 COP" },
        { actividad: "Venta de Extintor ABC de 150 LBS", tarifa: "$180.000 COP" },
        { actividad: "Mantenimiento Extintor Acetato de Potasio 1.5 GAL", tarifa: "$45.000 COP" },
        { actividad: "Recarga Extintor Acetato de Potasio 1.5 GAL", tarifa: "$100.000 COP" },
        // Puedes añadir más si tienes otros extintores o servicios de venta/recarga específicos del documento
    ];

    return (
        <div className="portafolio-container">
            {/* <Header /> */}

            <header className="portafolio-header">
                <div className="portafolio-content-wrapper">
                    <h1>Nuestro Portafolio de Actividades</h1>
                    <p>Conoce la amplia gama de servicios que el Cuerpo de Bomberos Voluntarios de San Alberto, Cesar, ofrece para proteger a la comunidad.</p>
                </div>
            </header>

            <main className="portafolio-content-wrapper">
                <section className="portafolio-section">
                    <h2>Presentación</h2>
                    <p>
                        El Cuerpo de Bomberos Voluntarios de San Alberto, Cesar, es una organización sin ánimo de lucro, dedicada a la gestión integral del riesgo contra incendios, la preparación y respuesta ante emergencias, y la educación comunitaria en prevención. Con más de {new Date().getFullYear() - 2009} años de servicio, nuestro compromiso es salvaguardar la vida, la propiedad y el medio ambiente de nuestra región.
                    </p>
                    <p>
                        Este portafolio detalla las actividades y servicios que ponemos a disposición de empresas, instituciones y la comunidad en general, contribuyendo a la seguridad y bienestar de todos.
                    </p>
                </section>

                <section className="portafolio-section">
                    <h2>Misión, Visión y Valores</h2>
                    <p>Aunque ya los hemos mencionado, aquí te recordamos nuestros pilares:</p>
                    <p><strong>Misión:</strong> Proteger la vida, la propiedad y el medio ambiente, brindando servicios de prevención, atención de emergencias y educación a la comunidad.</p>
                    <p><strong>Visión:</strong> Ser el referente en gestión de riesgos y atención de emergencias en el Cesar, reconocidos por nuestra profesionalidad, abnegación y compromiso social.</p>
                    <p><strong>Valores:</strong></p>
                    <ul className="service-list" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        <li><i className="fas fa-fire-alt"></i> Valor</li>
                        <li><i className="fas fa-hand-holding-heart"></i> Abnegación</li>
                        <li><i className="fas fa-ruler"></i> Disciplina</li>
                        <li><i className="fas fa-handshake"></i> Compromiso</li>
                        <li><i className="fas fa-life-ring"></i> Servicio</li>
                        <li><i className="fas fa-medal"></i> Honor</li>
                    </ul>
                </section>

                <section className="portafolio-section">
                    <h2>Nuestros Servicios Ofrecidos</h2>
                    <ul className="service-list">
                        <li>
                            <Link to="/cotizar" className="service-card-link">
                                <i className="fas fa-building"></i>
                                <div>
                                    <h3>Inspecciones y Conceptos Técnicos</h3>
                                    <p>Realizamos visitas técnicas para emitir conceptos de seguridad humana y contra incendios, esenciales para la obtención de licencias de funcionamiento y seguridad en edificaciones.</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cotizar" className="service-card-link">
                                <i className="fas fa-chalkboard-teacher"></i>
                                <div>
                                    <h3>Capacitación y Formación de Brigadas</h3>
                                    <p>Ofrecemos cursos y talleres especializados en prevención, primeros auxilios, evacuación, manejo de extintores y formación de brigadas de emergencia.</p>
                                </div>
                            </Link>
                        </li>
                        {/* Se combinaron Capacitación y Formación de Brigadas para simplificar el listado visual aquí */}
                        <li>
                            <Link to="/cotizar" className="service-card-link">
                                <i className="fas fa-fire-extinguisher"></i>
                                <div>
                                    <h3>Venta, Recarga y Mantenimiento de Extintores</h3>
                                    <p>Servicio profesional de venta de extintores nuevos, así como recarga, mantenimiento y revisión técnica para garantizar su óptimo funcionamiento y seguridad.</p>
                                </div>
                            </Link>
                        </li>
                        {/* Atención de Emergencia se eliminó de aquí ya que es gratuito y regulado por alcaldía */}
                        <li>
                            <Link to="/cotizar" className="service-card-link">
                                <i className="fas fa-hands-helping"></i>
                                <div>
                                    <h3>Apoyo a la Comunidad</h3>
                                    <p>Participación activa en campañas de prevención, eventos comunitarios y asistencia en situaciones de desastre, demostrando nuestro compromiso social.</p>
                                </div>
                            </Link>
                        </li>
                        {/* Añadir el servicio de agua a presión aquí, si deseas que sea un item clickeable */}
                        <li>
                            <Link to="/cotizar" className="service-card-link">
                                <i className="fas fa-tint"></i> {/* Icono para agua */}
                                <div>
                                    <h3>Suministro de Agua a Presión</h3>
                                    <p>Ofrecemos servicio de suministro de agua a presión con carrotanque con capacidad para 5000 litros, para diversas necesidades.</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </section>

                <section className="portafolio-section">
                    <h2>Póliza de Responsabilidad Civil</h2>
                    <p>
                        Para su tranquilidad y respaldo, el Cuerpo de Bomberos Voluntarios de San Alberto, Cesar, cuenta con una póliza de responsabilidad civil extracontractual que cubre los posibles daños a terceros que puedan ocasionarse en el desarrollo de nuestras actividades. Nuestra prioridad es su seguridad y la de su entorno.
                    </p>
                    <p className="policy-contact-text">
                        Para más detalles sobre la póliza, contáctenos.
                    </p>
                </section>

                <section className="portafolio-section">
                    <h2>Tarifas de Servicios</h2>
                    <p>A continuación, presentamos una tabla con nuestras tarifas de referencia para los servicios más comunes. Para una cotización personalizada, por favor contáctenos.</p>
                    <table className="tarifas-table">
                        <thead>
                            <tr>
                                <th>Actividad / Servicio</th>
                                <th>Tarifa de Referencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tarifasEjemplo.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.actividad}</td>
                                    <td>{item.tarifa}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="policy-contact-text">
                        Para solicitar una cotización detallada o si tiene alguna pregunta sobre nuestros servicios, no dude en <Link to="/cotizar">contactarnos</Link>.
                    </p>
                </section>
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default Portafolio;