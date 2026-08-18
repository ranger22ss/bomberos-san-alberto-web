import React, { useMemo, useState } from 'react';
import { Award, Building2, CalendarDays, CheckCircle2, Download, Search, ShieldCheck } from 'lucide-react';
import './Consulta.css';
import certificadosData from '../data/certificados.json';
import capacitacionesData from '../data/capacitaciones.json';

const TIPOS = {
  inspecciones: {
    titulo: 'Certificados de inspección',
    descripcion: 'Verifica la vigencia del concepto técnico de seguridad humana y protección contra incendios.',
    etiqueta: 'NIT del establecimiento',
    placeholder: 'Ej. 824006767-7',
    boton: 'Consultar inspección',
    Icono: ShieldCheck,
  },
  capacitaciones: {
    titulo: 'Capacitaciones realizadas',
    descripcion: 'Consulta las constancias de formación emitidas por el Cuerpo de Bomberos.',
    etiqueta: 'Documento del participante o NIT',
    placeholder: 'Ej. 1065123456',
    boton: 'Consultar capacitación',
    Icono: Award,
  },
};

const normalizar = (valor = '') => String(valor).trim().replace(/[.\-\s]/g, '').toUpperCase();
const formatearFecha = (fecha) => fecha
  ? new Date(`${fecha}T00:00:00`).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
  : 'No registrada';

