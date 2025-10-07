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
            keywords: ['servicios', 'portafolio', 'portafolio de servicios', 'qué hacen'],
            response: 'Ofrecemos prevención, inspecciones, mantenimiento y recarga de extintores, capacitaciones, suministro de agua potable y venta de equipos certificados. Puedes revisar el portafolio completo en la sección "Portafolio".'
        },
        {
            keywords: ['cotizar', 'presupuesto', 'cotización', 'precio'],
            response: 'Para recibir una propuesta formal ingresa a la sección "Cotizar" y completa el formulario con los servicios de interés. Nuestro equipo responderá en el menor tiempo posible.'
        },
        {
            keywords: ['donde estan', 'ubicación', 'dirección'],
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

    const websiteKnowledgeBase = `
    Información general del Cuerpo de Bomberos Voluntarios San Alberto:
    Somos una institución dedicada a la protección y seguridad de la comunidad de San Alberto, Cesar, Colombia.
    Nuestra misión es salvaguardar vidas y bienes, y trabajar activamente con la comunidad para un San Alberto más seguro y resiliente.
    Estamos comprometidos con la prevención y la respuesta efectiva ante diversas emergencias.

    Servicios principales que ofrecemos:
    - Atención de incendios estructurales y forestales.
    - Operaciones de rescate vehicular, en alturas y acuáticos.
    - Atención prehospitalaria y primeros auxilios en el lugar de accidentes.
    - Prevención y gestión del riesgo de desastres naturales o provocados por el hombre.
    - Capacitaciones y talleres para la comunidad y empresas en primeros auxilios, manejo de extintores y planes de emergencia.

    Contacto institucional:
    - Emergencias: 315-353-8706 (solo llamadas).
    - Atención al cliente y WhatsApp: +57 300-175-1212.
    - Correos: cuerpobomberossanalberto@gmail.com y cuerpobomberosvoluntariossanalberto@hotmail.com.
    - Ubicación: Cl. 5 #7-44, San Alberto, Cesar, Colombia.

    Cómo apoyar:
    Aceptamos donaciones y voluntariado. Encuentra más información en la sección "Nosotros" o "Contacto".

    Cotizar servicios:
    Visita la sección "Cotizar" para detallar tus necesidades y recibir una propuesta.
    `;

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

        if (matched) {
            const botMessage = { text: botResponseText, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setIsTyping(false);
            return;
        }

        try {
            let chatHistory = [];

            chatHistory.push({
                role: 'user',
                parts: [{
                    text: `Eres un asistente institucional del Cuerpo de Bomberos Voluntarios San Alberto. Responde únicamente con la información proporcionada a continuación. Si la pregunta supera el alcance, indícalo con transparencia y sugiere comunicarse con los canales oficiales.\n\nInformación de la página web:\n${websiteKnowledgeBase}`
                }]
            });

            chatHistory.push({ role: 'model', parts: [{ text: 'Entendido. Responderé únicamente con la información institucional proporcionada.' }] });

            messages.forEach(msg => {
                chatHistory.push({ role: msg.sender === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
            });
            chatHistory.push({ role: 'user', parts: [{ text: currentMessage }] });

            const payload = { contents: chatHistory };
            const apiKey = '';
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            botResponseText = 'Lo siento, no tengo información suficiente para responder a esa consulta. Por favor visita nuestras secciones de Portafolio o Cotizar, o comunícate con nosotros en la línea institucional.';

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                botResponseText = result.candidates[0].content.parts[0].text;
            }

            const botMessage = { text: botResponseText, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error al comunicarse con la API de Gemini:', error);
            const errorMessage = {
                text: 'En este momento no puedo conectar con nuestra base de conocimientos ampliada. Escríbenos nuevamente o utiliza nuestros canales de contacto institucionales.',
                sender: 'bot'
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setIsTyping(false);
        }
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
