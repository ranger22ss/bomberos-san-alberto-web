import React, { useState } from 'react';
import { Clock3, Facebook, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck } from 'lucide-react';
import './Contacto.css';

const canales = [
  { Icono: Phone, titulo: 'Línea de emergencias', texto: '315 353 8706', detalle: 'Disponible 24 horas · Solo llamadas', href: 'tel:+573153538706', accion: 'Llamar ahora', urgente: true },
  { Icono: MessageCircle, titulo: 'Atención institucional', texto: '+57 300 175 1212', detalle: 'Solicitudes, trámites y cotizaciones', href: 'https://wa.me/573001751212', accion: 'Abrir WhatsApp' },
  { Icono: Mail, titulo: 'Correo electrónico', texto: 'cuerpobomberossanalberto@gmail.com', detalle: 'Respuesta a solicitudes administrativas', href: 'mailto:cuerpobomberossanalberto@gmail.com', accion: 'Enviar correo' },
  { Icono: Facebook, titulo: 'Comunidad', texto: 'Bomberos San Alberto', detalle: 'Noticias, prevención y actividades', href: 'https://www.facebook.com/profile.php?id=61563465837882', accion: 'Visitar Facebook' },
];

function Contacto() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [formStatusClass, setFormStatusClass] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleChange = ({ target: { name, value } }) => setFormData((actual) => ({ ...actual, [name]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEnviando(true);
    setFormStatus('Enviando mensaje…');
    setFormStatusClass('');
    try {
      const response = await fetch('https://formspree.io/f/xeokewdj', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: formData.name, _replyto: formData.email, subject: formData.subject, message: formData.message }),
      });
      if (!response.ok) throw new Error('No fue posible enviar el formulario');
      setFormStatus('Mensaje enviado correctamente. Nuestro equipo se pondrá en contacto contigo.');
      setFormStatusClass('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus('No pudimos enviar el mensaje. Inténtalo nuevamente o utiliza nuestros canales directos.');
      setFormStatusClass('error');
    } finally { setEnviando(false); }
  };

  return (
    <div className="contact-page">
      <header className="contact-hero">
        <div className="contact-hero__content">
          <span className="contact-kicker"><ShieldCheck size={16} /> Canales oficiales</span>
          <h1>Estamos para orientarte</h1>
          <p>Comunícate con el Cuerpo de Bomberos Voluntarios de San Alberto por el canal adecuado para tu solicitud.</p>
          <div className="contact-availability"><Clock3 size={18} /><span><strong>Emergencias 24/7</strong> · Atención administrativa por canales institucionales</span></div>
        </div>
      </header>

      <main className="contact-main-content">
        <section className="contact-channels" aria-labelledby="contact-channels-title">
          <div className="contact-section-heading"><span>Contacto directo</span><h2 id="contact-channels-title">Elige el canal que necesitas</h2><p>Para emergencias utiliza únicamente la línea telefónica. Los demás canales atienden trámites y solicitudes no urgentes.</p></div>
          <div className="contact-channel-grid">
            {canales.map(({ Icono, titulo, texto, detalle, href, accion, urgente }) => (
              <article className={`contact-channel-card ${urgente ? 'urgent' : ''}`} key={titulo}>
                <div className="contact-channel-icon"><Icono size={25} /></div>
                <div className="contact-channel-copy"><h3>{titulo}</h3><strong>{texto}</strong><p>{detalle}</p></div>
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{accion}<span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-form-section" aria-labelledby="contact-form-title">
          <div className="contact-form-copy"><span>Escríbenos</span><h2 id="contact-form-title">Cuéntanos cómo podemos ayudarte</h2><p>Completa el formulario con información clara. Nuestro equipo recibirá tu solicitud a través del canal institucional.</p><div className="contact-form-note"><ShieldCheck size={20} /><p><strong>Atención:</strong> este formulario no debe utilizarse para reportar emergencias.</p></div></div>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-row"><div className="form-group"><label htmlFor="name">Nombre completo</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Tu nombre" autoComplete="name" required /></div><div className="form-group"><label htmlFor="email">Correo electrónico</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="nombre@correo.com" autoComplete="email" required /></div></div>
            <div className="form-group"><label htmlFor="subject">Asunto</label><input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Motivo de tu solicitud" required /></div>
            <div className="form-group"><label htmlFor="message">Mensaje</label><textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} placeholder="Describe brevemente tu solicitud…" required /></div>
            <button type="submit" disabled={enviando}>{enviando ? 'Enviando…' : 'Enviar mensaje'}<Send size={18} /></button>
            {formStatus && <p className={`form-message ${formStatusClass}`} role="status">{formStatus}</p>}
          </form>
        </section>

        <section className="contact-location" aria-labelledby="contact-location-title">
          <div className="contact-location-copy"><span>Visítanos</span><h2 id="contact-location-title">Sede operativa en San Alberto</h2><p><MapPin size={18} /> Calle 5 #7-44, barrio La Marina<br />San Alberto, Cesar, Colombia</p><a href="https://www.google.com/maps/search/?api=1&query=Calle+5+%237-44+San+Alberto+Cesar" target="_blank" rel="noreferrer">Abrir ubicación en Google Maps →</a></div>
          <div className="contact-map-frame"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15878.777987823525!2d-73.84439155000001!3d8.64770155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5d0ec3f5f3e9b7%3A0xb366a2c2e0b5c165!2sSan%20Alberto%2C%20Cesar!5e0!3m2!1ses-419!2sco!4v1718561000000!5m2!1ses-419!2sco" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicación de Bomberos San Alberto" /></div>
        </section>
      </main>
    </div>
  );
}

export default Contacto;

