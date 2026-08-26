// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';

// Importar componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Noticias from './components/Noticias';
import EmergencyButton from './components/EmergencyButton';
import Chatbot from './components/Chatbot';
import Navbar from './components/navbar';

// Importar páginas
import Inicio from './pages/Inicio';
import Consulta from './pages/Consulta';
import Portafolio from './pages/Portafolio';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Cotizar from './pages/Cotizar';
import GestionInterna from './pages/GestionInterna';

function AppContent() {
  const location = useLocation();

  if (location.pathname.startsWith('/gestion-interna')) {
    return <GestionInterna />;
  }

  return (
    <div className="App">
        {/* 🔝 Barra de navegación principal */}
        <Navbar />

        {/* Encabezado institucional */}
        <Header />

        {/* Contenido principal + barra lateral */}
        <div className="content-and-sidebar-wrapper">
          <main className="main-content-area">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/consulta" element={<Consulta />} />
              <Route path="/portafolio" element={<Portafolio />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/cotizar" element={<Cotizar />} />
            </Routes>
          </main>

          {/* Noticias / barra lateral */}
          <aside className="noticias-sidebar">
            <Noticias />
          </aside>
        </div>

        {/* Pie de página */}
        <Footer />

        {/* Botón de emergencia y Chatbot */}
        <EmergencyButton />
        <Chatbot />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
