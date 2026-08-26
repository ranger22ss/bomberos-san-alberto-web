import React, { useCallback, useEffect, useState } from 'react';
import { Download, FileCheck2, FileText, Flame, LockKeyhole, LogOut, ShieldCheck } from 'lucide-react';
import { esEnlaceAccesoInicial, supabase, supabaseConfigurado } from '../services/supabaseClient';
import { generarConstanciaTramite, generarSolicitudInspeccion } from '../services/documentosInternos';
import './GestionInterna.css';

const estadoInicial = () => ({
  lugar: 'San Alberto, Cesar',
  fechaSolicitud: new Date().toISOString().slice(0, 10),
  solicitante: '',
  cedula: '',
  expedidaEn: '',
  celular: '',
  direccion: '',
  barrio: '',
  municipio: 'San Alberto, Cesar',
  nombreEstablecimiento: '',
  nit: '',
  actividadEconomica: '',
  metrosCuadrados: '',
});

function GestionInterna() {
  const modoVistaPrevia = process.env.NODE_ENV === 'development'
    && new URLSearchParams(window.location.search).get('preview') === '1';
  const [cargandoAcceso, setCargandoAcceso] = useState(!modoVistaPrevia);
  const [sesion, setSesion] = useState(modoVistaPrevia ? { user: { email: 'vista-previa@local' } } : null);
  const [autorizado, setAutorizado] = useState(modoVistaPrevia);
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [nuevaClave, setNuevaClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [requiereNuevaClave, setRequiereNuevaClave] = useState(esEnlaceAccesoInicial);
  const [mensajeAcceso, setMensajeAcceso] = useState('');
  const [datos, setDatos] = useState(estadoInicial);
  const [generando, setGenerando] = useState('');
  const [mensajeDocumento, setMensajeDocumento] = useState('');

  const comprobarAutorizacion = useCallback(async (session) => {
    if (!supabase || !session?.user) {
      setSesion(null);
      setAutorizado(false);
      setCargandoAcceso(false);
      return;
    }

    const { data, error } = await supabase
      .from('web_internal_users')
      .select('display_name, active')
      .eq('user_id', session.user.id)
      .eq('active', true)
      .maybeSingle();

    setSesion(session);
    setAutorizado(!error && Boolean(data));
    setMensajeAcceso(error ? 'No fue posible verificar la autorización. Inténtalo nuevamente.' : '');
    setCargandoAcceso(false);
  }, []);

  useEffect(() => {
    if (modoVistaPrevia) return undefined;
    if (!supabaseConfigurado) {
      setCargandoAcceso(false);
      return undefined;
    }

    supabase.auth.getSession().then(({ data }) => comprobarAutorizacion(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_evento, session) => {
      window.setTimeout(() => comprobarAutorizacion(session), 0);
    });
    return () => listener.subscription.unsubscribe();
  }, [comprobarAutorizacion, modoVistaPrevia]);

  const iniciarSesion = async (event) => {
    event.preventDefault();
    setMensajeAcceso('');
    setCargandoAcceso(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email: correo.trim(), password: clave });
    if (error) {
      setMensajeAcceso('El correo o la contraseña no son correctos.');
      setCargandoAcceso(false);
      return;
    }
    await comprobarAutorizacion(data.session);
  };

  const cerrarSesion = async () => {
    setDatos(estadoInicial());
    setMensajeDocumento('');
    if (supabase) await supabase.auth.signOut();
  };

  const guardarNuevaClave = async (event) => {
    event.preventDefault();
    setMensajeAcceso('');
    if (nuevaClave.length < 8) {
      setMensajeAcceso('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (nuevaClave !== confirmarClave) {
      setMensajeAcceso('Las contraseñas no coinciden.');
      return;
    }

    setCargandoAcceso(true);
    const { error } = await supabase.auth.updateUser({ password: nuevaClave });
    setCargandoAcceso(false);
    if (error) {
      setMensajeAcceso('No fue posible guardar la contraseña. Abre nuevamente el enlace de invitación.');
      return;
    }

    setNuevaClave('');
    setConfirmarClave('');
    setRequiereNuevaClave(false);
    window.history.replaceState({}, '', '/gestion-interna');
  };

  const actualizarDato = ({ target }) => {
    setDatos((actuales) => ({ ...actuales, [target.name]: target.value }));
    setMensajeDocumento('');
  };

  const generar = async (tipo) => {
    setGenerando(tipo);
    setMensajeDocumento('');
    try {
      const codigo = tipo === 'solicitud'
        ? await generarSolicitudInspeccion(datos)
        : await generarConstanciaTramite(datos);
      setMensajeDocumento(`Documento generado correctamente. Código: ${codigo}`);
    } catch (error) {
      console.error(error);
      setMensajeDocumento('No fue posible generar el documento. Revisa los datos e inténtalo nuevamente.');
    } finally {
      setGenerando('');
    }
  };

  const enviarFormulario = (event) => {
    event.preventDefault();
    generar(event.nativeEvent.submitter?.value || 'solicitud');
  };

  if (cargandoAcceso) {
    return <div className="gestion-cargando"><Flame /><span>Verificando acceso institucional…</span></div>;
  }

  if (!supabaseConfigurado && !modoVistaPrevia) {
    return (
      <div className="gestion-acceso-wrapper">
        <div className="gestion-login"><ShieldCheck size={42} /><h1>Configuración pendiente</h1>
          <p>El acceso institucional todavía no está conectado. Configura las variables seguras de Supabase en el alojamiento.</p></div>
      </div>
    );
  }

  if (sesion && autorizado && requiereNuevaClave) {
    return (
      <div className="gestion-acceso-wrapper">
        <form className="gestion-login" onSubmit={guardarNuevaClave}>
          <div className="gestion-login-icon"><LockKeyhole /></div>
          <span className="gestion-eyebrow">Primer ingreso</span>
          <h1>Crea tu contraseña</h1>
          <p>Esta contraseña servirá para ingresar desde cualquier dispositivo.</p>
          {mensajeAcceso && <div className="gestion-alerta error">{mensajeAcceso}</div>}
          <label htmlFor="gestion-nueva-clave">Nueva contraseña</label>
          <input id="gestion-nueva-clave" type="password" minLength="8" value={nuevaClave} onChange={(e) => setNuevaClave(e.target.value)} required autoComplete="new-password" />
          <label htmlFor="gestion-confirmar-clave">Confirmar contraseña</label>
          <input id="gestion-confirmar-clave" type="password" minLength="8" value={confirmarClave} onChange={(e) => setConfirmarClave(e.target.value)} required autoComplete="new-password" />
          <button type="submit"><ShieldCheck size={19} /> Guardar contraseña y continuar</button>
        </form>
      </div>
    );
  }

  if (!sesion || !autorizado) {
    return (
      <div className="gestion-acceso-wrapper">
        <form className="gestion-login" onSubmit={iniciarSesion}>
          <div className="gestion-login-icon"><LockKeyhole /></div>
          <span className="gestion-eyebrow">Área exclusiva CBVSA</span>
          <h1>Gestión documental</h1>
          <p>Ingresa con la cuenta institucional autorizada.</p>
          {sesion && !autorizado && <div className="gestion-alerta error">Esta cuenta no tiene autorización para ingresar.</div>}
          {mensajeAcceso && <div className="gestion-alerta error">{mensajeAcceso}</div>}
          {!sesion && <>
            <label htmlFor="gestion-correo">Correo institucional</label>
            <input id="gestion-correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required autoComplete="username" />
            <label htmlFor="gestion-clave">Contraseña</label>
            <input id="gestion-clave" type="password" value={clave} onChange={(e) => setClave(e.target.value)} required autoComplete="current-password" />
            <button type="submit"><ShieldCheck size={19} /> Ingresar de forma segura</button>
          </>}
          {sesion && <button type="button" className="gestion-secundario" onClick={cerrarSesion}>Cerrar esta cuenta</button>}
          <small>Los datos que diligencies no se guardan en el sistema.</small>
        </form>
      </div>
    );
  }

  return (
    <div className="gestion-interna">
      <header className="gestion-topbar">
        <div><span className="gestion-eyebrow">Portal privado institucional</span><h1>Generador de documentos bomberiles</h1></div>
        <button type="button" onClick={cerrarSesion}><LogOut size={18} /> Cerrar sesión</button>
      </header>

      <main className="gestion-contenido">
        <div className="gestion-aviso"><ShieldCheck /><div><strong>Información temporal y protegida</strong><span>Los datos solo se utilizan para crear los archivos en este dispositivo. Al recargar o cerrar la página se eliminan.</span></div></div>

        <form className="gestion-formulario" onSubmit={enviarFormulario}>
          <section>
            <div className="gestion-seccion-titulo"><FileText /><div><span>Paso 1</span><h2>Datos de la solicitud</h2></div></div>
            <div className="gestion-grid">
              <label><span>Lugar de expedición</span><input name="lugar" value={datos.lugar} onChange={actualizarDato} required /></label>
              <label><span>Fecha</span><input type="date" name="fechaSolicitud" value={datos.fechaSolicitud} onChange={actualizarDato} required /></label>
              <label className="gestion-columna-completa"><span>Nombre completo del solicitante</span><input name="solicitante" value={datos.solicitante} onChange={actualizarDato} required /></label>
              <label><span>Cédula de ciudadanía</span><input name="cedula" value={datos.cedula} onChange={actualizarDato} inputMode="numeric" required /></label>
              <label><span>Expedida en</span><input name="expedidaEn" value={datos.expedidaEn} onChange={actualizarDato} required /></label>
              <label><span>Número celular</span><input name="celular" value={datos.celular} onChange={actualizarDato} inputMode="tel" required /></label>
              <label><span>Municipio</span><input name="municipio" value={datos.municipio} onChange={actualizarDato} required /></label>
            </div>
          </section>

          <section>
            <div className="gestion-seccion-titulo"><FileCheck2 /><div><span>Paso 2</span><h2>Datos del establecimiento</h2></div></div>
            <div className="gestion-grid">
              <label className="gestion-columna-completa"><span>Nombre del establecimiento</span><input name="nombreEstablecimiento" value={datos.nombreEstablecimiento} onChange={actualizarDato} required /></label>
              <label><span>NIT</span><input name="nit" value={datos.nit} onChange={actualizarDato} required /></label>
              <label><span>Actividad económica</span><input name="actividadEconomica" value={datos.actividadEconomica} onChange={actualizarDato} required /></label>
              <label className="gestion-columna-completa"><span>Dirección donde se realizará la visita</span><input name="direccion" value={datos.direccion} onChange={actualizarDato} required /></label>
              <label><span>Barrio</span><input name="barrio" value={datos.barrio} onChange={actualizarDato} required /></label>
              <label><span>Metros cuadrados del establecimiento</span><input type="number" min="1" step="0.01" name="metrosCuadrados" value={datos.metrosCuadrados} onChange={actualizarDato} required /></label>
            </div>
          </section>

          <section className="gestion-generacion">
            <div className="gestion-seccion-titulo"><Download /><div><span>Paso 3</span><h2>Generar documentos</h2></div></div>
            <p>Revisa la información. Cada PDF incluirá membrete institucional, fecha y código único de identificación.</p>
            <div className="gestion-botones">
              <button type="submit" value="solicitud" disabled={Boolean(generando)}><FileText />{generando === 'solicitud' ? 'Generando…' : 'Descargar solicitud'}</button>
              <button type="submit" value="constancia" className="constancia" disabled={Boolean(generando)}><FileCheck2 />{generando === 'constancia' ? 'Generando…' : 'Descargar constancia'}</button>
            </div>
            {mensajeDocumento && <div className="gestion-alerta correcto">{mensajeDocumento}</div>}
          </section>
        </form>
      </main>
    </div>
  );
}

export default GestionInterna;
