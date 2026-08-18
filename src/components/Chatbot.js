import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, ExternalLink, MessageCircle, Phone, Send, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';
import logoBomberos from '../logo.png';

const EMERGENCIAS = 'tel:+573153538706';
const WHATSAPP = 'https://wa.me/573001751212';

const normalizar = (texto = '') => texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const INTENCIONES = [
  { palabras: ['emergencia','incendio','accidente','explosion','rescate','ambulancia'], respuesta: 'Si hay riesgo para personas o bienes, llama ahora a la línea de emergencias 315 353 8706. No esperes respuesta por chat.', acciones: [{ etiqueta: 'Llamar a emergencias', href: EMERGENCIAS, tipo: 'emergencia' }] },
  { palabras: ['capacitacion','curso','brigada','primeros auxilios','extintores'], respuesta: 'Ofrecemos capacitaciones en prevención, brigadas, primeros auxilios, evacuación y manejo de extintores. También puedes verificar una capacitación ya realizada.', acciones: [{ etiqueta: 'Consultar capacitación', ruta: '/consulta' }, { etiqueta: 'Solicitar cotización', ruta: '/cotizar' }] },
  { palabras: ['inspeccion','concepto','certificado','vigencia','nit'], respuesta: 'Puedes verificar certificados de inspección y constancias de capacitación en nuestra consulta institucional.', acciones: [{ etiqueta: 'Abrir consultas', ruta: '/consulta' }] },
  { palabras: ['cotizar','cotizacion','precio','costo','presupuesto'], respuesta: 'Cuéntanos el servicio que necesitas mediante el formulario de cotización y nuestro equipo te responderá por un canal oficial.', acciones: [{ etiqueta: 'Solicitar cotización', ruta: '/cotizar' }, { etiqueta: 'Hablar por WhatsApp', href: WHATSAPP }] },
  { palabras: ['servicio','portafolio','extintor','agua','botiquin'], respuesta: 'Nuestro portafolio incluye inspecciones, capacitaciones, recarga y mantenimiento de extintores, suministro de agua y equipos de seguridad.', acciones: [{ etiqueta: 'Ver portafolio', ruta: '/portafolio' }] },
  { palabras: ['direccion','ubicacion','donde','estacion'], respuesta: 'Estamos en la Calle 5 #7-44, barrio La Marina, San Alberto, Cesar.', acciones: [{ etiqueta: 'Ver contacto', ruta: '/contacto' }] },
  { palabras: ['horario','abren','atienden','disponibilidad'], respuesta: 'Las emergencias se atienden 24/7. Para trámites administrativos, escríbenos al WhatsApp institucional y coordinaremos tu atención.', acciones: [{ etiqueta: 'WhatsApp institucional', href: WHATSAPP }] },
  { palabras: ['contacto','whatsapp','asesor','persona','correo','telefono'], respuesta: 'Para atención no urgente puedes escribir al WhatsApp +57 300 175 1212 o consultar todos nuestros canales oficiales.', acciones: [{ etiqueta: 'Abrir WhatsApp', href: WHATSAPP }, { etiqueta: 'Ver contacto', ruta: '/contacto' }] },
  { palabras: ['nosotros','historia','bomberos','institucion'], respuesta: 'Somos el Cuerpo de Bomberos Voluntarios de San Alberto, una institución al servicio de la prevención y protección de la comunidad.', acciones: [{ etiqueta: 'Conócenos', ruta: '/nosotros' }] },
  { palabras: ['hola','buenas','buenos dias','saludos'], respuesta: '¡Hola! Soy el asistente virtual de Bomberos San Alberto. Puedo ayudarte con emergencias, consultas, capacitaciones, servicios y trámites.' },
  { palabras: ['gracias','listo','perfecto'], respuesta: '¡Con gusto! Estoy aquí si necesitas otra orientación.' },
];

const SUGERENCIAS = ['Consultar una capacitación', 'Verificar una inspección', 'Necesito una cotización', 'Hablar con un asesor'];