function Consulta() {
  const [tipo, setTipo] = useState('inspecciones');
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const configuracion = TIPOS[tipo];

  const registros = useMemo(
    () => (tipo === 'inspecciones' ? certificadosData : capacitacionesData),
    [tipo]
  );

  const cambiarTipo = (nuevoTipo) => {
    setTipo(nuevoTipo);
    setBusqueda('');
    setResultado(null);
    setMensaje('');
  };

  const buscar = (event) => {
    event?.preventDefault();
    const valor = normalizar(busqueda);
    setMensaje('');
    setResultado(null);

    if (!valor) {
      setMensaje(`Ingresa ${tipo === 'inspecciones' ? 'el NIT del establecimiento' : 'el documento o NIT'} para continuar.`);
      return;
    }

    const encontrado = registros.find((registro) => {
      const identificadores = tipo === 'inspecciones'
        ? [registro.nit]
        : [registro.documento, registro.nit, registro.codigo];
      return identificadores.some((identificador) => normalizar(identificador) === valor);
    });

    if (!encontrado) {
      setResultado('no_encontrado');
      return;
    }

    if (tipo === 'inspecciones') {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const vencimiento = new Date(`${encontrado.fechaVencimiento}T00:00:00`);
      setResultado({ ...encontrado, estado: vencimiento >= hoy ? 'Vigente' : 'Vencido' });
    } else {
      setResultado({ ...encontrado, estado: encontrado.estado || 'Realizada' });
    }
  };

  const descargarConstancia = () => {
    const JsPDF = window.jspdf?.jsPDF;
    if (!JsPDF || !resultado || resultado === 'no_encontrado') {
      setMensaje('No fue posible generar el documento. Actualiza la página e inténtalo nuevamente.');
      return;
    }

    const doc = new JsPDF();
    const esInspeccion = tipo === 'inspecciones';
    const titulo = esInspeccion ? 'CERTIFICADO DE VIGENCIA DE CONCEPTO TÉCNICO' : 'CONSTANCIA DE CAPACITACIÓN';
    const nombre = esInspeccion ? resultado.nombreEmpresa : resultado.nombreParticipante || resultado.empresa;
    const identificacion = esInspeccion ? resultado.nit : resultado.documento || resultado.nit;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('CUERPO DE BOMBEROS VOLUNTARIOS DE SAN ALBERTO - CESAR', 105, 24, { align: 'center' });
    doc.setFontSize(16);
    doc.text(titulo, 105, 50, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const lineas = [
      `Titular: ${nombre || 'No registrado'}`,
      `Identificación: ${identificacion || 'No registrada'}`,
      `Radicado / código: ${resultado.radicado || resultado.codigo || 'No registrado'}`,
      esInspeccion ? `Fecha de expedición: ${formatearFecha(resultado.fechaExpedicion)}` : `Capacitación: ${resultado.capacitacion || 'No registrada'}`,
      esInspeccion ? `Fecha de vencimiento: ${formatearFecha(resultado.fechaVencimiento)}` : `Fecha de realización: ${formatearFecha(resultado.fechaRealizacion)}`,
      `Estado: ${resultado.estado}`,
    ];
    lineas.forEach((linea, index) => doc.text(linea, 24, 78 + (index * 10)));
    doc.text('Documento generado desde el portal oficial de Bomberos San Alberto.', 105, 180, { align: 'center' });
    doc.save(`${esInspeccion ? 'Certificado' : 'Capacitacion'}_${identificacion || 'consulta'}.pdf`);
  };

  return (
    <section className="consulta-container" aria-labelledby="consulta-title">
      <div className="consulta-hero">
        <span className="consulta-eyebrow"><CheckCircle2 size={16} /> Verificación institucional</span>
        <h1 id="consulta-title">Consulta tus certificados en línea</h1>
        <p>Información oficial, rápida y segura del Cuerpo de Bomberos Voluntarios de San Alberto.</p>
      </div>

      <div className="consulta-tabs" role="tablist" aria-label="Tipo de certificado">
        {Object.entries(TIPOS).map(([clave, item]) => {
          const Icono = item.Icono;
          return (
            <button key={clave} type="button" role="tab" aria-selected={tipo === clave}
              className={`consulta-tab ${tipo === clave ? 'activo' : ''}`} onClick={() => cambiarTipo(clave)}>
              <Icono size={22} /><span><strong>{item.titulo}</strong><small>{clave === 'inspecciones' ? 'Para establecimientos' : 'Para personas y empresas'}</small></span>
            </button>
          );
        })}
      </div>

      <div className="consulta-panel" role="tabpanel">
        <div className="consulta-panel-copy">
          <configuracion.Icono size={30} />
          <div><h2>{configuracion.titulo}</h2><p>{configuracion.descripcion}</p></div>
        </div>
        <form className="consulta-form" onSubmit={buscar}>
          <label htmlFor="consulta-identificador">{configuracion.etiqueta}</label>
          <div className="consulta-input-row">
            <Search size={20} aria-hidden="true" />
            <input id="consulta-identificador" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
              placeholder={configuracion.placeholder} autoComplete="off" inputMode="text" />
            <button type="submit">{configuracion.boton}</button>
          </div>
          <small>Se aceptan números con o sin puntos, espacios o guion de verificación.</small>
        </form>
      </div>

      {mensaje && <div className="consulta-alerta" role="alert">{mensaje}</div>}
      {resultado === 'no_encontrado' && (
        <div className="consulta-vacio" role="status"><Search size={34} /><h3>No encontramos coincidencias</h3>
          <p>Revisa el número ingresado. Si el registro es reciente, comunícate con atención institucional.</p></div>
      )}
      {resultado && resultado !== 'no_encontrado' && (
        <article className="consulta-resultado">
          <div className="resultado-header"><div><span>Resultado verificado</span><h2>{tipo === 'inspecciones' ? resultado.nombreEmpresa : resultado.nombreParticipante || resultado.empresa}</h2></div>
            <span className={`resultado-estado ${resultado.estado.toLowerCase()}`}>{resultado.estado}</span></div>
          <div className="resultado-grid">
            <div><Building2 /><span>{tipo === 'inspecciones' ? 'NIT' : 'Identificación'}</span><strong>{tipo === 'inspecciones' ? resultado.nit : resultado.documento || resultado.nit}</strong></div>
            <div><ShieldCheck /><span>{tipo === 'inspecciones' ? 'Radicado' : 'Código'}</span><strong>{resultado.radicado || resultado.codigo || 'No registrado'}</strong></div>
            <div><CalendarDays /><span>{tipo === 'inspecciones' ? 'Expedición' : 'Realización'}</span><strong>{formatearFecha(resultado.fechaExpedicion || resultado.fechaRealizacion)}</strong></div>
            <div><Award /><span>{tipo === 'inspecciones' ? 'Vencimiento' : 'Capacitación'}</span><strong>{tipo === 'inspecciones' ? formatearFecha(resultado.fechaVencimiento) : resultado.capacitacion}</strong></div>
          </div>
          <button type="button" className="consulta-download" onClick={descargarConstancia}><Download size={19} /> Descargar constancia PDF</button>
        </article>
      )}
    </section>
  );
}

export default Consulta;

