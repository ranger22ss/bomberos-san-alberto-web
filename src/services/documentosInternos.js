import logoInstitucional from '../logo.png';

const AZUL = [11, 39, 67];
const ROJO = [181, 40, 40];
const GRIS = [92, 104, 118];

const crearCodigo = (tipo) => {
  const fecha = new Date();
  const compacta = `${fecha.getFullYear()}${String(fecha.getMonth() + 1).padStart(2, '0')}${String(fecha.getDate()).padStart(2, '0')}`;
  const aleatorio = (window.crypto?.randomUUID?.() || Math.random().toString(36)).replace(/-/g, '').slice(0, 7).toUpperCase();
  return `CBVSA-${tipo}-${compacta}-${aleatorio}`;
};

const fechaEnLetras = (fechaISO) => {
  const fecha = new Date(`${fechaISO}T12:00:00`);
  return { dia: fecha.getDate(), mes: fecha.toLocaleDateString('es-CO', { month: 'long' }), anio: fecha.getFullYear() };
};

const cargarLogo = () => new Promise((resolve, reject) => {
  const imagen = new Image();
  imagen.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = imagen.naturalWidth;
    canvas.height = imagen.naturalHeight;
    canvas.getContext('2d').drawImage(imagen, 0, 0);
    resolve(canvas.toDataURL('image/png'));
  };
  imagen.onerror = reject;
  imagen.src = logoInstitucional;
});

const obtenerJsPDF = () => {
  const JsPDF = window.jspdf?.jsPDF;
  if (!JsPDF) throw new Error('El generador de PDF no está disponible.');
  return JsPDF;
};

const dibujarMembrete = (doc, logo, codigo, tituloDocumento) => {
  doc.setDrawColor(...AZUL); doc.setLineWidth(0.65); doc.roundedRect(10, 10, 190, 277, 2, 2);
  doc.setFillColor(...AZUL); doc.rect(10, 10, 190, 36, 'F');
  doc.setFillColor(...ROJO); doc.rect(10, 46, 190, 2.2, 'F');
  doc.setFillColor(255, 255, 255); doc.roundedRect(16, 14, 28, 28, 2, 2, 'F');
  doc.addImage(logo, 'PNG', 18, 16, 24, 24, undefined, 'FAST');
  doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(12.5);
  doc.text('CUERPO DE BOMBEROS VOLUNTARIOS', 108, 21, { align: 'center' });
  doc.setFontSize(11); doc.text('SAN ALBERTO – CESAR', 108, 27, { align: 'center' });
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7.2);
  doc.text('Personería Jurídica No. 0015 del 14 de abril de 2009', 108, 33, { align: 'center' });
  doc.text('Resolución No. 007914 del 10 de julio de 2023 · NIT 900.279.175-3', 108, 38, { align: 'center' });
  doc.setFontSize(6.6); doc.text('PÁGINA 1 DE 1', 193, 17, { align: 'right' });
  doc.saveGraphicsState(); doc.setGState(new doc.GState({ opacity: 0.045 }));
  doc.addImage(logo, 'PNG', 53, 92, 104, 99, undefined, 'FAST'); doc.restoreGraphicsState();
  doc.setFillColor(...AZUL); doc.rect(10, 253, 190, 34, 'F');
  doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(7.2);
  doc.text(tituloDocumento.toUpperCase(), 105, 260, { align: 'center' });
  doc.setFont('helvetica', 'normal'); doc.setFontSize(6.7);
  doc.text('Calle 5 #7-44, barrio La Marina · San Alberto, Cesar', 105, 267, { align: 'center' });
  doc.text('Emergencias: 315 353 8706 · Atención: 300 175 1212', 105, 272, { align: 'center' });
  doc.text('cuerpobomberossanalberto@gmail.com', 105, 277, { align: 'center' });
  doc.setFont('courier', 'bold'); doc.setFontSize(6.4); doc.text(`CÓDIGO: ${codigo}`, 105, 283, { align: 'center' });
};

