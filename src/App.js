// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter, Routes y Route
import './App.css'; // Tus estilos específicos de App
import './index.css'; // Tus estilos globales (con los cambios que hicimos)

// Importa tus componentes
import Header from './components/Header';
import Footer from './components/Footer';

// Importa tus páginas
import Inicio from './pages/Inicio';
import Consulta from './pages/Consulta'; // Asegúrate de importar todas tus páginas
import Portafolio from './pages/Portafolio';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Cotizar from './pages/Cotizar';
// Importa Noticias si la renderizas como una ruta o dentro de una página

function App() {
  return (
    // Envuelve toda tu aplicación dentro de BrowserRouter
    <BrowserRouter>
      <div className="App">
        <Header /> {/* El Header va aquí, fuera del main-content-area, pero dentro del BrowserRouter */}

        <main className="main-content-area"> {/* Este contendrá todas tus páginas */}
          {/* Aquí defines tus rutas para cada página */}
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/consulta" element={<Consulta />} />
            <Route path="/portafolio" element={<Portafolio />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/cotizar" element={<Cotizar />} />
            {/* Si Noticias es una página separada, añádela aquí: */}
            {/* <Route path="/noticias" element={<Noticias />} /> */}
            {/* Asegúrate de que todas las rutas que uses en Header.js estén aquí */}
          </Routes>
        </main>

        <Footer /> {/* El Footer también va aquí, fuera del main-content-area, pero dentro del BrowserRouter */}
      </div>
    </BrowserRouter>
  );
}

export default App;