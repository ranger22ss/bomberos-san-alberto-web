import React, { useState } from 'react';
import './Contacto.css';

const Contacto = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState('');
    const [formStatusClass, setFormStatusClass] = useState(''); // Inicializado correctamente

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFormStatus('Enviando mensaje...');
        setFormStatusClass(''); 

        const formspreeUrl = "https://formspree.io/f/xeokewdj";

        const dataToSend = {
            name: formData.name,
            _replyto: formData.email, 
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
                            {/* Logo de Teléfono */}
                            <img src="https://media.istockphoto.com/id/1180028723/es/vector/tel%C3%A9fono-con-el-icono-de-s%C3%ADmbolo-de-ondas-negro-simple-aislado-vector-stock-ilustraci%C3%B3n.jpg?s=612x612&w=0&k=20&c=W9TgvFdobzKSPPnhf3235H31XrGh2dtC2tsQnQ5Aroc=" alt="Logo de teléfono de emergencias" className="contact-icon" />
                            <h3>Emergencias</h3>
                            <p>315-353-8706 (Sin WhatsApp)</p>
                        </div>
                        <div className="info-item">
                            {/* Logo de WhatsApp */}
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" alt="Logo de WhatsApp para atención al cliente" className="contact-icon" />
                            <h3>Atención al Cliente</h3>
                            <p>+57 300-175-1212</p>
                            <a href="https://wa.me/573001751212" target="_blank" rel="noreferrer" className="whatsapp-button">
                                <i className="fab fa-whatsapp"></i> Enviar WhatsApp
                            </a>
                        </div>
                        <div className="info-item">
                            {/* Logo de Email */}
                            <img src="https://img.freepik.com/psd-gratis/diseno-icono-telefono_23-2151311652.jpg?semt=ais_hybrid&w=740" alt="Logo de correo electrónico" className="contact-icon" />
                            <h3>Correos Electrónicos</h3>
                            <p>cuerpobomberossanalberto@gmail.com</p>
                            <p>cuerpobomberosvoluntariossanalberto@hotmail.com</p>
                        </div>
                        <div className="info-item">
                            {/* Logo de Facebook */}
                            <img src="https://img.freepik.com/fotos-premium/logotipo-facebook_1080029-107.jpg?semt=ais_hybrid&w=740" alt="Logo de Facebook" className="contact-icon" />
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

                {/* Sección de Ubicación/Mapa */}
                <section className="contact-map-section">
                    <h2>Nuestra Ubicación</h2>
                    <p>Visítanos en nuestra sede. Estamos aquí para servirte.</p>
                    <div className="map-placeholder">
                        {/* Google Maps Embed - Reemplaza 'YOUR_Maps_EMBED_CODE_HERE' con el código real de tu iframe */}
                        {/* He ajustado el src a un mapa genérico de Colombia, pero es mejor usar el que generes. */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15878.777987823525!2d-73.84439155000001!3d8.64770155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5d0ec3f5f3e9b7%3A0xb366a2c2e0b5c165!2sSan%20Alberto%2C%20Cesar!5e0!3m2!1ses-419!2sco!4v1718561000000!5m2!1ses-419!2sco"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación de Bomberos San Alberto" // Añade un título para accesibilidad
                        ></iframe>
                    </div>
                    <p className="map-address">Cl. 5 #7-44, San Alberto, Cesar, Colombia</p>
                </section>
            </main>
        </div>
    );
};

export default Contacto;