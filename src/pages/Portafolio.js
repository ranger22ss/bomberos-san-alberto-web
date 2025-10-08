import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Portafolio.css';
import { Link } from 'react-router-dom';
import {
    Building,
    Award,
    FireExtinguisher,
    Droplet,
    Shield,
    FlaskConical,
    Plus,
    BookOpen,
    ChevronDown,
    LineChart
} from 'lucide-react';
import QuoteForm from '../components/QuoteForm';

const Portafolio = () => {
    const [visibleSection, setVisibleSection] = useState('extintoresVenta');

    const extintoresVentaRef = useRef(null);
    const partesExtintorRef = useRef(null);
    const botiquinesRef = useRef(null);
    const mantenimientoExtintoresRef = useRef(null);
    const recargaExtintoresRef = useRef(null);
    const otrosProductosRef = useRef(null);
    const inspeccionSeguridadRef = useRef(null);
    const capacitacionRef = useRef(null);
    const viajesAguaRef = useRef(null);

    const sectionRefs = useMemo(() => ({
        extintoresVenta: extintoresVentaRef,
        partesExtintor: partesExtintorRef,
        botiquines: botiquinesRef,
        mantenimientoExtintores: mantenimientoExtintoresRef,
        recargaExtintores: recargaExtintoresRef,
        otrosProductos: otrosProductosRef,
        inspeccionSeguridad: inspeccionSeguridadRef,
        capacitacion: capacitacionRef,
        viajesAgua: viajesAguaRef
    }), []);

    useEffect(() => {
        if (visibleSection) {
            const currentRef = sectionRefs[visibleSection];
            if (currentRef && currentRef.current) {
                currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [visibleSection, sectionRefs]);

    const toggleSection = (sectionName) => {
        setVisibleSection((prev) => (prev === sectionName ? null : sectionName));
    };

    const serviceCards = [
        {
            id: 'extintoresVenta',
            icon: <FireExtinguisher size={40} aria-hidden="true" />,
            title: 'Venta de Extintores',
            description: 'Dotación de extintores certificados con soporte y señalización para cada riesgo.'
        },
        {
            id: 'partesExtintor',
            icon: <FlaskConical size={40} aria-hidden="true" />,
            title: 'Partes de Extintor',
            description: 'Repuestos y accesorios originales para garantizar la operatividad de tu equipo.'
        },
        {
            id: 'botiquines',
            icon: <Plus size={40} aria-hidden="true" />,
            title: 'Botiquines certificados',
            description: 'Botiquines empresariales y comunitarios con dotación completa o personalizada.'
        },
        {
            id: 'mantenimientoExtintores',
            icon: <Shield size={40} aria-hidden="true" />,
            title: 'Mantenimiento de Extintores',
            description: 'Servicio preventivo y correctivo con registro de control y trazabilidad.'
        },
        {
            id: 'recargaExtintores',
            icon: <FireExtinguisher size={40} aria-hidden="true" />,
            title: 'Recarga de Extintores',
            description: 'Restauración de la capacidad de agentes extintores cumpliendo normativas vigentes.'
        },
        {
            id: 'otrosProductos',
            icon: <BookOpen size={40} aria-hidden="true" />,
            title: 'Equipos complementarios',
            description: 'Kits de carretera, señalización y elementos de apoyo para planes de emergencia.'
        },
        {
            id: 'inspeccionSeguridad',
            icon: <Building size={40} aria-hidden="true" />,
            title: 'Inspecciones y conceptos',
            description: 'Diagnóstico integral para licencias de funcionamiento y cumplimiento legal.'
        },
        {
            id: 'capacitacion',
            icon: <Award size={40} aria-hidden="true" />,
            title: 'Capacitaciones especializadas',
            description: 'Programas formativos presenciales y prácticos para equipos de trabajo.'
        },
        {
            id: 'viajesAgua',
            icon: <Droplet size={40} aria-hidden="true" />,
            title: 'Suministro de agua potable',
            description: 'Entrega mediante carrotanque con capacidad de 5.000 litros por viaje.'
        }
    ];

    const impactMetrics = [
        { value: '+15', label: 'Años fortaleciendo la gestión del riesgo' },
        { value: '24/7', label: 'Atención operativa y logística' },
        { value: '+120', label: 'Empresas y aliados atendidos' },
        { value: '100%', label: 'Servicios documentados con soportes' }
    ];

    const datosVentaExtintores = [
        { producto: 'ABC DE 10 LBS', contenido: 'Extintor nuevo, Soporte, Señalización', precioCon: '$70.000', precioSin: '$60.000' },
        { producto: 'ABC DE 20 LBS', contenido: 'Extintor nuevo, Soporte, Señalización', precioCon: '$90.000', precioSin: '$80.000' },
        { producto: 'ABC DE 30 LBS', contenido: 'Extintor nuevo, Soporte, Señalización', precioCon: '$110.000', precioSin: '$100.000' },
        { producto: 'ABC DE 150 LBS', contenido: 'Extintor nuevo, Soporte, Señalización', precioCon: '$1.350.000', precioSin: 'N/A' },
        { producto: 'AGUA A PRESION DE 2.5 GL', contenido: 'Extintor nuevo, Manguera, Correa, Señalización, Soporte', precioCon: '$100.000', precioSin: 'N/A' },
        { producto: 'ACETATO DE POTASIO 1.5 GALONES', contenido: 'Extintor nuevo, Manguera, Correa, Señalización, Soporte', precioCon: '$240.000', precioSin: 'N/A' },
        { producto: 'ACETATO DE POTASIO 3.5 GALONES', contenido: 'Extintor nuevo, Manguera, Correa, Señalización, Soporte', precioCon: '$320.000', precioSin: 'N/A' },
        { producto: 'CO2 DE 5 LBS', contenido: 'Extintor nuevo, Manguera, Señalización, Soporte', precioCon: '$220.000', precioSin: 'N/A' },
        { producto: 'CO2 DE 10 LBS', contenido: 'Extintor nuevo, Manguera, Señalización, Soporte', precioCon: '$320.000', precioSin: 'N/A' },
        { producto: 'CO2 DE 15 LBS', contenido: 'Extintor nuevo, Manguera, Señalización, Soporte', precioCon: '$370.000', precioSin: 'N/A' },
        { producto: 'CO2 DE 20 LBS', contenido: 'Extintor nuevo, Manguera, Camatila, Señalización', precioCon: '$780.000', precioSin: 'N/A' }
    ];

    const datosPartesExtintor = [
        { parte: 'VÁLVULA 5 lbs', precio: '$12.500' },
        { parte: 'VÁLVULA 10 lbs', precio: '$17.500' },
        { parte: 'VÁLVULA SATELITAL', precio: '$200.000' },
        { parte: 'CILINDRO 5 lbs', precio: '$18.000' },
        { parte: 'CILINDRO 10 lbs', precio: '$25.000' },
        { parte: 'CILINDRO 20 lbs', precio: '$36.000' },
        { parte: 'CILINDRO 30 lbs', precio: '$42.000' },
        { parte: 'CILINDRO AGUA PRESION', precio: '$42.000' },
        { parte: 'SOPORTE', precio: '$5.000' },
        { parte: 'BASE DE 10 LBS CANASTILLA', precio: '$32.000' },
        { parte: 'BASE DE 20 LBS CANASTILLA', precio: '$38.000' },
        { parte: 'BASE', precio: '$20.000' },
        { parte: 'MANÓMETRO', precio: '$5.000' },
        { parte: 'MANGUERA', precio: '$10.000' },
        { parte: 'CORREA', precio: '$10.000' }
    ];

    const datosBotiquines = [
        { tipo: 'Botiquín metálico semiindustrial', contenido: 'Vacío', precio: '$60.000' },
        { tipo: 'Botiquín metálico semiindustrial + productos', contenido: 'Con todos los productos', precio: '$110.000' },
        { tipo: 'Botiquín Tipo A', contenido: 'Algodón, Agua oxigenada, Baja lenguas, Guantes de látex, Isodine, Micropore, Esparadrapo, Gasa estéril, Vendas elásticas, Curitas, Solución salina, Alcohol, Jabón antiséptico, Termómetro, Tijeras, Pinzas, Linterna, Manual de primeros auxilios', precio: '$250.000' },
        { tipo: 'Botiquín Tipo B', contenido: 'Incluye todo lo del Tipo A más inmovilizadores, férulas, manta térmica, tensiómetro, fonendoscopio, cánulas, resucitador manual, oxígeno portátil, glucómetro, kit de sutura y de quemaduras, torniquete, tablilla espinal, maleta rígida', precio: '$500.000' }
    ];

    const datosMantenimientoExtintores = [
        { extintor: 'ACETATO DE POTASIO 1.5 GALONES', precio: '$45.000' },
        { extintor: 'ACETATO DE POTASIO 3.5 GALONES', precio: '$60.000' },
        { extintor: 'CO2 de 5 LBS', precio: '$35.000' },
        { extintor: 'CO2 de 10 LBS', precio: '$45.000' },
        { extintor: 'CO2 de 15 LBS', precio: '$55.000' },
        { extintor: 'CO2 de 20 LBS', precio: '$65.000' }
    ];

    const datosRecargaExtintores = [
        { extintor: 'ABC DE 5 LBS', precio: '$15.000', observaciones: '' },
        { extintor: 'ABC DE 10 LBS', precio: '$24.000', observaciones: '' },
        { extintor: 'ABC DE 20 LBS', precio: '$30.000', observaciones: '' },
        { extintor: 'ABC DE 30 LBS', precio: '$35.000', observaciones: '' },
        { extintor: 'ABC DE 150 LBS', precio: '$180.000', observaciones: '' },
        { extintor: 'AGUA A PRESION DE 2.5 GL', precio: '$30.000', observaciones: '' },
        { extintor: 'CO2 de 5 LBS', precio: '$60.000 (12.000 x 5 lbs)', observaciones: 'Precio por libra' },
        { extintor: 'CO2 de 10 LBS', precio: '$120.000 (12.000 x 10 lbs)', observaciones: 'Precio por libra' },
        { extintor: 'CO2 de 15 LBS', precio: '$180.000 (12.000 x 15 lbs)', observaciones: 'Precio por libra' },
        { extintor: 'CO2 de 20 LBS', precio: '$240.000 (12.000 x 20 lbs)', observaciones: 'Precio por libra' }
    ];

    const datosOtrosProductos = [
        { producto: 'Botiquín metálico semiindustrial', precio: '$60.000' },
        { producto: 'Botiquín metálico semiindustrial + todos los productos', precio: '$110.000' },
        { producto: 'Férula espinal no certificada', precio: '$220.000' },
        { producto: 'Férula espinal certificada', precio: '$220.000' },
        { producto: 'Punto ecológico de 60 litros', precio: '$320.000 (cada caneca sin base)' },
        { producto: 'Kit de carretera pequeño', precio: '$45.000' },
        { producto: 'Inmovilizador de cuello', precio: '$30.000' },
        { producto: 'Inmovilizador de cabeza', precio: '$30.000' },
        { producto: 'Cartel Peligro carga larga y ancha', precio: '$30.000' },
        { producto: 'Conos 30 CM', precio: '$40.000' },
        { producto: 'Conos 60 CM', precio: '$110.000' },
        { producto: 'Señalizaciones (cualquier clase de emergencia)', precio: '$5.000' },
        { producto: 'Kit de derrame de 6 galones', precio: '$140.000' },
        { producto: 'Kit de derrame de 10 galones', precio: '$210.000' },
        { producto: 'Kit de derrame de 55 galones', precio: '$240.000' }
    ];

    const datosInspeccionSeguridad = {
        valor: 'Cotizar',
        requisitos: [
            'Cédula del Representante Legal.',
            'RUT (Registro Único Tributario).',
            'Certificado de Cámara de Comercio (si aplica).',
            'Medidas del lugar (área total en metros cuadrados).'
        ],
        aspectosVerificados: [
            'Extintores requeridos: cantidad, tipo y ubicación según riesgo y área.',
            'Salidas de emergencia señalizadas y despejadas.',
            'Señalización de riesgo eléctrico y botiquín.',
            'Botiquín completo y con vigencias al día.',
            'Camilla de evacuación (si la actividad lo exige).',
            'Cableado canalizado y protegido.',
            'Personal capacitado en manejo de extintores.'
        ]
    };

    const datosCapacitacion = {
        valor: 'Cotizar',
        tipos: [
            {
                nombre: 'Primeros Auxilios',
                tipo: 'Charla',
                duracion: '8 horas',
                contenido: 'Manejo básico de primeros auxilios con sesiones prácticas.',
                certificado: 'Se entrega certificado de participación.'
            },
            {
                nombre: 'Manejo de Extintores',
                tipo: 'Charla',
                duracion: '8 horas',
                contenido: 'Tipos de extintores, usos, funcionamiento y práctica en campo controlado.',
                certificado: 'Se entrega certificado de participación.'
            },
            {
                nombre: 'Evacuación y Rescate',
                tipo: 'Capacitación',
                duracion: 'Variable',
                contenido: 'Métodos de evacuación, técnicas seguras de rescate y coordinación de brigadas.',
                certificado: 'Se entrega certificado de participación.'
            }
        ],
        requisitosInscripcion: [
            'Cédula de ciudadanía.',
            'Nombre del curso o capacitación de interés.',
            'Número de celular de contacto.'
        ]
    };

    const datosViajesAgua = {
        valor: 'Cotizar',
        descripcion: 'Transporte de agua potable para veredas, instituciones educativas, empresas y hogares.',
        capacidad: 'Carrotanque con capacidad de 5.000 litros (1.200 galones) por viaje.',
        nota: 'El servicio se programa por viaje completo. Si se requiere mayor volumen, se agenda un nuevo desplazamiento.'
    };

    return (
        <div className="portafolio-container">
            <header className="portafolio-header">
                <div className="portafolio-header__overlay" aria-hidden="true"></div>
                <div className="portafolio-content-wrapper">
                    <span className="portafolio-eyebrow">Portafolio institucional</span>
                    <h1>Soluciones integrales en gestión del riesgo y prevención</h1>
                    <p>
                        El Cuerpo de Bomberos Voluntarios de San Alberto acompaña desde {new Date().getFullYear() - 2009} años a la comunidad y al sector empresarial con programas de prevención, respuesta y fortalecimiento de capacidades.
                    </p>
                    <div className="portafolio-header__cta">
                        <Link to="/cotizar" className="portafolio-header__button primary">Solicitar cotización</Link>
                        <a href="#servicios-portafolio" className="portafolio-header__button secondary">Explorar servicios</a>
                    </div>
                </div>
            </header>

            <main className="portafolio-main">
                <section className="portafolio-metrics">
                    <div className="portafolio-metrics__grid">
                        {impactMetrics.map((metric) => (
                            <article key={metric.label} className="portafolio-metric-card">
                                <LineChart size={24} aria-hidden="true" />
                                <strong>{metric.value}</strong>
                                <span>{metric.label}</span>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="servicios-portafolio" className="portafolio-section">
                    <h2>Nuestros servicios</h2>
                    <p className="portafolio-section__lead">
                        Cada servicio incluye acompañamiento técnico, documentación formal y seguimiento posterior según la necesidad del cliente.
                    </p>
                    <div className="service-cards-grid">
                        {serviceCards.map((service) => (
                            <button
                                type="button"
                                key={service.id}
                                className={`service-card ${visibleSection === service.id ? 'service-card--active' : ''}`}
                                onClick={() => toggleSection(service.id)}
                            >
                                <div className="service-card__icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <span className="service-card__cta">
                                    {visibleSection === service.id ? 'Ocultar detalle' : 'Ver detalle'}
                                    <ChevronDown size={16} aria-hidden="true" />
                                </span>
                            </button>
                        ))}
                    </div>

                    {visibleSection === 'extintoresVenta' && (
                        <div className="service-detail-section" ref={extintoresVentaRef}>
                            <h4>Venta de Extintores</h4>
                            <table className="detail-table">
                                <thead>
                                    <tr>
                                        <th>Producto / Elemento</th>
                                        <th>Contenido</th>
                                        <th>Precio (Con soporte y señalización)</th>
                                        <th>Precio (Sin soporte ni señalización)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosVentaExtintores.map((item) => (
                                        <tr key={item.producto}>
                                            <td data-label="Producto / Elemento">{item.producto}</td>
                                            <td data-label="Contenido">{item.contenido}</td>
                                            <td data-label="Precio (Con soporte y señalización)">{item.precioCon}</td>
                                            <td data-label="Precio (Sin soporte ni señalización)">{item.precioSin}</td>
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
                                        <th>Parte</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosPartesExtintor.map((item) => (
                                        <tr key={item.parte}>
                                            <td data-label="Parte">{item.parte}</td>
                                            <td data-label="Precio">{item.precio}</td>
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
                                        <th>Tipo</th>
                                        <th>Contenido</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosBotiquines.map((item) => (
                                        <tr key={item.tipo}>
                                            <td data-label="Tipo">{item.tipo}</td>
                                            <td data-label="Contenido">{item.contenido}</td>
                                            <td data-label="Precio">{item.precio}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="note">Solicita cotización para ampliar el contenido específico de cada botiquín.</p>
                        </div>
                    )}

                    {visibleSection === 'mantenimientoExtintores' && (
                        <div className="service-detail-section" ref={mantenimientoExtintoresRef}>
                            <h4>Mantenimiento de Extintores</h4>
                            <table className="detail-table">
                                <thead>
                                    <tr>
                                        <th>Extintor</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosMantenimientoExtintores.map((item) => (
                                        <tr key={item.extintor}>
                                            <td data-label="Extintor">{item.extintor}</td>
                                            <td data-label="Precio">{item.precio}</td>
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
                                    {datosRecargaExtintores.map((item) => (
                                        <tr key={item.extintor}>
                                            <td data-label="Extintor">{item.extintor}</td>
                                            <td data-label="Precio de Recarga">{item.precio}</td>
                                            <td data-label="Observaciones">{item.observaciones}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {visibleSection === 'otrosProductos' && (
                        <div className="service-detail-section" ref={otrosProductosRef}>
                            <h4>Equipos complementarios</h4>
                            <table className="detail-table">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosOtrosProductos.map((item) => (
                                        <tr key={item.producto}>
                                            <td data-label="Producto">{item.producto}</td>
                                            <td data-label="Precio">{item.precio}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {visibleSection === 'inspeccionSeguridad' && (
                        <div className="service-detail-section" ref={inspeccionSeguridadRef}>
                            <h4>Inspecciones y conceptos técnicos</h4>
                            <div className="service-detail-grid">
                                <div>
                                    <h5>Requisitos para iniciar el proceso</h5>
                                    <ul>
                                        {datosInspeccionSeguridad.requisitos.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h5>Aspectos verificados</h5>
                                    <ul>
                                        {datosInspeccionSeguridad.aspectosVerificados.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {visibleSection === 'capacitacion' && (
                        <div className="service-detail-section" ref={capacitacionRef}>
                            <h4>Capacitaciones</h4>
                            <div className="service-detail-grid">
                                {datosCapacitacion.tipos.map((tipo) => (
                                    <div key={tipo.nombre} className="capacitacion-card">
                                        <h5>{tipo.nombre}</h5>
                                        <p><strong>Modalidad:</strong> {tipo.tipo}</p>
                                        <p><strong>Duración:</strong> {tipo.duracion}</p>
                                        <p>{tipo.contenido}</p>
                                        <p><strong>{tipo.certificado}</strong></p>
                                    </div>
                                ))}
                            </div>
                            <p className="note">Requisitos para inscripción: {datosCapacitacion.requisitosInscripcion.join(', ')}.</p>
                        </div>
                    )}

                    {visibleSection === 'viajesAgua' && (
                        <div className="service-detail-section" ref={viajesAguaRef}>
                            <h4>Suministro de agua potable</h4>
                            <div className="service-detail-grid">
                                <div>
                                    <p>{datosViajesAgua.descripcion}</p>
                                    <p><strong>Capacidad:</strong> {datosViajesAgua.capacidad}</p>
                                    <p><strong>Nota:</strong> {datosViajesAgua.nota}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                <section className="portafolio-cta" id="solicitar-cotizacion">
                    <div className="portafolio-cta__intro">
                        <span className="portafolio-eyebrow">Coordinemos tu proyecto</span>
                        <h2>Solicita una propuesta integral para tu empresa</h2>
                        <p>
                            Nuestro equipo comercial y técnico dará seguimiento a tu solicitud con enfoque institucional, tiempos definidos y soporte documental.
                        </p>
                    </div>
                    <QuoteForm layout="compact" title="Agendar asesoría con nuestro equipo" description="Selecciona los servicios de interés y cuéntanos sobre tu necesidad específica." />
                </section>
            </main>
        </div>
    );
};

export default Portafolio;