const escribirParrafo = (doc, contenido, y, opciones = {}) => {
  doc.setTextColor(...(opciones.color || [25, 35, 48]));
  doc.setFont('helvetica', opciones.bold ? 'bold' : 'normal'); doc.setFontSize(opciones.size || 8.8);
  const lineas = doc.splitTextToSize(contenido, opciones.ancho || 168);
  doc.text(lineas, opciones.x || 21, y, { align: opciones.align || 'justify', maxWidth: opciones.ancho || 168, lineHeightFactor: opciones.lineHeight || 1.35 });
  return y + (lineas.length * (opciones.salto || 4.1));
};

const escribirDato = (doc, etiqueta, valor, y) => {
  doc.setFillColor(246, 248, 251); doc.roundedRect(21, y - 4.4, 168, 8, 1, 1, 'F');
  doc.setTextColor(...GRIS); doc.setFont('helvetica', 'bold'); doc.setFontSize(7.1); doc.text(etiqueta.toUpperCase(), 24, y);
  doc.setTextColor(25, 35, 48); doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.text(String(valor || 'No registrado'), 81, y);
  return y + 9;
};

export const generarSolicitudInspeccion = async (datos) => {
  const JsPDF = obtenerJsPDF(); const codigo = crearCodigo('SOL'); const logo = await cargarLogo();
  const fecha = fechaEnLetras(datos.fechaSolicitud); const doc = new JsPDF({ unit: 'mm', format: 'a4' });
  dibujarMembrete(doc, logo, codigo, 'Solicitud de inspección y certificación');
  let y = 57;
  doc.setTextColor(...AZUL); doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5);
  doc.text(`${datos.lugar}, ${fecha.dia} de ${fecha.mes} de ${fecha.anio}`, 189, y, { align: 'right' });
  y += 10; doc.setTextColor(25, 35, 48); doc.setFontSize(8.7);
  doc.text('Señores', 21, y); doc.text('CUERPO DE BOMBEROS VOLUNTARIOS DE SAN ALBERTO, CESAR', 21, y + 4.2); y += 12;
  y = escribirParrafo(doc, 'ASUNTO: SOLICITUD DE INSPECCIÓN Y CERTIFICACIÓN DE SEGURIDAD HUMANA Y PROTECCIÓN CONTRA INCENDIOS DEL ESTABLECIMIENTO.', y, { bold: true, align: 'left', size: 8.5, salto: 3.9 });
  y += 2; y = escribirParrafo(doc, 'Respetados señores Bomberos:', y, { align: 'left', size: 8.4 }); y += 1;
  y = escribirParrafo(doc, 'Conociendo las disposiciones de seguridad establecidas en la Ley 1575 del 21 de agosto de 2012, particularmente en su artículo 42 sobre inspecciones y certificaciones de seguridad humana, reformado por el artículo 7 de la Ley 1796 de 2016, solicito la realización de la visita de inspección. Los cuerpos de bomberos son los órganos competentes para realizar labores de inspección y prevención de incendios y seguridad humana en edificaciones públicas y privadas, establecimientos de comercio e industrias, e informar a la entidad competente sobre el cumplimiento de las normas de seguridad. De igual manera, velarán por el cumplimiento de la normativa vigente en gestión contra incendios y calamidades conexas.', y, { size: 7.8, salto: 3.45, lineHeight: 1.25 });
  y += 1.5; y = escribirParrafo(doc, '2. Realización de inspecciones técnicas planeadas referentes a incendios y seguridad humana.', y, { bold: true, align: 'left', size: 7.8, salto: 3.5 }); y += 1;
  y = escribirParrafo(doc, 'La Resolución 661 de 2014, en su artículo 213, establece que el Cuerpo de Bomberos expedirá un certificado de inspección a las edificaciones públicas y privadas, establecimientos públicos de comercio e industrias que cumplan las condiciones de seguridad humana y protección contra incendios. Si se realizan remodelaciones, ampliaciones, modificaciones u otras intervenciones que impliquen variación en la parte arquitectónica, se invalidará el certificado vigente y deberá solicitarse inmediatamente una nueva inspección para la expedición del correspondiente certificado de seguridad humana y protección contra incendios.', y, { size: 7.8, salto: 3.45, lineHeight: 1.25 });
  y += 3; y = escribirDato(doc, 'Solicitante', datos.solicitante, y);
  y = escribirDato(doc, 'Cédula / expedida en', `${datos.cedula} · ${datos.expedidaEn}`, y);
  y = escribirDato(doc, 'Número celular', datos.celular, y); y = escribirDato(doc, 'Dirección de la visita', datos.direccion, y);
  y = escribirDato(doc, 'Barrio / municipio', `${datos.barrio} · ${datos.municipio}`, y); y = escribirDato(doc, 'Establecimiento', datos.nombreEstablecimiento, y);
  y = escribirDato(doc, 'NIT', datos.nit, y); y = escribirDato(doc, 'Actividad económica', datos.actividadEconomica, y);
  y = escribirDato(doc, 'Área del establecimiento', `${datos.metrosCuadrados} m²`, y);
  const firmaY = Math.min(240, y + 9); doc.setDrawColor(...GRIS); doc.line(58, firmaY, 152, firmaY);
  doc.setTextColor(25, 35, 48); doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.text('Firma del solicitante', 105, firmaY + 5, { align: 'center' });
  doc.save(`Solicitud_inspeccion_${datos.nit || codigo}.pdf`); return codigo;
};

