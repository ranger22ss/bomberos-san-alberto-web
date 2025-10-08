import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import logoBomberos from '../logo.png';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const automaticResponses = [
        {
            keywords: ['hola', 'saludos', 'buenos días', 'buenas tardes', 'buenas noches'],
            response: '¡Hola! Soy el asistente virtual del Cuerpo de Bomberos Voluntarios de San Alberto. Estoy disponible para orientarte con información institucional y solicitudes no emergentes.'
        },
        {
            keywords: ['emergencia', 'emergencias', 'urgencia', 'llamar bomberos', 'número de emergencia'],
            response: 'Ante cualquier emergencia comunícate de inmediato a la línea 315 353 8706. Es un canal exclusivo para llamadas de emergencia.'
        },
        {
            keywords: ['whatsapp', 'atención al cliente', 'asesor'],
            response: 'Nuestro canal institucional de atención al cliente (no emergencias) es el WhatsApp +57 300 175 1212. Con gusto daremos seguimiento a tu solicitud.'
        },
        {
            keywords: ['certificados', 'certificado', 'validar certificado', 'consulta certificado'],
            response: 'Para validar certificados institucionales ingresa a la sección "Consulta" y escribe el código del certificado que deseas revisar. El sistema te mostrará el estado y los detalles registrados.'
        },
        {
            keywords: ['servicios', 'portafolio', 'portafolio de servicios', 'qué hacen'],
            response: 'Ofrecemos prevención, inspecciones, mantenimiento y recarga de extintores, capacitaciones, suministro de agua potable y venta de equipos certificados. Puedes revisar el portafolio completo en la sección "Portafolio".'
        },
        {
            keywords: ['cotizar', 'presupuesto', 'cotización', 'precio'],
            response: 'Para recibir una propuesta formal ingresa a la sección "Cotizar" y completa el formulario con los servicios de interés. Nuestro equipo responderá en el menor tiempo posible.'
        },
        {
            keywords: ['contacto', 'correo', 'email', 'teléfono', 'telefonos', 'comunicar'],
            response: 'Puedes comunicarte con nosotros por el correo cuerpobomberossanalberto@gmail.com o al WhatsApp institucional +57 300 175 1212. Si necesitas atención presencial, visita la Cl. 5 #7-44 en San Alberto, Cesar.'
        },
        {
            keywords: ['horario', 'disponibilidad', 'abren', 'cierran'],
            response: 'El equipo operativo permanece disponible 24/7 para emergencias en la línea 315 353 8706. Para trámites administrativos o comerciales escríbenos al WhatsApp +57 300 175 1212 y coordinaremos la atención.'
        },
        {
            keywords: ['nosotros', 'quienes son', 'quiénes son', 'institución', 'institucion'],
            response: 'Somos el Cuerpo de Bomberos Voluntarios de San Alberto, una institución que combina experiencia, vocación y tecnología para proteger a la comunidad. Puedes conocer nuestra historia y talento humano en la sección "Nosotros".'
        },
        {
            keywords: ['donde estan', 'ubicación', 'direccion', 'dirección', 'donde queda', 'ubicacion'],
            response: 'Nuestra base se encuentra en la Cl. 5 #7-44 de San Alberto, Cesar, Colombia. Atendemos a la comunidad y al sector empresarial de la región.'
        },
        {
            keywords: ['gracias'],
            response: '¡Con gusto! Seguiremos atentos si necesitas acompañamiento adicional.'
        }
    ];

    const suggestedQuestions = [
        '¿Cuál es la línea de emergencia?',
        'Necesito mantenimiento de extintores',
        '¿Brindan capacitaciones empresariales?',
        '¿Cómo solicito una inspección de seguridad?',
        '¿Cuál es la dirección de la estación?',
        'Quiero solicitar una cotización formal'
    ];

    const websiteKnowledgeBase = [
        'Somos una institución voluntaria al servicio de la comunidad de San Alberto, Cesar, enfocada en prevención, atención de emergencias y fortalecimiento de la gestión del riesgo.',
        'Servicios destacados: mantenimiento y recarga de extintores, botiquines certificados, inspecciones y conceptos de seguridad, capacitaciones especializadas, suministro de agua potable y acompañamiento logístico 24/7.',
        'Línea de emergencias: 315 353 8706 (disponible 24/7 únicamente para llamadas).',
        'Atención institucional y WhatsApp: +57 300 175 1212.',
        'Correos oficiales: cuerpobomberossanalberto@gmail.com y cuerpobomberosvoluntariossanalberto@hotmail.com.',
        'La base operativa se encuentra en la Cl. 5 #7-44, San Alberto, Cesar, Colombia.',
        'Las solicitudes de cotización se realizan en la sección "Cotizar" del sitio web, completando el formulario con los servicios requeridos.',
        'La validación de certificados institucionales está disponible en la sección "Consulta" ingresando el código correspondiente.'
    ];

    const buildFallbackResponse = (question) => {
        const formattedKnowledge = websiteKnowledgeBase.map((item) => `• ${item}`).join('\n');

        return (
            `Gracias por tu mensaje${question ? ` sobre "${question}"` : ''}. ` +
            'Soy el asistente virtual del Cuerpo de Bomberos Voluntarios de San Alberto y puedo compartir información institucional disponible en este sitio web.\n\n' +
            `${formattedKnowledge}\n\n` +
            'Si necesitas un trámite o detalle puntual, dime qué sección deseas consultar y te guiaré paso a paso o te indicaré nuestros canales oficiales.'
        );
    };

    const handleSuggestedQuestionClick = (question) => {
        setInputMessage(question);
        setTimeout(() => {
            handleSendMessage({ preventDefault: () => {} });
        }, 0);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const currentMessage = inputMessage.trim();
        if (currentMessage === '') return;

        const userMessage = { text: currentMessage, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        let botResponseText = '';
        const lowerCaseInput = currentMessage.toLowerCase();
        let matched = false;

        for (const autoResponse of automaticResponses) {
            for (const keyword of autoResponse.keywords) {
                if (lowerCaseInput.includes(keyword)) {
                    botResponseText = autoResponse.response;
                    matched = true;
                    break;
                }
            }
            if (matched) break;
        }

        if (!matched) {
            const botMessage = { text: buildFallbackResponse(currentMessage), sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setIsTyping(false);
            return;
        }

        const botMessage = { text: botResponseText, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setIsTyping(false);
    };

    return (
        <div className="chatbot-container">
            <button className="chatbot-toggle-button" onClick={toggleChat} aria-expanded={isOpen} aria-controls="chat-window">
                {isOpen ? (
                    <i className="fas fa-times" aria-hidden="true"></i>
                ) : (
                    <svg className="firefighter-helmet-icon" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9v3H3v2h2v7h14v-7h2v-2h-2V9c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5v3H7V9zm12 10h-2v-5h-2v5H7v-5H5v5H3v-7h18v7h-2z" />
                    </svg>
                )}
            </button>

            {isOpen && (
                <div className="chat-window" id="chat-window" role="dialog" aria-label="Asistente virtual Bomberos San Alberto">
                    <div className="chat-header">
                        <div className="chat-brand">
                            <img src={logoBomberos} alt="Logo Bomberos San Alberto" />
                            <div>
                                <h3>Asistente Bomberos San Alberto</h3>
                                <p>Respuestas institucionales en tiempo real</p>
                            </div>
                        </div>
                        <button className="close-chat-button" onClick={toggleChat} aria-label="Cerrar chat">
                            <i className="fas fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="chat-messages">
                        {messages.length === 0 && (
                            <div className="chat-welcome-message">
                                ¡Hola! Soy tu asistente institucional. Puedo orientarte en solicitudes, servicios y contacto con nuestro equipo.
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot typing-indicator" aria-live="polite">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                        <div className="suggested-questions-container">
                            <p className="suggestions-title">Preguntas frecuentes</p>
                            <div className="suggestions-list">
                                {suggestedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        className="suggested-question-button"
                                        onClick={() => handleSuggestedQuestionClick(question)}
                                        type="button"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <form className="chat-input-form" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Escribe tu mensaje institucional..."
                            disabled={isTyping}
                            aria-label="Escribe tu mensaje"
                        />
                        <button type="submit" disabled={isTyping} aria-label="Enviar mensaje">
                            <i className="fas fa-paper-plane" aria-hidden="true"></i>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