function Chatbot() {
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const finalRef = useRef(null);

  useEffect(() => { finalRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [mensajes, escribiendo]);
  useEffect(() => {
    const cerrar = (event) => event.key === 'Escape' && setAbierto(false);
    document.addEventListener('keydown', cerrar);
    return () => document.removeEventListener('keydown', cerrar);
  }, []);

  const mensajeInicial = useMemo(() => ({
    remitente: 'bot',
    texto: '¡Hola! ¿En qué puedo ayudarte hoy?',
    acciones: [{ etiqueta: 'Emergencia', href: EMERGENCIAS, tipo: 'emergencia' }],
  }), []);

  const responder = (pregunta) => {
    const consulta = normalizar(pregunta);
    const coincidencias = INTENCIONES.map((intencion) => ({
      ...intencion,
      puntaje: intencion.palabras.reduce((total, palabra) => total + (consulta.includes(palabra) ? palabra.length : 0), 0),
    })).sort((a, b) => b.puntaje - a.puntaje);
    if (coincidencias[0]?.puntaje > 0) return coincidencias[0];
    return {
      respuesta: 'Puedo orientarte sobre emergencias, inspecciones, capacitaciones, cotizaciones, servicios, horarios y contacto. Elige una opción o escribe el trámite que necesitas.',
      acciones: [{ etiqueta: 'Hablar con un asesor', href: WHATSAPP }, { etiqueta: 'Ver servicios', ruta: '/portafolio' }],
    };
  };

  const enviar = (valor) => {
    const pregunta = (valor ?? texto).trim();
    if (!pregunta || escribiendo) return;
    setMensajes((actuales) => [...actuales, { remitente: 'user', texto: pregunta }]);
    setTexto('');
    setEscribiendo(true);
    window.setTimeout(() => {
      const respuesta = responder(pregunta);
      setMensajes((actuales) => [...actuales, { remitente: 'bot', texto: respuesta.respuesta, acciones: respuesta.acciones }]);
      setEscribiendo(false);
    }, 450);
  };

  const ejecutarAccion = (accion) => {
    if (accion.ruta) {
      navigate(accion.ruta);
      setAbierto(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="assistant-shell">
      <button className={`assistant-launcher ${abierto ? 'abierto' : ''}`} onClick={() => setAbierto(!abierto)}
        aria-label={abierto ? 'Cerrar asistente' : 'Abrir asistente'} aria-expanded={abierto}>
        {abierto ? <X /> : <MessageCircle />}<span>¿Necesitas ayuda?</span>
      </button>
      {abierto && (
        <section className="assistant-window" role="dialog" aria-modal="false" aria-label="Asistente virtual de Bomberos San Alberto">
          <header className="assistant-header">
            <div className="assistant-avatar"><img src={logoBomberos} alt="" /></div>
            <div><strong>Asistente Bomberos</strong><span><i /> En línea · orientación inmediata</span></div>
            <button onClick={() => setAbierto(false)} aria-label="Cerrar"><X size={20} /></button>
          </header>
          <div className="assistant-emergency"><Phone size={17} /><span>¿Es una emergencia?</span><a href={EMERGENCIAS}>Llama al 315 353 8706</a></div>
          <div className="assistant-messages" aria-live="polite">
            {[mensajeInicial, ...mensajes].map((mensaje, index) => (
              <div className={`assistant-message-wrap ${mensaje.remitente}`} key={`${index}-${mensaje.texto}`}>
                {mensaje.remitente === 'bot' && <Bot size={17} />}
                <div><p className="assistant-message">{mensaje.texto}</p>
                  {mensaje.acciones?.length > 0 && <div className="assistant-actions">{mensaje.acciones.map((accion) => accion.href
                    ? <a key={accion.etiqueta} className={accion.tipo === 'emergencia' ? 'danger' : ''} href={accion.href} target={accion.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{accion.etiqueta}<ExternalLink size={13} /></a>
                    : <button key={accion.etiqueta} type="button" onClick={() => ejecutarAccion(accion)}>{accion.etiqueta}</button>)}</div>}
                </div>
              </div>
            ))}
            {escribiendo && <div className="assistant-typing"><span /><span /><span /></div>}
            {mensajes.length === 0 && <div className="assistant-suggestions">{SUGERENCIAS.map((opcion) => <button type="button" key={opcion} onClick={() => enviar(opcion)}>{opcion}</button>)}</div>}
            <div ref={finalRef} />
          </div>
          <form className="assistant-form" onSubmit={(event) => { event.preventDefault(); enviar(); }}>
            <label className="sr-only" htmlFor="assistant-input">Escribe tu consulta</label>
            <input id="assistant-input" value={texto} onChange={(event) => setTexto(event.target.value)} placeholder="Escribe tu consulta..." maxLength={300} />
            <button type="submit" aria-label="Enviar" disabled={!texto.trim() || escribiendo}><Send size={19} /></button>
          </form>
          <footer>Este asistente orienta; no reemplaza la línea de emergencias.</footer>
        </section>
      )}
    </div>
  );
}

export default Chatbot;

