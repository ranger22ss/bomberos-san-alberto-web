import React, { useState } from 'react';
import './Consulta.css'; // Importa los estilos para la página de consulta
import certificadosData from '../data/certificados.json'; // Importa tus datos de certificados

// Asegúrate de que jsPDF esté cargado en public/index.html via CDN
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
// La librería `jspdf` se espera que esté disponible globalmente como `window.jspdf.jsPDF`
const { jsPDF } = window.jspdf;


function Consulta() {
    const [nitBusqueda, setNitBusqueda] = useState('');
    const [resultadoBusqueda, setResultadoBusqueda] = useState(null); // null, 'no_encontrado', o el objeto del certificado
    const [mensajeError, setMensajeError] = useState('');

    // Información de contacto para el pie de página del PDF
    const contactoFooter = {
        direccion: "Dirección: Calle 5ta 7-44 Barrio La Marina, San Alberto",
        telefonos: "Teléfonos Línea de Emergencia 3153538706 - 3001751212",
        email: "E-Mail: cuerpobomberosvoluntariossanalberto@hotmail.com"
    };

    // Dejamos el logoBase64 vacío, como solicitaste, para que tú lo añadas.
    // Si deseas añadir un logo, convierte tu imagen a Base64 y reemplaza el string vacío aquí.
    // Ejemplo: const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
    const logoBase64 = "";

    // Función para normalizar el NIT: quitar espacios y guiones, convertir a mayúsculas
    const normalizarNit = (nit) => {
        return nit.trim().replace(/[- ]/g, '').toUpperCase();
    };

    // Función para manejar la búsqueda del certificado
    const handleBuscarCertificado = () => {
        setResultadoBusqueda(null); // Limpiar resultado anterior
        setMensajeError(''); // Limpiar mensaje de error anterior

        if (!nitBusqueda.trim()) {
            setMensajeError('Por favor, ingresa un NIT para buscar.');
            return;
        }

        // Normalizar el NIT de búsqueda ingresado por el usuario
        const nitNormalizadoUsuario = normalizarNit(nitBusqueda);

        // Buscar el certificado en los datos
        const certificadoEncontrado = certificadosData.find(
            // Normalizar el NIT de cada certificado en el JSON para la comparación
            (cert) => normalizarNit(cert.nit) === nitNormalizadoUsuario
        );

        if (certificadoEncontrado) {
            // Si se encuentra el certificado, determinar su estado de vigencia
            const fechaVencimiento = new Date(certificadoEncontrado.fechaVencimiento);
            const hoy = new Date();

            // Ajustar hoy a medianoche para una comparación precisa solo con la fecha
            hoy.setHours(0, 0, 0, 0);
            fechaVencimiento.setHours(0, 0, 0, 0);

            let estadoVigencia;
            if (fechaVencimiento >= hoy) {
                estadoVigencia = 'Vigente';
            } else {
                estadoVigencia = 'Vencido';
            }
            setResultadoBusqueda({ ...certificadoEncontrado, estadoVigencia });
        } else {
            setResultadoBusqueda('no_encontrado');
        }
    };

    // Función para generar el PDF del certificado
    const generarPDF = () => {
        if (!resultadoBusqueda || resultadoBusqueda === 'no_encontrado') {
            setMensajeError('No hay certificado para generar el PDF.');
            return;
        }

        const doc = new jsPDF();

        // --- Configuración de Fuentes y Colores ---
        doc.setFont("helvetica"); // Usa una fuente estándar
        doc.setTextColor(0, 0, 0); // Color de texto negro

        let yPos = 20; // Posición inicial en Y

        // --- Logo (si está disponible) ---
        if (logoBase64) {
            try {
                // Ajusta las coordenadas (x, y) y el tamaño (width, height) de tu logo
                // doc.addImage(imageData, format, x, y, width, height)
                doc.addImage(logoBase64, 'PNG', 10, 10, 50, 20); // x, y, ancho, alto
                yPos = 40; // Ajusta la posición Y después del logo
            } catch (e) {
                console.error("Error al añadir la imagen del logo al PDF:", e);
            }
        } else {
            // Si no hay logo, puedes dejar un espacio o un texto temporal si es necesario para el layout.
            // doc.text("Espacio para el Logo", 15, yPos); // Comentado para una mayor simplicidad
        }


        // --- Encabezado del PDF ---
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("CUERPO DE BOMBEROS VOLUNTARIOS DE SAN ALBERTO - CESAR", doc.internal.pageSize.width / 2, yPos, { align: 'center' });
        yPos += 8;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Personería Jurídica No. 0015 del 14 de abril del 2009", doc.internal.pageSize.width / 2, yPos, { align: 'center' });
        yPos += 7;
        doc.text("Resolución No. 007914 del 10 de julio del 2023", doc.internal.pageSize.width / 2, yPos, { align: 'center' });
        yPos += 7;
        doc.text("Expedida por la Dirección Nacional de Bomberos de Colombia", doc.internal.pageSize.width / 2, yPos, { align: 'center' });
        yPos += 10;
        doc.line(10, yPos, 200, yPos); // Línea divisoria
        yPos += 15;


        // --- Título del Certificado ---
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("CERTIFICADO DE VIGENCIA DE CONCEPTO TÉCNICO", doc.internal.pageSize.width / 2, yPos, { align: 'center' });
        yPos += 20;

        // --- Contenido del Certificado ---
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");

        // Fecha de Expedición del Documento PDF (hoy)
        const fechaGeneracionPDF = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
        doc.text(`San Alberto - Cesar, ${fechaGeneracionPDF}`, doc.internal.pageSize.width - 20, yPos, { align: 'right' });
        yPos += 15;

        // Texto introductorio simple
        doc.text("El Cuerpo de Bomberos Voluntarios de San Alberto - Cesar, certifica que:", 20, yPos);
        yPos += 15;

        // Detalles del establecimiento
        doc.setFont("helvetica", "bold");
        doc.text(`Nombre del Establecimiento: ${resultadoBusqueda.nombreEmpresa || 'Nombre no disponible'}`, 20, yPos);
        yPos += 7;
        doc.text(`NIT de la Empresa: ${resultadoBusqueda.nit}`, 20, yPos);
        yPos += 7;
        // --- NUEVO: Radicado del Certificado en PDF ---
        doc.text(`Radicado del Certificado: ${resultadoBusqueda.radicado || 'No disponible'}`, 20, yPos);
        yPos += 7;
        doc.text(`Expedido el: ${new Date(resultadoBusqueda.fechaExpedicion).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`, 20, yPos);
        yPos += 7;
        doc.text(`Vencimiento el: ${new Date(resultadoBusqueda.fechaVencimiento).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`, 20, yPos);
        yPos += 15;

        doc.setFont("helvetica", "normal");
        doc.text("Se expide el presente certificado a solicitud de parte interesada para los fines pertinentes.", 20, yPos);
        yPos += 20;

        // --- Firma del Representante ---
        doc.setFont("helvetica", "bold");
        doc.text("MARITZA BARRIONUEVO QUIÑONEZ", doc.internal.pageSize.width / 2, yPos, { align: 'center' });
        yPos += 5;
        doc.text("REP. LEGAL - COMANDANTE", doc.internal.pageSize.width / 2, yPos, { align: 'center' });

        // --- Pie de página del PDF ---
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const footerY = doc.internal.pageSize.height - 30; // Posición Y para el pie de página

        doc.line(10, footerY - 5, 200, footerY - 5); // Línea divisoria antes del pie de página
        doc.text(contactoFooter.direccion, doc.internal.pageSize.width / 2, footerY + 5, { align: 'center' });
        doc.text(contactoFooter.telefonos, doc.internal.pageSize.width / 2, footerY + 10, { align: 'center' });
        doc.text(contactoFooter.email, doc.internal.pageSize.width / 2, footerY + 15, { align: 'center' });

        // Guardar el PDF
        doc.save(`Certificado_${resultadoBusqueda.nit}.pdf`);
    };

    return (
        <div className="consulta-container">
            <h1 className="consulta-title">Consulta de Certificados de Inspección de Seguridad Humana contra Incendios</h1>
            <p className="consulta-description">Ingresa el NIT de la empresa para verificar la vigencia de su certificado. Agrega el DV de tu establecimiento con un "-" si lo tiene.</p>

            <div className="search-box">
                <input
                    type="text"
                    className="nit-input"
                    placeholder="Ej: 824006767-7 o 824006767"
                    value={nitBusqueda}
                    onChange={(e) => setNitBusqueda(e.target.value)}
                    onKeyPress={(e) => { // Permite buscar al presionar Enter
                        if (e.key === 'Enter') {
                            handleBuscarCertificado();
                        }
                    }}
                />
                <button className="search-button" onClick={handleBuscarCertificado}>
                    Buscar Certificado
                </button>
            </div>

            {mensajeError && <p className="error-message">{mensajeError}</p>}

            {resultadoBusqueda && (
                <div className="results-box">
                    {resultadoBusqueda === 'no_encontrado' ? (
                        <p className="not-found-message">No se encontró ningún certificado con el NIT: <strong>{nitBusqueda}</strong>. Por favor, verifica el número e intenta de nuevo.</p>
                    ) : (
                        <div className={`certificate-details ${resultadoBusqueda.estadoVigencia ? resultadoBusqueda.estadoVigencia.toLowerCase() : ''}`}>
                            <h3>Detalles del Certificado</h3>
                            <p><strong>NIT:</strong> {resultadoBusqueda.nit}</p>
                            <p><strong>Empresa:</strong> {resultadoBusqueda.nombreEmpresa || 'Nombre no disponible'}</p>
                            <p><strong>Dirección:</strong> {resultadoBusqueda.direccion}</p>
                            {/* --- NUEVO: Radicado del Certificado en la página --- */}
                            <p><strong>Radicado:</strong> {resultadoBusqueda.radicado || 'No disponible'}</p>
                            <p><strong>Expedido el:</strong> {new Date(resultadoBusqueda.fechaExpedicion).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            <p><strong>Vencimiento el:</strong> {new Date(resultadoBusqueda.fechaVencimiento).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            <p className="status-label">
                                <strong>Estado:</strong>
                                <span className={`status-text ${resultadoBusqueda.estadoVigencia ? resultadoBusqueda.estadoVigencia.toLowerCase() : ''}`}>
                                    {resultadoBusqueda.estadoVigencia}
                                </span>
                            </p>
                            {resultadoBusqueda.estadoVigencia === 'Vencido' && (
                                <p className="action-required-message">Su certificado se encuentra VENCIDO. Por favor, comuníquese con nosotros para iniciar el proceso de renovación.</p>
                            )}
                            {resultadoBusqueda.estadoVigencia === 'Vigente' && (
                                <button
                                    onClick={() => generarPDF(resultadoBusqueda)}
                                    className="download-pdf-button"
                                >
                                    Descargar Certificado PDF
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Consulta;
