import React, { useState, useEffect, useRef, useMemo } from 'react'; // Importa useMemo
import './Portafolio.css'; // Asegúrate de que tus estilos CSS están importados

// Importa los íconos de lucide-react
import { Building, Award, FireExtinguisher, Droplet, Shield, FlaskConical, Plus, BookOpen } from 'lucide-react';


const Portafolio = () => {
    // Estado para controlar la visibilidad de los detalles de cada servicio
    const [visibleSection, setVisibleSection] = useState(null);

    // Referencias para cada sección de detalle, permitiendo el scroll suave
    const extintoresVentaRef = useRef(null);
    const partesExtintorRef = useRef(null);
    const botiquinesRef = useRef(null);
    const mantenimientoExtintoresRef = useRef(null);
    const recargaExtintoresRef = useRef(null);
    const otrosProductosRef = useRef(null);
    const inspeccionSeguridadRef = useRef(null);
    const capacitacionRef = useRef(null);
    const viajesAguaRef = useRef(null);

    // Mapeo de nombres de sección a sus referencias, ahora con useMemo
    // Esto asegura que 'sectionRefs' no cambie en cada render, satisfaciendo el linter.
    const sectionRefs = useMemo(() => ({
        extintoresVenta: extintoresVentaRef,
        partesExtintor: partesExtintorRef,
        botiquines: botiquinesRef,
        mantenimientoExtintores: mantenimientoExtintoresRef,
        recargaExtintores: recargaExtintoresRef,
        otrosProductos: otrosProductosRef,
        inspeccionSeguridad: inspeccionSeguridadRef,
        capacitacion: capacitacionRef,
        viajesAgua: viajesAguaRef,
    }), []); // Dependencias vacías porque las refs son estables

    // Función para alternar la visibilidad de una sección
    const toggleSection = (sectionName) => {
        setVisibleSection(visibleSection === sectionName ? null : sectionName);
    };

    // useEffect para hacer scroll cuando una sección de detalle se hace visible
    useEffect(() => {
        if (visibleSection) {
            const currentRef = sectionRefs[visibleSection];
            if (currentRef && currentRef.current) {
                currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [visibleSection, sectionRefs]); // 'sectionRefs' ya no causará el warning

    // Función para manejar el clic en el botón "Cotizar" (redirige directamente)
    const handleCotizarClick = () => {
        window.location.href = '/cotizar'; // Redirige a la página de cotización
        console.log('Navegando a la página de cotización...');
    };

    // --- Datos detallados del portafolio ---
    const datosVentaExtintores = [
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
    ];

    const datosPartesExtintor = [
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
    ];

    const datosBotiquines = [
        { tipo: "Botiquín metálico semiindustrial", contenido: "Vacío", precio: "$60.000" },
        { tipo: "Botiquín metálico semiindustrial + productos", contenido: "Con todos los productos", precio: "$110.000" },
        { tipo: "Botiquín Tipo A", contenido: "Algodón, Agua oxigenada, Baja lenguas, Guantes de látex, Isodine, Micropore, Esparadrapo, Gasa estéril, Vendas elásticas (varias medidas), curitas, solución salina, alcohol antiséptico, jabón antiséptico, termómetro, tijeras, pinzas, linterna, libreta y lápiz, manual de primeros auxilios", precio: "$250.000" },
        { tipo: "Botiquín Tipo B", contenido: "Incluye todo lo del Tipo A más inmovilizadores de cuello, férulas, vendas triangulares, manta térmica, tensiómetro, fonendoscopio, cánulas orofaríngeas, resucitador manual, oxígeno portátil, glucómetro, kit de sutura básico, kit de quemaduras, torniquete, lápiz, tablilla espinal, linterna, botiquín tipo maleta rígida", precio: "$500.000" }
    ];

    const datosMantenimientoExtintores = [
        { extintor: "ACETATO DE POTASIO 1.5 GALONES", precio: "$45.000" },
        { extintor: "ACETATO DE POTASIO 3.5 GALONES", precio: "$60.000" },
        { extintor: "CO2 de 5 LBS", precio: "$35.000" },
        { extintor: "CO2 de 10 LBS", precio: "$45.000" },
        { extintor: "CO2 de 15 LBS", precio: "$55.000" },
        { extintor: "CO2 de 20 LBS", precio: "$65.000" }
    ];

    const datosRecargaExtintores = [
        { extintor: "ABC DE 5 LBS", precio: "$15.000", observaciones: "" },
        { extintor: "ABC DE 10 LBS", precio: "$24.000", observaciones: "" },
        { extintor: "ABC DE 20 LBS", precio: "$30.000", observaciones: "" },
        { extintor: "ABC DE 30 LBS", precio: "$35.000", observaciones: "" },
        { extintor: "ABC DE 150 LBS", precio: "$180.000", observaciones: "" },
        { extintor: "AGUA A PRESION DE 2.5 GL", precio: "$30.000", observaciones: "" },
        { extintor: "CO2 de 5 LBS", precio: "$60.000 (12.000 x 5 lbs)", observaciones: "Precio por libra" },
        { extintor: "CO2 de 10 LBS", precio: "$120.000 (12.000 x 10 lbs)", observaciones: "Precio por libra" },
        { extintor: "CO2 de 15 LBS", precio: "$180.000 (12.000 x 15 lbs)", observaciones: "Precio por libra" },
        { extintor: "CO2 de 20 LBS", precio: "$240.000 (12.000 x 20 lbs)", observaciones: "Precio por libra" }
    ];

    const datosOtrosProductos = [
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
    ];

    const datosInspeccionSeguridad = {
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
    };

    const datosCapacitacion = {
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
    };

    const datosViajesAgua = {
        valor: "Cotizar",
        descripcion: "El transporte de agua potable que se realiza en la estación de bomberos puede ser dirigida a diferentes sectores del municipio, tanto como veredas, colegios, casas, empresas y hasta personas particulares.",
        capacidad: "El carro tanque tiene la capacidad de cargar un aproximado de 5000 litros (1200 galones) de agua potable.",
        nota: "Se especifica que no se da el servicio de medio viaje de agua, el servicio siempre va a ser completo. Si la persona y/o la empresa solicita más agua, se le asigna otro viaje completo, cada uno con 5000 litros al punto indicado."
    };


    return (
        <div className="portafolio-container">
            <header className="portafolio-header">
                <div className="portafolio-content-wrapper">
                    <h1>Nuestro Portafolio de Actividades</h1>
                    <p>Conoce la amplia gama de servicios que el Cuerpo de Bomberos Voluntarios de San Alberto, Cesar, ofrece para proteger a la comunidad.</p>
                </div>
            </header>

            <main className="portafolio-content-wrapper">
                <section className="portafolio-section">
                    <h2>Presentación</h2>
                    <p>
                        El Cuerpo de Bomberos Voluntarios de San Alberto, Cesar, es una organización sin ánimo de lucro, dedicada a la gestión integral del riesgo contra incendios, la preparación y respuesta ante emergencias, y la educación comunitaria en prevención. Con más de {new Date().getFullYear() - 2009} años de servicio, nuestro compromiso es salvaguardar la vida, la propiedad y el medio ambiente de nuestra región.
                    </p>
                    <p>
                        Este portafolio detalla las actividades y servicios que ponemos a disposición de empresas, instituciones y la comunidad en general, contribuyendo a la seguridad y bienestar de todos.
                    </p>
                </section>

                <section className="portafolio-section">
                    <h2>Nuestros Servicios Ofrecidos</h2>
                    <div className="service-cards-grid">
                        {/* Tarjeta para Venta de Extintores */}
                        <div className="service-card" onClick={() => toggleSection('extintoresVenta')}>
                            <FireExtinguisher size={48} />
                            <h3>Venta de Extintores</h3>
                            <p>Extintores nuevos con o sin soporte y señalización.</p>
                        </div>

                        {/* Tarjeta para Partes de Extintor */}
                        <div className="service-card" onClick={() => toggleSection('partesExtintor')}>
                            <FlaskConical size={48} />
                            <h3>Partes de Extintor</h3>
                            <p>Repuestos y accesorios para el mantenimiento de tus extintores.</p>
                        </div>

                        {/* Tarjeta para Botiquines */}
                        <div className="service-card" onClick={() => toggleSection('botiquines')}>
                            <Plus size={48} /> {/* Ícono de cruz para botiquines */}
                            <h3>Botiquines</h3>
                            <p>Botiquines completos y semiindustriales para tu seguridad.</p>
                        </div>

                        {/* Tarjeta para Mantenimiento de Extintores */}
                        <div className="service-card" onClick={() => toggleSection('mantenimientoExtintores')}>
                            <Shield size={48} />
                            <h3>Mantenimiento de Extintores</h3>
                            <p>Servicio para asegurar el óptimo funcionamiento de tus equipos.</p>
                        </div>

                        {/* Tarjeta para Recarga de Extintores */}
                        <div className="service-card" onClick={() => toggleSection('recargaExtintores')}>
                            <FireExtinguisher size={48} /> {/* Reutilizando el icono de extintor */}
                            <h3>Recarga de Extintores</h3>
                            <p>Restauración de la capacidad de agentes extintores.</p>
                        </div>

                        {/* Tarjeta para Otros Productos */}
                        <div className="service-card" onClick={() => toggleSection('otrosProductos')}>
                            <BookOpen size={48} />
                            <h3>Otros Productos</h3>
                            <p>Elementos adicionales de seguridad y prevención.</p>
                        </div>

                        {/* Tarjeta para Inspección de Seguridad */}
                        <div className="service-card" onClick={() => toggleSection('inspeccionSeguridad')}>
                            <Building size={48} />
                            <h3>Inspección de Seguridad</h3>
                            <p>Conceptos técnicos esenciales para licencias y seguridad.</p>
                        </div>

                        {/* Tarjeta para Capacitación */}
                        <div className="service-card" onClick={() => toggleSection('capacitacion')}>
                            <Award size={48} />
                            <h3>Capacitación</h3>
                            <p>Cursos y talleres en prevención y atención de emergencias.</p>
                        </div>

                        {/* Tarjeta para Viajes de Agua */}
                        <div className="service-card" onClick={() => toggleSection('viajesAgua')}>
                            <Droplet size={48} />
                            <h3>Suministro de Agua</h3>
                            <p>Transporte de agua potable para diversas necesidades.</p>
                        </div>

                    </div>

                    {/* --- Secciones de Detalles Desplegables (ahora con refs) --- */}

                    {visibleSection === 'extintoresVenta' && (
                        <div className="service-detail-section" ref={extintoresVentaRef}>
                            <h4>Venta de Extintores</h4>
                            <table className="detail-table">
                                <thead>
                                    <tr>
                                        <th>Producto / Elemento</th>
                                        <th>Contenido</th>
                                        <th>Precio (Con Soporte y Señalización)</th>
                                        <th>Precio (Sin Soporte ni Señalización)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosVentaExtintores.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.producto}</td>
                                            <td>{item.contenido}</td>
                                            <td>{item.precioCon}</td>
                                            <td>{item.precioSin}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {visibleSection === 'partesExtintor' && (
                        <div className="service-detail-section" ref={partesExtintorRef}>
                            <h4>Partes de Extintor</h4>
                            <table className="detail-table">
                                <thead>
                                    <tr>
                                        <th>Parte de Extintor</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosPartesExtintor.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.parte}</td>
                                            <td>{item.precio}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {visibleSection === 'botiquines' && (
                        <div className="service-detail-section" ref={botiquinesRef}>
                            <h4>Botiquines</h4>
                            <table className="detail-table">
                                <thead>
                                    <tr>
                                        <th>Tipo de Botiquín</th>
                                        <th>Contenido (Productos)</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosBotiquines.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.tipo}</td>
                                            <td>{item.contenido}</td>
                                            <td>{item.precio}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="note">**Nota:** El contenido de los botiquines Tipo A y B solicita cotizacion para conocer su contenido.</p>
                        </div>
                    )}

                    {visibleSection === 'mantenimientoExtintores' && (
                        <div className="service-detail-section" ref={mantenimientoExtintoresRef}>
                            <h4>Mantenimiento de Extintores</h4>
                            <table className="detail-table">
                                <thead>
                                    <tr>
                                        <th>Extintor</th>
                                        <th>Precio de Mantenimiento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosMantenimientoExtintores.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.extintor}</td>
                                            <td>{item.precio}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {visibleSection === 'recargaExtintores' && (
                        <div className="service-detail-section" ref={recargaExtintoresRef}>
                            <h4>Recarga de Extintores</h4>
                            <table className="detail-table">
                                <thead>
                                    <tr>
                                        <th>Extintor</th>
                                        <th>Precio de Recarga</th>
                                        <th>Observaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosRecargaExtintores.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.extintor}</td>
                                            <td>{item.precio}</td>
                                            <td>{item.observaciones}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {visibleSection === 'otrosProductos' && (
                        <div className="service-detail-section" ref={otrosProductosRef}>
                            <h4>Otros Productos</h4>
                            <table className="detail-table">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosOtrosProductos.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.producto}</td>
                                            <td>{item.precio}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="note">
                                **Kits de Derrame (Contenido):**
                                <br />
                                <strong>Kit de derrame de 6 galones:</strong> 2 almohadillas absorbentes (25cm x 25cm), 1 barrera absorbente (7.62cm x 1.20m), 1 diagrama de material absorbente biodegradable, 5 paños universales de 40cm x 50cm x 2mm, 1 par de guantes de nitrilo, 1 monogafa, 1 tapabocas clásico, 3 bolsas rojas-tipo industrial, 1 instructivo para derrames, 1 maletín de tela.
                                <br />
                                <strong>Kit de derrame de 10 galones:</strong> 1 caneca plástica, 1 absorbente granulado multipropósito biodegradable por 1 kg, 10 paños oleofílicos de 15 x 18, 2 barreras hidrofóbicas de 1.20mt de longitud, 1 desengrasante biodegradable por litro, 1 cepillo de mano, 2 estacas de madera, 1 martillo de caucho, 1 masilla epódica de 50gr, 1 linterna dinamo, 4 bolsas plásticas rojas de 70cm x 100cm, 4 amarres plásticos, 1 cinta de señalización "Peligro no pase" x 100mt, 1 guantes de nitrilo de 13", 1 chaleco reflectivo, 1 respirador con cartuchos, 1 gafas de seguridad, 1 pala plástica desarmable, 1 hoja con el instructivo de uso.
                                <br />
                                <strong>Kit de derrame de 55 galones:</strong>
                                    **Absorbentes:** 4 almohadillas absorbentes (25cm x 25cm), 6 barreras absorbentes (3 pulgadas x 1.20m), 3 barreras absorbentes (5 pulgadas x 3m), 5 kg de material absorbente biodegradable CLEAN SORB®100, 50 paños absorbentes (40cm x 50cm).
                                    **Elementos de Protección Personal:** 2 respirador doble cartucho para vapores orgánicos económico, 2 par de guantes de nitrilo, 1 chaleco reflectivo.
                                    **Elementos Industriales para Almacenamiento y Taponamiento:** 15 bolsas rojas-tipo industrial, 10 longas de polipropileno, 1 martillo de madera con punta de goma, 1 masilla epódica de 100 gramos, 1 paquete de calajanes de madera, 1 cinta de seguridad x 50 metros, 1 pala antichispa, 1 galón de desengrasante biodegradable SIMPLE GREEN, 1 linterna anti chispa recargable, 1 instructivo para derrames, 1 caneca plástica de 55 gal marcada (kit para control de derrames).
                            </p>
                        </div>
                    )}

                    {visibleSection === 'inspeccionSeguridad' && (
                        <div className="service-detail-section" ref={inspeccionSeguridadRef}>
                            <h4>Inspección de Seguridad</h4>
                            <p><strong>Valor:</strong> {datosInspeccionSeguridad.valor}</p>
                            <h5>Requisitos para Conocer el Precio de la Inspección:</h5>
                            <ul>
                                {datosInspeccionSeguridad.requisitos.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                            <h5>Aspectos Verificados Durante la Inspección:</h5>
                            <ul>
                                {datosInspeccionSeguridad.aspectosVerificados.map((asp, index) => (
                                    <li key={index}>{asp}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {visibleSection === 'capacitacion' && (
                        <div className="service-detail-section" ref={capacitacionRef}>
                            <h4>Capacitación</h4>
                            <p><strong>Valor:</strong> {datosCapacitacion.valor}</p>
                            <h5>Tipos de Capacitaciones Disponibles:</h5>
                            {datosCapacitacion.tipos.map((tipo, index) => (
                                <div key={index} className="capacitacion-item">
                                    <h6>{tipo.nombre} ({tipo.tipo})</h6>
                                    <p><strong>Duración:</strong> {tipo.duracion}</p>
                                    <p><strong>Contenido:</strong> {tipo.contenido}</p>
                                    <p><strong>Certificado:</strong> {tipo.certificado}</p>
                                </div>
                            ))}
                            <h5>Requisitos para Inscribirse en una Capacitación:</h5>
                            <ul>
                                {datosCapacitacion.requisitosInscripcion.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {visibleSection === 'viajesAgua' && (
                        <div className="service-detail-section" ref={viajesAguaRef}>
                            <h4>Suministro de Agua</h4>
                            <p><strong>Valor:</strong> {datosViajesAgua.valor}</p>
                            <h5>Descripción del Viaje:</h5>
                            <p>{datosViajesAgua.descripcion}</p>
                            <p><strong>Capacidad del Carro Tanque:</strong> {datosViajesAgua.capacidad}</p>
                            <p className="note"><strong>Nota:</strong> {datosViajesAgua.nota}</p>
                        </div>
                    )}

                </section>

                {/* Botón para Cotizar al final de la página */}
                <div className="cotizar-button-container">
                    <button className="cotizar-button" onClick={handleCotizarClick}>
                        ¡Cotiza Nuestros Servicios!
                    </button>
                </div>
            </main>
        </div>
    );
};

// Componente Cotizar (puedes expandirlo más adelante)
const Cotizar = () => {
    return (
        <div className="cotizar-page-container">
            <h1 className="cotizar-page-title">Página de Cotización</h1>
            <p className="cotizar-page-description">
                Por favor, contáctanos para una cotización personalizada de nuestros servicios.
                Puedes enviar un correo a [tu correo] o llamarnos al [tu teléfono].
            </p>
            {/* Aquí puedes añadir un formulario de contacto, información de contacto, etc. */}
        </div>
    );
};

// Estilos CSS para el componente Cotizar (puedes añadir esto a tu Portafolio.css o a un nuevo Cotizar.css)
// Si lo añades a Portafolio.css, asegúrate de que App.js lo importa.
const CotizarCSS = `
.cotizar-page-container {
    font-family: 'Inter', sans-serif;
    max-width: 800px;
    margin: 50px auto;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.cotizar-page-title {
    font-size: 2.8em;
    color: #0056b3;
    margin-bottom: 20px;
}

.cotizar-page-description {
    font-size: 1.1em;
    color: #555;
    line-height: 1.8;
}
`;


// Componente principal de la aplicación
const App = () => {
    // Un sistema de enrutamiento simple basado en window.location.pathname
    let ComponentToRender;
    const path = window.location.pathname;

    switch (path) {
        case '/cotizar':
            ComponentToRender = Cotizar;
            break;
        case '/':
        default:
            ComponentToRender = Portafolio;
            break;
    }

    return (
        <>
            <style>{CotizarCSS}</style> {/* Incluye los estilos de Cotizar aquí */}
            <ComponentToRender />
        </>
    );
};

export default App; // Exporta el componente principal 'App'

