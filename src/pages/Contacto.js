import React, { useState } from 'react';
// Importa el archivo CSS que acabas de crear
import './Contacto.css'; // Asegúrate de que la ruta sea correcta

// NOTA: Se asume que Font Awesome ha sido incluido en tu index.html
// o configurado globalmente para que los íconos se muestren correctamente.

const Contacto = () => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Estado para manejar el estado del envío del formulario (éxito, error, cargando)
    const [formStatus, setFormStatus] = useState('');
    const [formStatusClass, setFormStatusClass] = useState('');

    // Maneja los cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        setFormStatus('Enviando mensaje...');
        setFormStatusClass(''); // Limpia clases anteriores

        // URL de Formspree (¡REEMPLAZA YOUR_FORMSPREE_FORM_ID CON TU ID REAL!)
        // La URL que tienes es: "https://formspree.io/f/xeokewdj"
        const formspreeUrl = "https://formspree.io/f/xeokewdj";

        // Prepara los datos para Formspree
        const dataToSend = {
            name: formData.name,
            _replyto: formData.email, // Formspree usa _replyto para el email de respuesta
            subject: formData.subject,
            message: formData.message,
        };

        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                setFormStatus('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
                setFormStatusClass('success');
                setFormData({ // Resetea el formulario
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                const errorData = await response.json();
                if (errorData.errors) {
                    setFormStatus(`Error: ${errorData.errors.map(error => error.message).join(', ')}`);
                } else {
                    setFormStatus('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.');
                }
                setFormStatusClass('error');
            }
        } catch (error) {
            console.error('Error de red o conexión:', error);
            setFormStatus('Hubo un problema de conexión. Por favor, revisa tu internet y vuelve a intentarlo.');
            setFormStatusClass('error');
        }
    };

    return (
        <div className="contact-page">
            {/* Sección de Encabezado/Hero */}
            <header className="contact-hero">
                <div className="hero-content">
                    <h1>Contáctanos</h1>
                    <p>Estamos aquí para ayudarte. Ponte en contacto con nosotros.</p>
                </div>
            </header>

            <main className="contact-main-content">
                {/* Sección de Información de Contacto */}
                <section className="contact-info-section">
                    <h2>Nuestros Datos de Contacto</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <div className="icon-circle"><i className="fas fa-phone-alt"></i></div>
                            <h3>Emergencias</h3>
                            <p>315-353-8706 (Sin WhatsApp)</p>
                        </div>
                        <div className="info-item">
                            <div className="icon-circle"><i className="fas fa-headset"></i></div>
                            <h3>Atención al Cliente</h3>
                            <p>+57 300-175-1212</p>
                            <a href="https://wa.me/573001751212" target="_blank" rel="noreferrer" className="whatsapp-button">
                                <i className="fab fa-whatsapp"></i> Enviar WhatsApp
                            </a>
                        </div>
                        <div className="info-item">
                            <div className="icon-circle"><i className="fas fa-envelope"></i></div>
                            <h3>Correos Electrónicos</h3>
                            <p>cuerpobomberossanalberto@gmail.com</p>
                            <p>cuerpobomberosvoluntariossanalberto@hotmail.com</p>
                        </div>
                        <div className="info-item">
                            <div className="icon-circle"><i className="fab fa-facebook-f"></i></div>
                            <h3>Síguenos en Facebook</h3>
                            <a href="https://www.facebook.com/profile.php?id=61563465837882" target="_blank" rel="noreferrer" className="facebook-button">
                                <i className="fab fa-facebook-f"></i> Página de Facebook
                            </a>
                        </div>
                    </div>
                </section>

                {/* Sección del Formulario de Contacto */}
                <section className="contact-form-section">
                    <h2>Envíanos un Mensaje</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Nombre Completo</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tu nombre completo"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu.correo@ejemplo.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Asunto</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Motivo de tu consulta"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Tu Mensaje</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Escribe tu mensaje aquí..."
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-button">
                            Enviar Mensaje
                            <i className="fas fa-paper-plane send-icon"></i>
                        </button>
                        {formStatus && (
                            <p className={`form-message ${formStatusClass}`}>{formStatus}</p>
                        )}
                    </form>
                </section>

                {/* Sección de Ubicación/Mapa (Placeholder) */}
                <section className="contact-map-section">
                    <h2>Nuestra Ubicación</h2>
                    <p>Visítanos en nuestra sede. Estamos aquí para servirte.</p>
                    <div className="map-placeholder">
                        {/* Puedes reemplazar esto con un mapa interactivo de Google Maps */}
                        {/* Por ahora, es un placeholder visual */}
                        <img
                            src="https://placehold.co/800x450/4CAF50/ffffff?text=Mapa+de+Ubicación+Aquí"
                            alt="Placeholder de Mapa"
                            className="map-image"
                        />
                    </div>
                    <p className="map-address">Cl. 5 #7-44, San Alberto, Cesar, Colombia</p>
                </section>
            </main>
        </div>
    );
};

export default Contacto;
