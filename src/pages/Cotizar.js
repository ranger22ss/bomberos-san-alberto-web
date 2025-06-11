import React, { useState } from 'react';
// Importamos solo los íconos de Lucide React que realmente se utilizan en este componente
import { Mail, Phone, MessageSquareText } from 'lucide-react';
// Ya no necesitamos importar './Cotizar.css' porque los estilos están aquí abajo.

const Cotizar = () => {
    // Estilos CSS Integrados directamente en el componente
    const cotizarStyles = `
        /* Importar la fuente Inter */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');

        /* Estilos Generales */
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background-color: #f4f7f6; /* Un gris muy claro */
            color: #333; /* Color de texto oscuro */
            line-height: 1.6;
        }

        .cotizar-container {
            min-height: 100vh;
            background: linear-gradient(to bottom right, #e0f2f7, #d1e8ed); /* Degradado suave */
            padding-bottom: 3rem; /* Espacio al final */
        }

        .cotizar-content-wrapper {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem; /* Espaciado horizontal */
        }

        /* Header */
        .cotizar-header {
            background-color: #1a202c; /* Azul oscuro similar a tu diseño previo */
            color: white;
            text-align: center;
            padding: 4rem 1.5rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border-bottom-left-radius: 2rem;
            border-bottom-right-radius: 2rem;
            margin-bottom: 3rem;
        }

        .cotizar-header h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            animation: fadeInDown 0.6s ease-out;
        }

        .cotizar-header p {
            font-size: 1.25rem;
            font-weight: 300;
            opacity: 0.9;
            animation: fadeInDown 0.6s ease-out 0.1s; /* Retraso para un efecto escalonado */
        }

        /* Secciones Generales */
        .cotizar-section {
            background-color: #ffffff;
            padding: 2.5rem;
            border-radius: 1.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            margin-bottom: 3rem;
            animation: fadeInUp 0.6s ease-out;
        }

        .cotizar-section h2 {
            font-size: 2.25rem;
            font-weight: 700;
            color: #2d3748; /* Un gris oscuro */
            margin-bottom: 2rem;
            text-align: center;
            padding-bottom: 1rem;
            border-bottom: 2px solid #3182ce; /* Un azul medio */
        }

        /* Grid principal para selección de servicios y formulario */
        .cotizar-grid {
            display: grid;
            grid-template-columns: 1fr; /* Una columna por defecto */
            gap: 2.5rem; /* Espacio entre columnas/filas */
        }

        @media (min-width: 1024px) { /* Para pantallas grandes (lg) */
            .cotizar-grid {
                grid-template-columns: 1fr 1fr; /* Dos columnas */
            }
        }

        /* Sección de Selección de Servicios */
        .services-selection {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .services-selection h3 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #4a5568; /* Gris oscuro */
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #cbd5e0;
        }

        .category-group {
            margin-bottom: 2rem;
        }

        .category-group h4 {
            font-size: 1.25rem;
            font-weight: 700;
            color: #3182ce; /* Azul */
            margin-bottom: 1rem;
            padding: 0.75rem 1rem;
            background-color: #ebf8ff; /* Azul muy claro */
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .category-items-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        @media (min-width: 768px) { /* Para pantallas medianas (md) */
            .category-items-grid {
                grid-template-columns: repeat(2, 1fr); /* Dos columnas */
            }
        }


        .service-item-checkbox {
            display: flex;
            align-items: flex-start;
            padding: 1.25rem;
            background-color: #f7fafc; /* Gris claro */
            border-radius: 0.75rem;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            border: 1px solid #e2e8f0;
        }

        .service-item-checkbox:hover {
            background-color: #ebf8ff; /* Azul muy claro al pasar el ratón */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border-color: #90cdf4; /* Azul claro */
        }

        .service-item-checkbox input[type="checkbox"] {
            margin-right: 1rem;
            min-width: 1.5rem; /* Asegura que el checkbox no sea demasiado pequeño */
            min-height: 1.5rem;
            accent-color: #3182ce; /* Color del checkbox */
            border-radius: 0.25rem;
            cursor: pointer;
        }

        .service-item-checkbox .service-details {
            flex-grow: 1;
        }

        .service-item-checkbox h5 {
            font-size: 1.125rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 0.25rem;
        }

        .service-item-checkbox p {
            font-size: 0.875rem;
            color: #4a5568;
            line-height: 1.4;
        }

        /* Sección del Formulario de Datos */
        .cotizacion-form-wrapper {
            background-color: #ebf8ff; /* Azul muy claro */
            padding: 2.5rem;
            border-radius: 1.5rem;
            box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05); /* Sombra interior */
            border: 1px solid #bee3f8; /* Borde azul claro */
        }

        .cotizacion-form-wrapper h3 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #2c5282; /* Azul más oscuro */
            margin-bottom: 2rem;
            text-align: center;
        }

        .cotizacion-form .form-group {
            margin-bottom: 1.5rem;
        }

        .cotizacion-form label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: #4a5568;
            margin-bottom: 0.5rem;
        }

        .cotizacion-form input[type="text"],
        .cotizacion-form input[type="email"],
        .cotizacion-form input[type="tel"],
        .cotizacion-form textarea {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #cbd5e0; /* Gris claro */
            border-radius: 0.5rem;
            font-size: 1rem;
            color: #2d3748;
            transition: all 0.2s ease-in-out;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
            outline: none; /* Elimina el borde de enfoque por defecto */
        }

        .cotizacion-form input:focus,
        .cotizacion-form textarea:focus {
            border-color: #3182ce; /* Azul al enfocar */
            box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3); /* Sombra de enfoque */
        }

        .cotizacion-form textarea {
            resize: vertical; /* Permite redimensionar verticalmente */
            min-height: 100px;
        }

        .submit-button {
            width: 100%;
            padding: 1rem 1.5rem;
            background-color: #3182ce; /* Azul principal */
            color: white;
            font-size: 1.125rem;
            font-weight: 700;
            border: none;
            border-radius: 2rem;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(49, 130, 206, 0.4);
            transition: all 0.3s ease-in-out;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .submit-button:hover {
            background-color: #2b6cb0; /* Azul más oscuro al pasar el ratón */
            transform: translateY(-2px); /* Efecto de elevación */
            box-shadow: 0 6px 15px rgba(49, 130, 206, 0.6);
        }

        .submit-button:disabled {
            background-color: #a0aec0; /* Gris al estar deshabilitado */
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
        }

        /* Mensajes de Estado del Formulario */
        .form-status {
            padding: 1rem;
            border-radius: 0.75rem;
            margin-bottom: 1.5rem;
            font-weight: 500;
            text-align: center;
        }

        .form-status.success {
            background-color: #d4edda; /* Verde claro */
            color: #155724; /* Verde oscuro */
            border: 1px solid #c3e6cb;
        }

        .form-status.error {
            background-color: #f8d7da; /* Rojo claro */
            color: #721c24; /* Rojo oscuro */
            border: 1px solid #f5c6cb;
        }

        /* Contenedor para el mensaje de éxito */
        .cotizar-success-container {
            min-height: 100vh;
            background: linear-gradient(to bottom right, #e0f2f7, #d1e8ed);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }

        .cotizar-success-box {
            background-color: #ffffff;
            padding: 3rem 2rem;
            border-radius: 1.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            text-align: center;
            max-width: 500px;
            width: 100%;
            border: 1px solid #e2e8f0;
            animation: fadeIn 0.8s ease-out;
        }

        .cotizar-success-box h2 {
            font-size: 2.5rem;
            font-weight: 800;
            color: #2d3748;
            margin-bottom: 1rem;
            animation: fadeInDown 0.7s ease-out;
        }

        .cotizar-success-box p {
            font-size: 1.1rem;
            color: #4a5568;
            margin-bottom: 2rem;
            animation: fadeInUp 0.7s ease-out 0.1s;
        }

        .inicio-button {
            display: inline-block;
            padding: 1rem 2rem;
            background-color: #3182ce;
            color: white;
            text-decoration: none;
            font-weight: 700;
            border-radius: 2rem;
            box-shadow: 0 4px 10px rgba(49, 130, 206, 0.4);
            transition: all 0.3s ease-in-out;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            animation: fadeInUp 0.7s ease-out 0.2s;
        }

        .inicio-button:hover {
            background-color: #2b6cb0;
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 6px 15px rgba(49, 130, 206, 0.6);
        }


        /* Información de Contacto Directo */
        .direct-contact-info {
            background-color: #ffffff;
            padding: 2.5rem;
            border-radius: 1.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            text-align: center;
            animation: fadeInUp 0.6s ease-out 0.1s;
        }

        .direct-contact-info h3 {
            font-size: 1.75rem;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid #3182ce;
            display: inline-block; /* Para que el borde inferior solo abarque el texto */
        }

        .direct-contact-info p {
            font-size: 1rem;
            color: #4a5568;
            margin-bottom: 1.5rem;
        }

        .contact-details {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-top: 2rem;
        }

        @media (min-width: 768px) { /* Para pantallas medianas (md) */
            .contact-details {
                flex-direction: row;
                justify-content: center;
                gap: 2rem;
            }
        }

        .contact-item {
            background-color: #ebf8ff; /* Azul muy claro */
            padding: 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: all 0.2s ease-in-out;
            border: 1px solid #bee3f8;
            flex: 1; /* Permite que los elementos se expandan */
            min-width: 180px; /* Ancho mínimo para elementos de contacto */
        }

        .contact-item:hover {
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-3px);
            background-color: #e0f2f7;
        }

        .contact-item .contact-icon {
            color: #3182ce; /* Azul de los íconos */
            margin-bottom: 0.75rem;
            width: 36px; /* Tamaño fijo para los íconos */
            height: 36px;
        }

        .contact-item p {
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 0.5rem;
        }

        .contact-item a {
            color: #2b6cb0; /* Azul más oscuro para los enlaces */
            text-decoration: none;
            font-size: 1rem;
            word-break: break-all; /* Para correos largos */
            text-align: center;
        }

        .contact-item a:hover {
            text-decoration: underline;
            color: #3182ce;
        }

        /* Animaciones */
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;

    // Todos los datos detallados del portafolio, extraídos de tus indicaciones
    const datosPortafolio = {
        datosVentaExtintores: [
            { producto: "ABC DE 10 LBS", contenido: "Extintor nuevo, Soporte, Señalización", precioCon: "$70.000", precioSin: "$60.000" },
            { producto: "ABC DE 20 LBS", contenido: "Extintor nuevo, Soporte, Señalización", precioCon: "$90.000", precioSin: "$80.000" },
            { producto: "ABC DE 30 LBS", contenido: "Extintor nuevo, Soporte, Señalización", precioCon: "$110.000", precioSin: "$100.000" },
            { producto: "ABC DE 150 LBS", contenido: "Extintor nuevo, Soporte, Señalización", precioCon: "$1.350.000", precioSin: "N/A" },
            { producto: "AGUA A PRESION DE 2.5 GL", contenido: "Extintor nuevo, Manguera, Correa, Señalización, Soporte", precioCon: "$100.000", precioSin: "N/A" },
            { producto: "ACETATO DE POTASIO 1.5 GALONES", contenido: "Extintor nuevo, Manguera, Correa, Señalización, Soporte", precioCon: "$240.000", precioSin: "N/A" },
            { producto: "ACETATO DE POTASIO 3.5 GALONES", contenido: "Extintor nuevo, Manguera, Correa, Señalización, Soporte", precioCon: "$320.000", precioSin: "N/A" },
            { producto: "CO2 DE 5 LBS", contenido: "Extintor nuevo, Manguera, Señalización, Soporte", precioCon: "$220.000", precioSin: "N/A" },
            { producto: "CO2 DE 10 LBS", contenido: "Extintor nuevo, Manguera, Señalización, Soporte", precioCon: "$320.000", precioSin: "N/A" },
            { producto: "CO2 DE 15 LBS", contenido: "Extintor nuevo, Manguera, Señalización, Soporte", precioCon: "$370.000", precioSin: "N/A" },
            { producto: "CO2 DE 20 LBS", contenido: "Extintor nuevo, Manguera, Camatila, Señalización", precioCon: "$780.000", precioSin: "N/A" }
        ],
        datosPartesExtintor: [
            { parte: "VÁLVULA 5 lbs", precio: "$12.500" },
            { parte: "VÁLVULA 10 lbs", precio: "$17.500" },
            { parte: "VÁLVULA SATELITAL", precio: "$200.000" },
            { parte: "CILINDRO 5 lbs", precio: "$18.000" },
            { parte: "CILINDRO 10 lbs", precio: "$25.000" },
            { parte: "CILINDRO 20 lbs", precio: "$36.000" },
            { parte: "CILINDRO 30 lbs", precio: "$42.000" },
            { parte: "CILINDRO AGUA PRESION", precio: "$42.000" },
            { parte: "SOPORTE", precio: "$5.000" },
            { parte: "BASE DE 10 LBS CANASTILLA", precio: "$32.000" },
            { parte: "BASE DE 20 LBS CANASTILLA", precio: "$38.000" },
            { parte: "BASE", precio: "$20.000" },
            { parte: "MANÓMETRO", precio: "$5.000" },
            { parte: "MANGUERA", precio: "$10.000" },
            { parte: "CORREA", precio: "$10.000" }
        ],
        datosBotiquines: [
            { tipo: "Botiquín metálico semiindustrial", contenido: "Vacío", precio: "$60.000" },
            { tipo: "Botiquín metálico semiindustrial + productos", contenido: "Con todos los productos", precio: "$110.000" },
            { tipo: "Botiquín Tipo A", contenido: "Algodón, Agua oxigenada, Baja lenguas, Guantes de látex, Isodine, Micropore, Esparadrapo, Gasa estéril, Vendas elásticas (varias medidas), curitas, solución salina, alcohol antiséptico, jabón antiséptico, termómetro, tijeras, pinzas, linterna, libreta y lápiz, manual de primeros auxilios", precio: "$250.000" },
            { tipo: "Botiquín Tipo B", contenido: "Incluye todo lo del Tipo A más inmovilizadores de cuello, férulas, vendas triangulares, manta térmica, tensiómetro, fonendoscopio, cánulas orofaríngeas, resucitador manual, oxígeno portátil, glucómetro, kit de sutura básico, kit de quemaduras, torniquete, lápiz, tablilla espinal, linterna, botiquín tipo maleta rígida", precio: "$500.000" }
        ],
        datosMantenimientoExtintores: [
            { extintor: "ABC DE 5 LBS", precio: "$15.000" },
            { extintor: "ABC DE 10 LBS", precio: "$24.000" },
            { extintor: "ABC DE 20 LBS", precio: "$30.000" },
            { extintor: "ABC DE 30 LBS", precio: "$35.000" },
            { extintor: "ABC DE 150 LBS", precio: "$180.000" },
            { extintor: "AGUA A PRESION DE 2.5 GL", precio: "$30.000" },
            { extintor: "ACETATO DE POTASIO 1.5 GALONES", precio: "$45.000" },
            { extintor: "ACETATO DE POTASIO 3.5 GALONES", precio: "$60.000" },
            { extintor: "CO2 de 5 LBS", precio: "$35.000" },
            { extintor: "CO2 de 10 LBS", precio: "$45.000" },
            { extintor: "CO2 de 15 LBS", precio: "$55.000" },
            { extintor: "CO2 de 20 LBS", precio: "$65.000" }
        ],
        datosRecargaExtintores: [
            { extintor: "ABC DE 5 LBS", precio: "$15.000", observaciones: "" },
            { extintor: "ABC DE 10 LBS", precio: "$24.000", observaciones: "" },
            { extintor: "ABC DE 20 LBS", precio: "$30.000", observaciones: "" },
            { extintor: "ABC DE 30 LBS", precio: "$35.000", observaciones: "" },
            { extintor: "ABC DE 150 LBS", precio: "$180.000", observaciones: "" },
            { extintor: "AGUA A PRESION DE 2.5 GL", precio: "$30.000", observaciones: "" },
            { extintor: "ACETATO DE POTASIO 1.5 GALONES", precio: "N/A", observaciones: "Solo Mantenimiento" },
            { extintor: "ACETATO DE POTASIO 3.5 GALONES", precio: "N/A", observaciones: "Solo Mantenimiento" },
            { extintor: "CO2 de 5 LBS", precio: "$60.000 (12.000 x 5 lbs)", observaciones: "Precio por libra" },
            { extintor: "CO2 de 10 LBS", precio: "$120.000 (12.000 x 10 lbs)", observaciones: "Precio por libra" },
            { extintor: "CO2 de 15 LBS", precio: "$180.000 (12.000 x 15 lbs)", observaciones: "Precio por libra" },
            { extintor: "CO2 de 20 LBS", precio: "$240.000 (12.000 x 20 lbs)", observaciones: "Precio por libra" }
        ],
        datosOtrosProductos: [
            { producto: "Botiquín metálico semiindustrial", precio: "$60.000" },
            { producto: "Botiquín metálico semiindustrial + todos los productos", precio: "$110.000" },
            { producto: "Férula espinal no certificada", precio: "$220.000" },
            { producto: "Férula espinal certificada", precio: "$220.000" },
            { producto: "Punto ecológico de 60 litros", precio: "$320.000 (cada caneca sin base)" },
            { producto: "Kit de carretera pequeño", precio: "$45.000" },
            { producto: "Inmovilizador de cuello", precio: "$30.000" },
            { producto: "Inmovilizador de cabeza", precio: "$30.000" },
            { producto: "Cartel Peligro carga larga y ancha", precio: "$30.000" },
            { producto: "Conos 30 CM", precio: "$40.000" },
            { producto: "Conos 60 CM", precio: "$110.000" },
            { producto: "Señalizaciones (cualquier clase de emergencia)", precio: "$5.000" },
            { producto: "Kit de derrame de 6 galones", precio: "$140.000" },
            { producto: "Kit de derrame de 10 galones", precio: "$210.000" },
            { producto: "Kit de derrame de 55 galones", precio: "$240.000" }
        ],
        datosInspeccionSeguridad: {
            valor: "Cotizar",
            requisitos: [
                "Cédula del Representante Legal.",
                "RUT (Registro Único Tributario)",
                "Certificado de Cámara de Comercio (si la empresa o establecimiento lo posee).",
                "Medidas del lugar (área total en metros cuadrados del establecimiento)."
            ],
            aspectosVerificados: [
                "Extintores requeridos: Cantidad, tipo y ubicación adecuada según el riesgo y área del lugar.",
                "Salidas de emergencia bien señalizadas: Visibilidad y ubicación correcta de las señales.",
                "Señalización de riesgo eléctrico: Carteles visibles en zonas con instalaciones eléctricas.",
                "Señalización de botiquín: Indicadores visibles que permitan su rápida ubicación.",
                "Botiquín completo: Debidamente dotado con los insumos mínimos requeridos.",
                "Camilla de evacuación: En caso de que el tipo de actividad o normativa lo requiera.",
                "Cableado canalizado: Instalaciones eléctricas protegidas y organizadas para evitar riesgos.",
                "Personal capacitado en manejo de extintores: Evidencia de formación reciente o demostración práctica."
            ]
        },
        datosCapacitacion: {
            valor: "Cotizar",
            tipos: [
                {
                    nombre: "Primeros Auxilios",
                    tipo: "Charla",
                    duracion: "8 horas",
                    contenido: "Se enseña el manejo básico de primeros auxilios, con enfoque práctico y teórico.",
                    certificado: "Se entrega certificado de participación."
                },
                {
                    nombre: "Manejo de Extintores",
                    tipo: "Charla",
                    duracion: "8 horas",
                    contenido: "¿Qué es un extintor?, Funcionamiento de un extintor, Tipos de extintores y sus usos según el tipo de fuego.",
                    certificado: "Se entrega certificado de participación."
                },
                {
                    nombre: "Evacuación y Rescate",
                    tipo: "Capacitación",
                    duracion: "Variable (según la profundidad del módulo)",
                    contenido: "Métodos de evacuación ante distintos tipos de emergencia, Técnicas seguras de rescate, priorizando la seguridad de todas las personas involucradas.",
                    certificado: "Se entrega certificado de participación."
                }
            ],
            requisitosInscripcion: [
                "Cédula de ciudadanía.",
                "Nombre del curso o capacitación que desee realizar.",
                "Número de celular de contacto."
            ]
        },
        datosViajesAgua: {
            valor: "Cotizar",
            descripcion: "El transporte de agua potable que se realiza en la estación de bomberos puede ser dirigida a diferentes sectores del municipio, tanto como veredas, colegios, casas, empresas y hasta personas particulares.",
            capacidad: "El carro tanque tiene la capacidad de cargar un aproximado de 5000 litros (1200 galones) de agua potable.",
            nota: "Especificar que no se da el servicio de medio viaje de agua, el servicio siempre va a ser completo. Si la persona y/o la empresa solicita más agua, se le asigna otro viaje completo, cada uno con 5000 litros al punto indicado."
        }
    };

    // Transformar los datos del portafolio en una lista plana para el formulario de cotización
    const quotableItems = [
        // Inspecciones y Conceptos Técnicos
        { id: 'inspeccion-seguridad', name: 'Inspección y Conceptos Técnicos', description: 'Visitas técnicas para emitir conceptos de seguridad humana y contra incendios, esenciales para la obtención de licencias de funcionamiento y seguridad en edificaciones.', category: 'Inspecciones' },
        // Capacitación
        ...datosPortafolio.datosCapacitacion.tipos.map(item => ({
            id: `capacitacion-${item.nombre.toLowerCase().replace(/\s/g, '-')}`,
            name: `Capacitación: ${item.nombre}`,
            description: item.contenido,
            category: 'Capacitación'
        })),
        // Suministro de Agua
        { id: 'suministro-agua', name: 'Suministro de Agua a Presión', description: 'Transporte de agua potable con carrotanque (5000 litros) para diversas necesidades.', category: 'Servicios de Agua' },
        // Venta de Extintores
        ...datosPortafolio.datosVentaExtintores.map(item => ({
            id: `venta-ext-${item.producto.toLowerCase().replace(/\s/g, '-')}`,
            name: `Venta Extintor ${item.producto}`,
            description: `Extintor nuevo con ${item.contenido}. Precio con soporte/señalización: ${item.precioCon}`,
            category: 'Venta de Extintores'
        })),
        // Partes de Extintor
        ...datosPortafolio.datosPartesExtintor.map(item => ({
            id: `parte-ext-${item.parte.toLowerCase().replace(/\s/g, '-')}`,
            name: `Parte Extintor: ${item.parte}`,
            description: `Repuesto para extintor: ${item.parte}. Precio: ${item.precio}.`,
            category: 'Partes de Extintor'
        })),
        // Botiquines
        ...datosPortafolio.datosBotiquines.map(item => ({
            id: `botiquin-${item.tipo.toLowerCase().replace(/\s/g, '-')}`,
            name: `Botiquín: ${item.tipo}`,
            description: `Tipo de botiquín: ${item.tipo}. Contenido: ${item.contenido}. Precio: ${item.precio}.`,
            category: 'Botiquines'
        })),
        // Mantenimiento de Extintores
        ...datosPortafolio.datosMantenimientoExtintores.map(item => ({
            id: `mant-ext-${item.extintor.toLowerCase().replace(/\s/g, '-')}`,
            name: `Mantenimiento Extintor: ${item.extintor}`,
            description: `Mantenimiento para extintor ${item.extintor}. Precio: ${item.precio}.`,
            category: 'Mantenimiento de Extintores'
        })),
        // Recarga de Extintores
        ...datosPortafolio.datosRecargaExtintores.map(item => ({
            id: `recarga-ext-${item.extintor.toLowerCase().replace(/\s/g, '-')}`,
            name: `Recarga Extintor: ${item.extintor}`,
            description: `Recarga para extintor ${item.extintor}. Precio: ${item.precio}. ${item.observaciones ? `(${item.observaciones})` : ''}`,
            category: 'Recarga de Extintores'
        })),
        // Otros Productos
        ...datosPortafolio.datosOtrosProductos.map(item => ({
            id: `otro-prod-${item.producto.toLowerCase().replace(/\s/g, '-')}`,
            name: `Otro Producto: ${item.producto}`,
            description: `Producto: ${item.producto}. Precio: ${item.precio}.`,
            category: 'Otros Productos'
        }))
    ];

    // Para agrupar los items por categoría y mostrarlos ordenados
    const categorizedItems = quotableItems.reduce((acc, item) => {
        const category = item.category || 'General';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});

    const [selectedServices, setSelectedServices] = useState([]);
    const [formStatus, setFormStatus] = useState({ succeeded: false, submitting: false, errors: [] });
    
    // URL de Formspree a configurar - ¡TU URL DIRECTA!
    const FORMSPREE_FORM_URL = "https://formspree.io/f/xeokewdj"; 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormStatus({ ...formStatus, submitting: true });

        const formData = new FormData(event.target);
        // Agrega los servicios seleccionados al FormData
        formData.append('Servicios_Solicitados', selectedServices.map(id => quotableItems.find(s => s.id === id)?.name || id).join(', '));
        
        try {
            const response = await fetch(FORMSPREE_FORM_URL, {
                method: 'POST',
                body: formData, // Usar FormData directamente para Formspree sin JSON.stringify
                headers: {
                    'Accept': 'application/json'
                },
            });

            if (response.ok) {
                setFormStatus({ succeeded: true, submitting: false, errors: [] });
                // Limpiar el formulario y los servicios seleccionados después de un envío exitoso
                event.target.reset();
                setSelectedServices([]);
            } else {
                const responseData = await response.json();
                setFormStatus({ succeeded: false, submitting: false, errors: responseData.errors?.map(err => err.message) || ["Error al enviar el formulario."] });
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setFormStatus({ succeeded: false, submitting: false, errors: ["Hubo un problema de red o servidor."] });
        }
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedServices(prev => [...prev, value]);
        } else {
            setSelectedServices(prev => prev.filter(serviceId => serviceId !== value));
        }
    };

    // Genera el texto del mensaje con los servicios seleccionados
    const messageText = selectedServices.length > 0
        ? `Servicios/Productos seleccionados:\n- ${selectedServices.map(id => quotableItems.find(s => s.id === id)?.name || id).join('\n- ')}.\n\nPor favor, proporciona detalles adicionales sobre tu solicitud:`
        : "Por favor, selecciona los servicios/productos que te interesan y proporciona detalles adicionales.";

    if (formStatus.succeeded) {
        return (
            <div className="cotizar-success-container">
                <div className="cotizar-success-box">
                    <h2>¡Gracias por tu solicitud!</h2>
                    <p>Hemos recibido tu cotización y nos pondremos en contacto contigo a la brevedad posible.</p>
                    {/* Al hacer clic en el botón de inicio, simplemente recarga la página para volver al formulario */}
                    <button className="inicio-button" onClick={() => window.location.reload()}>Volver a Cotizar</button>
                </div>
            </div>
        );
    }

    return (
        <div className="cotizar-container">
            {/* Inyecta los estilos CSS aquí */}
            <style>{cotizarStyles}</style>

            {/* Header */}
            <header className="cotizar-header">
                <div className="cotizar-content-wrapper">
                    <h1>Solicita tu Cotización</h1>
                    <p>
                        Selecciona los servicios o productos de nuestro portafolio que te interesan y te enviaremos una propuesta personalizada.
                    </p>
                </div>
            </header>

            <main className="cotizar-content-wrapper">
                <section className="cotizar-section">
                    <h2>Servicios y Productos</h2>

                    <div className="cotizar-grid">
                        {/* Columna de Selección de Servicios */}
                        <div className="services-selection">
                            <h3>Selecciona los ítems a cotizar:</h3>
                            {Object.keys(categorizedItems).map(category => (
                                <div key={category} className="category-group">
                                    <h4>{category}</h4>
                                    <div className="category-items-grid">
                                        {categorizedItems[category].map(service => (
                                            <label key={service.id} className="service-item-checkbox">
                                                <input
                                                    type="checkbox"
                                                    value={service.id}
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedServices.includes(service.id)}
                                                    // No se necesita 'name' para Formspree aquí, ya que se agrega manualmente al FormData
                                                />
                                                <div className="service-details">
                                                    <h5>{service.name}</h5>
                                                    <p>{service.description}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Columna del Formulario de Datos */}
                        <div className="cotizacion-form-wrapper">
                            <h3>Completa tus Datos</h3>
                            <form onSubmit={handleSubmit} className="cotizacion-form">
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
                                        rows="6"
                                        placeholder="Ej: Necesitamos 2 extintores ABC de 20 lbs para nuestra oficina y una capacitación de primeros auxilios para 15 personas."
                                        value={messageText}
                                        readOnly // Mantener de solo lectura para los servicios seleccionados
                                    ></textarea>
                                </div>

                                {formStatus.errors.length > 0 && (
                                    <div className="form-status error">
                                        {formStatus.errors.map((error, index) => (
                                            <p key={index}>{error}</p>
                                        ))}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={formStatus.submitting}
                                    className="submit-button"
                                >
                                    {formStatus.submitting ? 'Enviando...' : 'Solicitar Cotización'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                <section className="direct-contact-info">
                    <h3>¿Necesitas una Cotización Formal o Inmediata?</h3>
                    <p>Si prefieres una atención personalizada o requieres una cotización formal con urgencia, no dudes en contactarnos directamente:</p>
                    <div className="contact-details">
                        <div className="contact-item">
                            <Phone size={36} className="contact-icon" />
                            <p>Teléfono</p>
                            <a href="tel:+573001751212">+57 300 175 1212</a>
                        </div>
                        <div className="contact-item">
                            <Mail size={36} className="contact-icon" />
                            <p>Correo Electrónico</p>
                            <a href="mailto:cuerpobomberossanalberto@gmail.com">cuerpobomberossanalberto@gmail.com</a>
                        </div>
                        <div className="contact-item">
                            <MessageSquareText size={36} className="contact-icon" />
                            <p>WhatsApp</p>
                            <a href="https://wa.me/573001751212" target="_blank" rel="noopener noreferrer">Enviar Mensaje</a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Cotizar;
