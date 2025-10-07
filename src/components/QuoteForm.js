import React, { useState } from 'react';
import './QuoteForm.css';
import { Send, Phone, Mail, Building2, ClipboardCheck, Loader2 } from 'lucide-react';

const FORMSPREE_FORM_URL = 'https://formspree.io/f/xeokewdj';

const serviceOptions = [
  { id: 'extintores-nuevos', label: 'Extintores certificados y accesorios' },
  { id: 'mantenimiento-recarga', label: 'Mantenimiento y recarga de extintores' },
  { id: 'inspecciones', label: 'Inspecciones y conceptos técnicos de seguridad' },
  { id: 'capacitaciones', label: 'Capacitaciones, simulacros y formación empresarial' },
  { id: 'kits-emergencia', label: 'Botiquines y kits de emergencia' },
  { id: 'suministro-agua', label: 'Suministro y transporte de agua potable' }
];

const QuoteForm = ({
  layout = 'full',
  title = 'Solicita una propuesta a la medida',
  description = 'Comparte tus datos y selecciona los servicios que necesitas. Nuestro equipo se comunicará contigo con una propuesta formal.',
  showServiceList = true
}) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ state: 'loading', message: '' });

    try {
      const formData = new FormData(event.target);
      if (selectedServices.length > 0) {
        formData.append('Servicios de interés', selectedServices.join(', '));
      }

      const response = await fetch(FORMSPREE_FORM_URL, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        setStatus({ state: 'success', message: 'Hemos recibido tu solicitud. Un miembro de nuestro equipo se comunicará en horario laboral.' });
        event.target.reset();
        setSelectedServices([]);
      } else {
        const data = await response.json();
        const errorMessage = data.errors?.map((err) => err.message).join(', ') || 'No pudimos enviar tu solicitud en este momento.';
        setStatus({ state: 'error', message: errorMessage });
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de cotización', error);
      setStatus({ state: 'error', message: 'Hubo un inconveniente de conexión. Intenta nuevamente o comunícate por nuestros canales institucionales.' });
    }
  };

  if (status.state === 'success') {
    return (
      <div className={`quote-form quote-form--${layout}`}>
        <div className="quote-form__success">
          <div className="quote-form__success-icon" aria-hidden="true">✅</div>
          <h3>¡Gracias por escribirnos!</h3>
          <p>{status.message}</p>
          <button type="button" onClick={() => setStatus({ state: 'idle', message: '' })}>
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`quote-form quote-form--${layout}`}>
      <div className="quote-form__intro">
        <span className="quote-form__eyebrow">Atención institucional</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="quote-form__channels">
          <div>
            <Phone size={18} aria-hidden="true" />
            <span>Emergencias (solo llamadas): 315 353 8706</span>
          </div>
          <div>
            <Mail size={18} aria-hidden="true" />
            <span>Atención al cliente (WhatsApp): +57 300 175 1212</span>
          </div>
        </div>
      </div>

      <form className="quote-form__form" onSubmit={handleSubmit}>
        <div className="quote-form__grid">
          <label className="quote-form__field">
            <span>Nombre completo*</span>
            <input type="text" name="Nombre" placeholder="Nombre y apellidos" required />
          </label>
          <label className="quote-form__field">
            <span>Empresa o entidad</span>
            <input type="text" name="Empresa" placeholder="Nombre de la empresa" />
          </label>
          <label className="quote-form__field">
            <span>Correo electrónico*</span>
            <input type="email" name="Email" placeholder="correo@empresa.com" required />
          </label>
          <label className="quote-form__field">
            <span>Teléfono o WhatsApp*</span>
            <input type="tel" name="Telefono" placeholder="Indicativo + número" required />
          </label>
        </div>

        {showServiceList && (
          <div className="quote-form__services">
            <div className="quote-form__services-header">
              <Building2 size={20} aria-hidden="true" />
              <span>Selecciona los servicios de interés</span>
            </div>
            <div className="quote-form__services-options">
              {serviceOptions.map((service) => (
                <label key={service.id} className="quote-form__checkbox">
                  <input
                    type="checkbox"
                    value={service.id}
                    checked={selectedServices.includes(service.id)}
                    onChange={() => handleServiceToggle(service.id)}
                  />
                  <span>{service.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <label className="quote-form__field quote-form__field--textarea">
          <span>Cuéntanos los detalles del proyecto*</span>
          <textarea
            name="Mensaje"
            placeholder="Comparte fechas tentativas, cobertura requerida y cualquier información relevante."
            rows={layout === 'compact' ? 4 : 6}
            required
          ></textarea>
        </label>

        <div className="quote-form__submit">
          <button type="submit" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? (
              <>
                <Loader2 className="quote-form__spinner" size={18} aria-hidden="true" />
                Enviando
              </>
            ) : (
              <>
                <Send size={18} aria-hidden="true" />
                Enviar solicitud
              </>
            )}
          </button>
          <p>
            <ClipboardCheck size={18} aria-hidden="true" />
            Respuesta en horario laboral máximo 24 horas.
          </p>
        </div>

        {status.state === 'error' && (
          <div className="quote-form__feedback quote-form__feedback--error" role="alert">
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default QuoteForm;
