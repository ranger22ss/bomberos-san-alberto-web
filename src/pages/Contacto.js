import React, { useState } from 'react';
// Importa el archivo CSS que acabas de crear
import './Contacto.css'; // Asegúrate de que la ruta sea correcta

// Importa los componentes globales si los tienes (Header, Footer)
// Por ejemplo, si tienes Header.js y Footer.js en src/components:
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// Para usar Font Awesome, puedes importar el CSS globalmente en _app.js
// o en el componente Layout si usas uno. Si no, la forma más sencilla es usar la CDN:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
// Para Next.js, la forma recomendada es en pages/_document.js o importar el paquete npm
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
// Y luego usar <FontAwesomeIcon icon={faPhoneAlt} />
// Por simplicidad, mantendremos la CDN en el HTML por ahora, pero lo ideal es usar el paquete.

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
        // <Header /> {/* Si tienes un componente Header global, úsalo aquí */}
        <div>
            {/* Encabezado específico de la página de contacto */}
            <header className="contact-header">
                <div className="contact-page-container">
                    <h1>Contacto</h1>
                    <p>Estamos aquí para ayudarte. Ponte en contacto con nosotros.</p>
                </div>
            </header>

            <main className="contact-page-container">
                <section className="contact-section contact-info">
                    <h2>Nuestros Datos de Contacto</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <i className="fas fa-phone-alt"></i>
                            <h3>Emergencias</h3>
                            <p>315-353-8706 (Sin WhatsApp)</p>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-headset"></i>
                            <h3>Atención al Cliente</h3>
                            <p>+57 300-175-1212 <a href="https://wa.me/573001751212" target="_blank" className="whatsapp-link"><i className="fab fa-whatsapp"></i> WhatsApp</a></p>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-envelope"></i>
                            <h3>Correos Electrónicos</h3>
                            <p>cuerpobomberossanalberto@gmail.com</p>
                            <p>cuerpobomberosvoluntariossanalberto@hotmail.com</p>
                        </div>
                        <div className="info-item">
                            <i className="fab fa-facebook-f"></i>
                            <h3>Síguenos en Facebook</h3>
                            <p><a href="https://www.facebook.com/profile.php?id=61563465837882" target="_blank">Cuerpo de Bomberos Voluntarios San Alberto</a></p>
                        </div>
                    </div>
                </section>

                <section className="contact-section contact-form-wrapper">
                    <h2>Envíanos un Mensaje</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre Completo</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email" // Usamos 'email' para el estado interno, pero enviamos como '_replyto'
                                value={formData.email}
                                onChange={handleChange}
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
                                required
                            ></textarea>
                        </div>
                        <button type="submit">Enviar Mensaje</button>
                        {formStatus && (
                            <p className={`form-status ${formStatusClass}`}>{formStatus}</p>
                        )}
                    </form>
                </section>
            </main>

            {/* Pie de página específico de la página de contacto, si no usas un Footer global */}
            {/* <footer className="contact-footer">
                <div className="contact-page-container">
                    <p>&copy; 2025 Cuerpo de Bomberos San Alberto. Todos los derechos reservados.</p>
                </div>
            </footer> */}
            {/* Si tienes un componente Footer global, úsalo aquí */}
            {/* <Footer /> */}
        </div>
    );
};

export default Contacto;