// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; // Tus estilos específicos de App
import './index.css'; // Tus estilos globales

// Importar componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Noticias from './components/Noticias';
import EmergencyButton from './components/EmergencyButton'; // ¡Importar el nuevo componente!

// Importar páginas
import Inicio from './pages/Inicio';
import Consulta from './pages/Consulta';
import Portafolio from './pages/Portafolio';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Cotizar from './pages/Cotizar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

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

          <aside className="noticias-sidebar">
            <Noticias />
          </aside>
        </div>

        <Footer />

        {/* ¡Renderizar el botón de emergencia aquí! */}
        <EmergencyButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
