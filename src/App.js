// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; // Tus estilos específicos de App
import './index.css'; // Tus estilos globales

// Importar componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Noticias from './components/Noticias'; // Asegúrate de que Noticias esté importado

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
        <Header /> {/* El Header se mantiene fijo en la parte superior */}

        {/* Nuevo contenedor para el contenido principal y la barra lateral de noticias */}
        <div className="content-and-sidebar-wrapper">
          {/* El área principal donde se renderizan las páginas (Inicio, Consulta, etc.) */}
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

          {/* La barra lateral para Noticias */}
          <aside className="noticias-sidebar">
            <Noticias /> {/* ¡El componente de Noticias se renderiza aquí! */}
          </aside>
        </div>

        <Footer /> {/* El Footer se mantiene en la parte inferior */}
      </div>
    </BrowserRouter>
  );
}

export default App;