export const generarConstanciaTramite = async (datos) => {
  const JsPDF = obtenerJsPDF(); const codigo = crearCodigo('TRA'); const logo = await cargarLogo();
  const fecha = fechaEnLetras(datos.fechaSolicitud); const doc = new JsPDF({ unit: 'mm', format: 'a4' });
  dibujarMembrete(doc, logo, codigo, 'Constancia de trámite en proceso');
  doc.setTextColor(...AZUL); doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.text('CONSTANCIA DE TRÁMITE EN PROCESO', 105, 61, { align: 'center' });
  doc.setTextColor(...ROJO); doc.setFontSize(12); doc.text('CONCEPTO TÉCNICO BOMBERIL', 105, 68, { align: 'center' });
  let y = 80;
  y = escribirParrafo(doc, 'El Cuerpo de Bomberos Voluntarios de San Alberto, Cesar, en ejercicio de sus funciones y en cumplimiento de la normatividad vigente en materia de gestión del riesgo, seguridad humana y protección contra incendios,', y, { size: 9.2, salto: 4.3 });
  y += 6; y = escribirParrafo(doc, 'HACE CONSTAR QUE:', y, { bold: true, align: 'left', size: 9.5, color: AZUL }); y += 4;
  y = escribirParrafo(doc, `El establecimiento de comercio denominado ${datos.nombreEstablecimiento}, identificado con NIT ${datos.nit}, ubicado en ${datos.direccion}, barrio ${datos.barrio}, ${datos.municipio}, se encuentra actualmente en proceso de trámite para la obtención del Concepto Técnico Bomberil ante esta institución.`, y, { size: 9.2, salto: 4.3 });
  y += 5; y = escribirParrafo(doc, 'Se deja constancia de que, a la fecha de expedición del presente documento, el establecimiento NO cuenta aún con concepto técnico aprobado, toda vez que el proceso se encuentra en etapa de evaluación, verificación o cumplimiento de requisitos exigidos.', y, { size: 9.2, salto: 4.3 });
  y += 5; y = escribirParrafo(doc, 'El presente documento se expide a solicitud del interesado, únicamente como soporte del estado del trámite, y no constituye aprobación ni certificación de cumplimiento de las normas de seguridad contra incendios.', y, { size: 9.2, salto: 4.3 });
  y += 6; y = escribirParrafo(doc, `Se expide en ${datos.lugar}, a los ${fecha.dia} días del mes de ${fecha.mes} de ${fecha.anio}.`, y, { align: 'left', size: 9.2 });
  y += 15; doc.setTextColor(25, 35, 48); doc.setFont('helvetica', 'normal'); doc.setFontSize(9.2); doc.text('Atentamente,', 22, y); y += 25;
  doc.setDrawColor(...GRIS); doc.line(22, y, 100, y); doc.setTextColor(...AZUL); doc.setFont('helvetica', 'bold'); doc.setFontSize(9.2);
  doc.text('MARITZA BARRIONUEVO QUIÑONEZ', 22, y + 6); doc.setTextColor(25, 35, 48); doc.setFontSize(8.2);
  doc.text('Comandante / Representante Legal', 22, y + 11); doc.text('Cuerpo de Bomberos Voluntarios de San Alberto, Cesar', 22, y + 16);
  doc.save(`Constancia_tramite_${datos.nit || codigo}.pdf`); return codigo;
};
