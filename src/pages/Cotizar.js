import React, { useState } from 'react';
import './Cotizar.css';
import { Link } from 'react-router-dom'; // Asegúrate de usar 'react-router-dom'
import { useForm } from '@formspree/react'; // Para enviar el formulario

const Cotizar = () => {
    // Los datos de los servicios/productos cotizables, extraídos del documento y tus indicaciones
    const servicesAndProducts = [
        {
            id: 'inspecciones',
            name: 'Inspecciones y Conceptos Técnicos',
            description: 'Visitas técnicas para emitir conceptos de seguridad humana y contra incendios, esenciales para licencias de funcionamiento.'
        },
        {
            id: 'capacitacion-pa',
            name: 'Capacitación: Primeros Auxilios',
            description: 'Cursos y talleres en técnicas básicas y avanzadas de primeros auxilios.'
        },
        {
            id: 'capacitacion-evac',
            name: 'Capacitación: Evacuación y Plan de Emergencia',
            description: 'Formación para la creación de planes de evacuación y simulacros efectivos.'
        },
        {
            id: 'capacitacion-extintores',
            name: 'Capacitación: Manejo de Extintores',
            description: 'Entrenamiento práctico en el uso correcto de extintores para diferentes tipos de fuego.'
        },
        {
            id: 'formacion-brigadas',
            name: 'Formación de Brigadas de Emergencia',
            description: 'Entrenamiento y certificación de brigadas empresariales para respuesta ante emergencias.'
        },
        {
            id: 'recarga-extintores',
            name: 'Recarga y Mantenimiento de Extintores',
            description: 'Servicio profesional de recarga, mantenimiento y revisión técnica para todo tipo de extintores.'
        },
        {
            id: 'venta-extintor-abc10',
            name: 'Venta de Extintor ABC 10 LBS',
            description: 'Extintor ABC nuevo de 10 libras. (Sin soporte ni señalización por defecto)'
        },
        {
            id: 'venta-extintor-abc20',
            name: 'Venta de Extintor ABC 20 LBS',
            description: 'Extintor ABC nuevo de 20 libras. (Sin soporte ni señalización por defecto)'
        },
        {
            id: 'venta-extintor-abc30',
            name: 'Venta de Extintor ABC 30 LBS',
            description: 'Extintor ABC nuevo de 30 libras. (Sin soporte ni señalización por defecto)'
        },
        {
            id: 'venta-extintor-abc150',
            name: 'Venta de Extintor ABC 150 LBS',
            description: 'Extintor ABC nuevo de 150 libras.'
        },
        {
            id: 'mant-extintor-potasio',
            name: 'Mantenimiento Extintor Acetato de Potasio 1.5 GAL',
            description: 'Mantenimiento preventivo para extintores de Acetato de Potasio.'
        },
        {
            id: 'recarga-extintor-potasio',
            name: 'Recarga Extintor Acetato de Potasio 1.5 GAL',
            description: 'Recarga de extintores de Acetato de Potasio.'
        },
        {
            id: 'agua-presion',
            name: 'Suministro de Agua a Presión',
            description: 'Suministro de 5000 litros (1200 galones) de agua a presión por viaje.'
        },
        // Añade aquí más servicios o productos según tu portafolio
    ];

    const [selectedServices, setSelectedServices] = useState([]);
    const [state, handleSubmit] = useForm("YOUR_FORMSPREE_FORM_ID_COTIZAR"); // ¡IMPORTANTE! Cambia esto por tu ID de Formspree

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedServices(prev => [...prev, value]);
        } else {
            setSelectedServices(prev => prev.filter(serviceId => serviceId !== value));
        }
    };

    if (state.succeeded) {
        return (
            <div className="cotizar-container cotizar-content-wrapper">
                <div className="cotizar-section form-status success">
                    <h2>¡Gracias por tu solicitud!</h2>
                    <p>Hemos recibido tu cotización y nos pondremos en contacto contigo a la brevedad posible.</p>
                    <Link to="/" className="inicio-button" style={{ marginTop: '20px' }}>Volver al Inicio</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cotizar-container">
            <header className="cotizar-header">
                <div className="cotizar-content-wrapper">
                    <h1>Solicita tu Cotización</h1>
                    <p>Selecciona los servicios o productos de nuestro portafolio que te interesan y te enviaremos una propuesta personalizada.</p>
                </div>
            </header>

            <main className="cotizar-content-wrapper">
                <section className="cotizar-section">
                    <h2>Servicios y Productos</h2>
                    <div className="cotizar-grid">
                        <div className="services-selection">
                            <h3>Selecciona los ítems a cotizar:</h3>
                            {servicesAndProducts.map(service => (
                                <label key={service.id} className="service-item-checkbox">
                                    <input
                                        type="checkbox"
                                        value={service.id}
                                        onChange={handleCheckboxChange}
                                        checked={selectedServices.includes(service.id)}
                                        name="selectedServices" // Importante para Formspree
                                    />
                                    <div>
                                        <h4>{service.name}</h4>
                                        <p>{service.description}</p>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <div className="cotizacion-form-wrapper">
                            <h2>Completa tus Datos</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre Completo:</label>
                                    <input type="text" id="nombre" name="Nombre" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="empresa">Empresa / Institución (Opcional):</label>
                                    <input type="text" id="empresa" name="Empresa" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Correo Electrónico:</label>
                                    <input type="email" id="email" name="Email" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="telefono">Número de Teléfono (WhatsApp preferible):</label>
                                    <input type="tel" id="telefono" name="Telefono" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mensaje">Detalles de tu Solicitud / Comentarios Adicionales:</label>
                                    <textarea
                                        id="mensaje"
                                        name="Mensaje"
                                        rows="5"
                                        placeholder="Ej: Necesitamos 2 extintores ABC de 20 lbs para nuestra oficina y una capacitación de primeros auxilios para 15 personas."
                                        value={`Servicios seleccionados: ${selectedServices.map(id => servicesAndProducts.find(s => s.id === id)?.name || id).join(', ')}.\n\n` + (state.data?.Mensaje || '')}
                                        readOnly // Lo hacemos de solo lectura para que los servicios seleccionados no se puedan editar directamente aquí
                                    ></textarea>
                                    {/* Un input hidden para enviar los nombres de los servicios seleccionados a Formspree */}
                                    <input
                                        type="hidden"
                                        name="Servicios_Solicitados"
                                        value={selectedServices.map(id => servicesAndProducts.find(s => s.id === id)?.name || id).join(', ')}
                                    />
                                </div>

                                {state.errors && (
                                    <div className="form-status error">
                                        Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.
                                    </div>
                                )}

                                <button type="submit" disabled={state.submitting}>
                                    {state.submitting ? 'Enviando...' : 'Solicitar Cotización'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                <section className="direct-contact-info">
                    <h3>¿Necesitas una Cotización Formal o Inmediata?</h3>
                    <p>Si prefieres una atención personalizada o requieres una cotización formal con urgencia, no dudes en contactarnos directamente:</p>
                    <p>Teléfono: <a href="tel:+573001751212">+57 300 175 1212</a></p>
                    <p>Correo Electrónico: <a href="mailto:cuerpobomberossanalberto@gmail.com">cuerpobomberossanalberto@gmail.com</a></p>
                    <div className="contact-icons">
                        <a href="https://wa.me/573001751212" target="_blank" rel="noopener noreferrer" title="Envíanos un mensaje por WhatsApp">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                        <a href="mailto:cuerpobomberossanalberto@gmail.com" title="Envíanos un correo electrónico">
                            <i className="fas fa-envelope"></i>
                        </a>
                        <a href="tel:+573001751212" title="Escribenos Ahora">
                            <i className="fas fa-phone"></i>
                        </a>
                    </div>
                </section>
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default Cotizar;