import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; // Importa los estilos CSS para el chatbot

const Chatbot = () => {
    // Estado para controlar si el chat está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);
    // Estado para almacenar los mensajes del chat (historial)
    const [messages, setMessages] = useState([]);
    // Estado para el mensaje que el usuario está escribiendo
    const [inputMessage, setInputMessage] = useState('');
    // Estado para indicar si el bot está pensando/escribiendo una respuesta
    const [isTyping, setIsTyping] = useState(false);

    // Referencia para el área de mensajes, para hacer scroll automático
    const messagesEndRef = useRef(null);

    // Efecto para hacer scroll al final de los mensajes cada vez que se actualiza el historial
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Función para alternar la visibilidad del chat
    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    // Respuestas automáticas predefinidas (para preguntas muy directas y rápidas)
    const automaticResponses = [
        {
            keywords: ['hola', 'saludos', 'buenos días', 'buenas tardes', 'buenas noches'],
            response: '¡Hola! Soy tu asistente del Cuerpo de Bomberos Voluntarios San Alberto. ¿En qué puedo ayudarte hoy?'
        },
        {
            keywords: ['emergencias', 'llamar bomberos', 'número de emergencia'],
            response: 'Para emergencias, por favor, llama directamente al 315-353-8706. Este número no tiene WhatsApp.'
        },
        {
            keywords: ['whatsapp', 'atención al cliente', 'hablar con asesor'],
            response: 'Puedes contactar a nuestro equipo de atención al cliente a través de WhatsApp al +57 300-175-1212. También puedes encontrar nuestros correos electrónicos en la sección de Contacto.'
        },
        {
            keywords: ['servicios', 'que hacen', 'tipo de ayuda'],
            response: 'En el Cuerpo de Bomberos Voluntarios San Alberto brindamos atención a incendios, rescates, accidentes, prevención de desastres y capacitaciones a la comunidad.'
        },
        {
            keywords: ['como ayudar', 'donaciones', 'voluntariado'],
            response: '¡Tu apoyo es muy valioso! Para conocer cómo puedes colaborar con donaciones o unirte como voluntario, te invitamos a visitar nuestra sección "Nosotros" o "Contacto" en la página web.'
        },
        {
            keywords: ['ubicación', 'donde estan', 'dirección'],
            response: 'Nuestra sede principal está ubicada en Cl. 5 #7-44, San Alberto, Cesar, Colombia.'
        },
        {
            keywords: ['gracias', 'muchas gracias'],
            response: '¡De nada! Es un placer ayudarte. No dudes en preguntar si tienes más dudas.'
        },
        {
            keywords: ['portafolio', 'proyectos', 'nuestro trabajo'],
            response: 'Puedes ver nuestro trabajo y proyectos en la sección de "Portafolio" de nuestra página web. ¡Ahí encontrarás más detalles sobre nuestras actividades!'
        },
        {
            keywords: ['cotizar', 'presupuesto', 'costo', 'precios'],
            response: 'Para solicitar una cotización de nuestros servicios o capacitaciones, por favor, visita nuestra sección "Cotizar" en la página web y llena el formulario.'
        },
        {
            keywords: ['consulta', 'duda', 'preguntas generales'],
            response: 'Si tienes alguna consulta o duda general, puedes utilizar el formulario en nuestra sección "Consulta" o la sección de "Contacto".'
        }
    ];

    // Preguntas sugeridas para la UI
    const suggestedQuestions = [
        "¿Cuál es el número de emergencia?",
        "¿Qué servicios ofrecen los bomberos?",
        "¿Cómo puedo ayudar a los bomberos?",
        "¿Dónde están ubicados?",
        "Quiero saber sobre el portafolio.",
        "¿Cómo puedo contactar por WhatsApp?",
        "¿Cómo solicito una cotización?",
        "Consultas Generales"
    ];

    // ***** BASE DE CONOCIMIENTO DE LA PÁGINA WEB *****
    const websiteKnowledgeBase = `
    Información general del Cuerpo de Bomberos Voluntarios San Alberto:
    Somos una institución dedicada a la protección y seguridad de la comunidad de San Alberto, Cesar, Colombia.
    Nuestra misión es salvaguardar vidas y bienes, y trabajar activamente con la comunidad para un San Alberto más seguro y resiliente.
    Estamos comprometidos con la prevención y la respuesta efectiva ante diversas emergencias.

    Servicios principales que ofrecemos:
    - Atención de incendios estructurales (hogares, edificios, negocios) y forestales (quemas de vegetación).
    - Operaciones de rescate en diferentes situaciones: rescates vehiculares (accidentes de tránsito), rescates en alturas (personas atrapadas en edificios altos o estructuras), y rescates acuáticos (personas en cuerpos de agua).
    - Atención prehospitalaria y primeros auxilios en el lugar de accidentes.
    - Prevención y gestión del riesgo de desastres naturales y provocados por el hombre.
    - Capacitaciones y talleres para la comunidad y empresas en temas como primeros auxilios, prevención de incendios, uso de extintores, planes de evacuación y simulacros.

    Cómo contactarnos:
    - Para EMERGENCIAS URGENTES: Llama directamente al 315-353-8706. Este número es solo para llamadas de emergencia y NO tiene servicio de WhatsApp.
    - Para ATENCIÓN AL CLIENTE y consultas NO URGENTES (incluyendo WhatsApp): Puedes contactar a nuestro equipo al +57 300-175-1212.
    - Correos electrónicos de contacto:
        - cuerpobomberossanalberto@gmail.com
        - cuerpobomberosvoluntariossanalberto@hotmail.com
    - Síguenos en Facebook: Puedes encontrar nuestra página oficial "Cuerpo de Bomberos Voluntarios San Alberto" en https://www.facebook.com/profile.php?id=61563465837882 para noticias y actualizaciones.

    Nuestra Ubicación:
    Nuestra sede principal está ubicada en Cl. 5 #7-44, San Alberto, Cesar, Colombia. Te invitamos a visitarnos.

    Sobre Nosotros (Sección de la página):
    En la sección "Nosotros" de nuestra página web, encontrarás información detallada sobre nuestra historia, nuestros valores fundamentales, la misión y visión de nuestra institución. También podrás conocer más sobre nuestro equipo de voluntarios y la dedicación que ponen en su trabajo.

    Portafolio (Sección de la página):
    La sección "Portafolio" exhibe una galería de nuestro trabajo y proyectos. Aquí mostramos ejemplos visuales (imágenes y videos) de nuestras intervenciones, capacitaciones realizadas, simulacros de emergencia, y diversas actividades en las que hemos participado para el beneficio de la comunidad. Es una muestra de nuestro impacto y compromiso.

    Cómo puedes apoyar a los Bomberos:
    Tu apoyo es fundamental para que podamos continuar con nuestra labor. Aceptamos donaciones de recursos, equipos o fondos. También puedes unirte a nuestra valiosa labor a través de programas de voluntariado. Para más información sobre cómo colaborar, por favor, visita nuestra sección "Nosotros" o "Contacto" en la página web, o comunícate con nosotros directamente.

    Cotizar Servicios:
    Si tu empresa o institución requiere capacitaciones especializadas o servicios de prevención y seguridad, puedes solicitar una cotización personalizada. Dirígete a la sección "Cotizar" en nuestra página web, donde encontrarás un formulario específico para describir tus necesidades y te enviaremos una propuesta.

    Consultas Generales:
    Para cualquier otra duda o pregunta que no sea una emergencia ni una cotización formal, te invitamos a usar el formulario de contacto en la sección "Contacto" o la sección "Consulta" de nuestra página web.
    `;
    // *******************************************************************

    // Función para manejar el clic en una pregunta sugerida
    const handleSuggestedQuestionClick = (question) => {
        setInputMessage(question); // Establece la pregunta en el input
        setTimeout(() => {
            handleSendMessage({ preventDefault: () => {} });
        }, 0);
    };

    // Función para manejar el envío de mensajes por parte del usuario
    const handleSendMessage = async (e) => {
        e.preventDefault();

        const currentMessage = inputMessage.trim();
        if (currentMessage === '') return;

        const userMessage = { text: currentMessage, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputMessage('');

        setIsTyping(true);

        let botResponseText = '';

        // Lógica para respuestas automáticas
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

        // Si no hay respuesta automática, llama a la API de Gemini con el conocimiento de la web
        try {
            let chatHistory = [];
            
            chatHistory.push({
                role: "user",
                parts: [{ text: `Eres un asistente amigable y útil del Cuerpo de Bomberos Voluntarios San Alberto. Tu tarea es responder con PRECISIÓN las preguntas de los usuarios utilizando EXCLUSIVAMENTE la siguiente "Información de la página web".
                Si una pregunta NO puede ser respondida con la información proporcionada, debes indicar CLARAMENTE que no tienes esa información específica en tu base de datos, y sugerir visitar las secciones relevantes de la página o contactar directamente a los bomberos, proporcionando los datos de contacto pertinentes si aplica. NO inventes información.

                Información de la página web:
                ${websiteKnowledgeBase}` }]
            });
            chatHistory.push({ role: "model", parts: [{ text: "Entendido, responderé solo con la información proporcionada sobre el Cuerpo de Bomberos Voluntarios San Alberto." }] });

            messages.forEach(msg => {
                chatHistory.push({ role: msg.sender === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
            });
            chatHistory.push({ role: "user", parts: [{ text: currentMessage }] });

            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            console.log("Respuesta completa del LLM (con base de conocimiento):", result);

            botResponseText = "Lo siento, no pude encontrar una respuesta específica a eso en la información que tengo disponible. Te sugiero que revises las secciones relevantes de nuestra página web o nos contactes directamente en los teléfonos de emergencia 315-353-8706 o atención al cliente +57 300-175-1212.";
            
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                botResponseText = result.candidates[0].content.parts[0].text;
            } else {
                console.error("Estructura de respuesta inesperada de la API:", result);
            }

            const botMessage = { text: botResponseText, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);

        } catch (error) {
            console.error("Error al comunicarse con la API de Gemini (con base de conocimiento):", error);
            const errorMessage = { text: "Disculpa, hubo un error de conexión al obtener la respuesta. Por favor, inténtalo de nuevo más tarde.", sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chatbot-container">
            {/* Botón flotante para abrir/cerrar el chat */}
            <button className="chatbot-toggle-button" onClick={toggleChat}>
                {/* Ícono de casco de bombero SVG */}
                {isOpen ? (
                    <i className="fas fa-times"></i> // Ícono de Font Awesome para cerrar
                ) : (
                    // SVG de un casco de bombero estilizado
                    <svg className="firefighter-helmet-icon" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9v3H3v2h2v7h14v-7h2v-2h-2V9c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5v3H7V9zm12 10h-2v-5h-2v5H7v-5H5v5H3v-7h18v7h-2z"/>
                    </svg>
                )}
            </button>

            {/* Ventana de chat (visible solo si isOpen es true) */}
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Asistente de Bomberos San Alberto</h3>
                        <button className="close-chat-button" onClick={toggleChat}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="chat-messages">
                        {messages.length === 0 && (
                            <div className="chat-welcome-message">
                                ¡Hola! Soy tu asistente del Cuerpo de Bomberos Voluntarios San Alberto.
                                ¿En qué puedo ayudarte hoy?
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot typing-indicator">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                        <div className="suggested-questions-container">
                            <p className="suggestions-title">O prueba con estas preguntas:</p>
                            <div className="suggestions-list">
                                {suggestedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        className="suggested-question-button"
                                        onClick={() => handleSuggestedQuestionClick(question)}
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
                            placeholder="Escribe tu mensaje..."
                            disabled={isTyping}
                        />
                        <button type="submit" disabled={isTyping}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
