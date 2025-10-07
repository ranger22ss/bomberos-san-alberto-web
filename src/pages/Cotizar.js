import React from 'react';
import { ShieldCheck, ClipboardList, Handshake, Building2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Cotizar.css';
import QuoteForm from '../components/QuoteForm';
import logoBomberos from '../logo.png';

const Cotizar = () => {
    const highlights = [
        {
            icon: <ShieldCheck size={32} aria-hidden="true" />,
            title: 'Cumplimiento normativo',
            description: 'Planes, inspecciones y conceptos técnicos alineados con la normatividad colombiana vigente.'
        },
        {
            icon: <ClipboardList size={32} aria-hidden="true" />,
            title: 'Acompañamiento integral',
            description: 'Desde el diagnóstico hasta la ejecución. Coordinamos logística, capacitación y reportes formales.'
        },
        {
            icon: <Handshake size={32} aria-hidden="true" />,
            title: 'Enfoque institucional',
            description: 'Atención personalizada para empresas, entidades públicas y organizaciones comunitarias.'
        },
        {
            icon: <Building2 size={32} aria-hidden="true" />,
            title: 'Cobertura regional',
            description: 'Respuesta oportuna en San Alberto, Cesar y municipios aledaños mediante nuestro equipo operativo.'
        }
    ];

    const processSteps = [
        {
            number: '01',
            title: 'Recibimos tu solicitud',
            description: 'Analizamos los servicios seleccionados y confirmamos información adicional si es necesaria.'
        },
        {
            number: '02',
            title: 'Diseñamos la propuesta',
            description: 'Nuestro equipo técnico construye la solución alineada con normativas y necesidades operativas.'
        },
        {
            number: '03',
            title: 'Coordinamos la ejecución',
            description: 'Agendamos visitas, capacitaciones o entregas según los tiempos acordados con tu organización.'
        }
    ];

    return (
        <div className="cotizar-page">
            <section className="cotizar-hero">
                <div className="cotizar-hero__overlay" aria-hidden="true"></div>
                <div className="cotizar-hero__content">
                    <img src={logoBomberos} alt="Logo Cuerpo de Bomberos Voluntarios San Alberto" className="cotizar-hero__logo" />
                    <span className="cotizar-hero__eyebrow">Servicios institucionales</span>
                    <h1>Solicita una propuesta profesional</h1>
                    <p>
                        Fortalece tus planes de emergencia, capacitaciones y equipamiento con un equipo certificado. Completa el formulario y agenda una asesoría con nuestros profesionales.
                    </p>
                    <div className="cotizar-hero__cta">
                        <a className="cotizar-hero__button primary" href="#solicitar-cotizacion">Ir al formulario</a>
                        <Link className="cotizar-hero__button secondary" to="/portafolio">Ver portafolio completo</Link>
                    </div>
                </div>
            </section>

            <section className="cotizar-highlights">
                <div className="cotizar-highlights__grid">
                    {highlights.map((highlight) => (
                        <article key={highlight.title} className="cotizar-highlight-card">
                            <div className="cotizar-highlight-card__icon">{highlight.icon}</div>
                            <h2>{highlight.title}</h2>
                            <p>{highlight.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="cotizar-process">
                <div className="cotizar-process__content">
                    <div className="cotizar-process__intro">
                        <span className="cotizar-process__eyebrow">Nuestro método</span>
                        <h2>Coordinamos cada etapa contigo</h2>
                        <p>
                            Nuestro equipo operativo y administrativo acompaña a cada aliado para garantizar procesos transparentes, reportes oportunos y cumplimiento de indicadores institucionales.
                        </p>
                    </div>
                    <div className="cotizar-process__steps">
                        {processSteps.map((step) => (
                            <div key={step.number} className="cotizar-process__step">
                                <span className="cotizar-process__step-number">{step.number}</span>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="solicitar-cotizacion" className="cotizar-form-section">
                <QuoteForm />
            </section>

            <section className="cotizar-portfolio-link">
                <div className="cotizar-portfolio-link__content">
                    <div>
                        <span className="cotizar-process__eyebrow">Casos y equipos</span>
                        <h2>Explora nuestro portafolio antes de solicitar tu propuesta</h2>
                        <p>
                            Encontrarás soluciones de mantenimiento de extintores, capacitaciones empresariales, suministro de agua y dotación de equipos certificados para distintos sectores.
                        </p>
                    </div>
                    <Link to="/portafolio" className="cotizar-portfolio-link__button">
                        Consultar portafolio
                        <ChevronRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Cotizar;
