import React, { useMemo, useState } from 'react';
import { Award, Building2, CalendarDays, CheckCircle2, Download, Search, ShieldCheck } from 'lucide-react';
import './Consulta.css';
import certificadosData from '../data/certificados.json';
import capacitacionesData from '../data/capacitaciones.json';
import logoInstitucional from '../logo.png';

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

  const cargarImagen = (url) => new Promise((resolve, reject) => {
    const imagen = new Image();
    imagen.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = imagen.naturalWidth;
      canvas.height = imagen.naturalHeight;
      canvas.getContext('2d').drawImage(imagen, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    imagen.onerror = reject;
    imagen.src = url;
  });

  const crearCodigoVerificacion = (registro) => {
    const origen = [tipo, registro.nit, registro.documento, registro.radicado, registro.codigo,
      registro.fechaExpedicion, registro.fechaRealizacion].filter(Boolean).join('|');
    let hash = 0;
    for (let index = 0; index < origen.length; index += 1) {
      hash = ((hash << 5) - hash) + origen.charCodeAt(index);
      hash |= 0;
    }
    return `CBVSA-${Math.abs(hash).toString(36).toUpperCase().padStart(7, '0')}`;
  };

  const descargarConstancia = async () => {
    const JsPDF = window.jspdf?.jsPDF;
    if (!JsPDF || !resultado || resultado === 'no_encontrado') {
      setMensaje('No fue posible generar el documento. Actualiza la página e inténtalo nuevamente.');
      return;
    }

    const doc = new JsPDF({ unit: 'mm', format: 'a4' });
    const esInspeccion = tipo === 'inspecciones';
    const titulo = esInspeccion ? 'CERTIFICADO DE VIGENCIA' : 'CONSTANCIA DE CAPACITACIÓN';
    const subtitulo = esInspeccion ? 'Concepto técnico de seguridad humana y protección contra incendios' : 'Registro institucional de formación realizada';
    const nombre = esInspeccion ? resultado.nombreEmpresa : resultado.nombreParticipante || resultado.empresa;
    const identificacion = esInspeccion ? resultado.nit : resultado.documento || resultado.nit;
    const codigo = crearCodigoVerificacion(resultado);
    let logoBase64 = '';
    try { logoBase64 = await cargarImagen(logoInstitucional); } catch (error) { console.warn('No se pudo cargar el logo en el PDF', error); }

    const azul = [11, 39, 67];
    const rojo = [181, 40, 40];
    const gris = [92, 104, 118];

    // Marco, encabezado y sello institucional.
    doc.setDrawColor(...azul);
    doc.setLineWidth(0.7);
    doc.roundedRect(10, 10, 190, 277, 2, 2);
    doc.setFillColor(...azul);
    doc.rect(10, 10, 190, 36, 'F');
    doc.setFillColor(...rojo);
    doc.rect(10, 46, 190, 2.2, 'F');
    if (logoBase64) {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(16, 14, 28, 28, 2, 2, 'F');
      doc.addImage(logoBase64, 'PNG', 18, 16, 24, 24, undefined, 'FAST');
    }
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12.5);
    doc.text('CUERPO DE BOMBEROS VOLUNTARIOS', 108, 21, { align: 'center' });
    doc.setFontSize(11);
    doc.text('SAN ALBERTO – CESAR', 108, 27, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('Personería Jurídica No. 0015 del 14 de abril de 2009', 108, 33, { align: 'center' });
    doc.text('Resolución No. 007914 del 10 de julio de 2023 · NIT 900.279.175-3', 108, 38, { align: 'center' });
    doc.setFontSize(7);
    doc.text('PÁGINA 1 DE 1', 193, 17, { align: 'right' });

    // Título y marca de agua.
    if (logoBase64) {
      doc.saveGraphicsState();
      doc.setGState(new doc.GState({ opacity: 0.045 }));
      doc.addImage(logoBase64, 'PNG', 55, 92, 100, 100, undefined, 'FAST');
      doc.restoreGraphicsState();
    }
    doc.setTextColor(...rojo);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(titulo, 105, 64, { align: 'center' });
    doc.setTextColor(...gris);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(subtitulo, 105, 70, { align: 'center' });
    doc.setDrawColor(213, 219, 226);
    doc.line(25, 76, 185, 76);

    // Ficha del registro consultado.
    const filas = esInspeccion ? [
      ['Titular / establecimiento', nombre || 'No registrado'],
      ['NIT', identificacion || 'No registrado'],
      ['Radicado', resultado.radicado || 'No registrado'],
      ['Fecha de expedición', formatearFecha(resultado.fechaExpedicion)],
      ['Fecha de vencimiento', formatearFecha(resultado.fechaVencimiento)],
      ['Estado al momento de la consulta', resultado.estado],
    ] : [
      ['Titular', nombre || 'No registrado'],
      ['Identificación', identificacion || 'No registrada'],
      ['Empresa', resultado.empresa || 'No registrada'],
      ['Capacitación realizada', resultado.capacitacion || 'No registrada'],
      ['Fecha de realización', formatearFecha(resultado.fechaRealizacion)],
      ['Intensidad horaria', resultado.intensidadHoras ? `${resultado.intensidadHoras} horas` : 'No registrada'],
      ['Código / estado', `${resultado.codigo || 'No registrado'} · ${resultado.estado}`],
    ];
    let y = 84;
    filas.forEach(([etiqueta, valor], index) => {
      const lineasEtiqueta = doc.splitTextToSize(etiqueta.toUpperCase(), 50);
      const lineasValor = doc.splitTextToSize(String(valor), 94);
      const cantidadLineas = Math.max(lineasEtiqueta.length, lineasValor.length);
      const alto = Math.max(10, cantidadLineas * 4 + 5);
      if (index % 2 === 0) { doc.setFillColor(246, 248, 251); doc.rect(24, y - 5.5, 162, alto, 'F'); }
      doc.setTextColor(...gris); doc.setFont('helvetica', 'bold'); doc.setFontSize(7.2);
      doc.text(lineasEtiqueta, 28, y, { lineHeightFactor: 1.15 });
      doc.setTextColor(25, 35, 48); doc.setFont('helvetica', 'normal'); doc.setFontSize(9.3);
      doc.text(lineasValor, 88, y, { lineHeightFactor: 1.15 });
      y += alto;
    });

    y += 8;
    doc.setTextColor(25, 35, 48);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const parrafo = esInspeccion
      ? `El Cuerpo de Bomberos Voluntarios de San Alberto certifica que el establecimiento identificado en este documento registra un concepto técnico de seguridad humana y protección contra incendios con estado ${resultado.estado.toUpperCase()} a la fecha de generación. Esta constancia permite verificar la información contenida en el registro institucional y no modifica los términos del certificado original.`
      : `El Cuerpo de Bomberos Voluntarios de San Alberto hace constar que la persona identificada en este documento participó y cumplió la capacitación denominada “${resultado.capacitacion || 'capacitación registrada'}”, realizada en la fecha e intensidad horaria indicadas. La información corresponde al registro institucional de capacitaciones.`;
    doc.text(doc.splitTextToSize(parrafo, 154), 28, y, { align: 'justify', maxWidth: 154, lineHeightFactor: 1.45 });

    // Firma institucional y verificación.
    doc.setDrawColor(...gris);
    doc.line(28, 224, 93, 224);
    doc.setTextColor(...azul);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('MARITZA BARRIONUEVO QUIÑONEZ', 28, 230);
    doc.setFontSize(8.3);
    doc.text('COMANDANTE / REPRESENTANTE LEGAL', 28, 235);
    doc.setFillColor(244, 247, 250);
    doc.roundedRect(116, 216, 69, 23, 2, 2, 'F');
    doc.setTextColor(...gris); doc.setFont('helvetica', 'normal'); doc.setFontSize(6.8);
    doc.text('CÓDIGO DE VERIFICACIÓN', 121, 222);
    doc.setTextColor(...azul); doc.setFont('courier', 'bold'); doc.setFontSize(10);
    doc.text(codigo, 121, 229);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(...gris);
    doc.text('Generado exclusivamente desde el portal web oficial.', 121, 235);

    // Pie institucional.
    doc.setFillColor(...azul);
    doc.rect(10, 252, 190, 35, 'F');
    doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(7.6);
    doc.text('DOCUMENTO DIGITAL DE CONSULTA INSTITUCIONAL', 105, 260, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
    doc.text('Calle 5 #7-44, barrio La Marina · San Alberto, Cesar', 105, 267, { align: 'center' });
    doc.text('Emergencias: 315 353 8706 · Atención: 300 175 1212', 105, 272, { align: 'center' });
    doc.text('cuerpobomberossanalberto@gmail.com', 105, 277, { align: 'center' });
    doc.setFontSize(6.3);
    doc.text(`Generado: ${new Date().toLocaleString('es-CO')} · ${codigo}`, 105, 283, { align: 'center' });
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
          <small>Se aceptan números con o sin puntos, espacios o guion de verificación, si tu nit cuenta con mas establecimientos prueba agregando un 0 o un 1 al final.</small>
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

