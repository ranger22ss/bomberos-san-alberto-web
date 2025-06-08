// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus componentes (asegúrate que las rutas sean correctas)
import Header from './components/Header'; // Ruta actualizada al componente Header
import Noticias from './components/Noticias';    // Ruta a tu componente Noticias
import Footer from './components/Footer'; // Importa el nuevo componente Footer

// Importa tus páginas
import Inicio from './pages/Inicio';
import Consulta from './pages/Consulta';
import Portafolio from './pages/Portafolio';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Cotizar from './pages/Cotizar';

// Importa tu archivo CSS global donde está .main-content-area y tus variables
import './index.css';

function App() {
  return (
    <Router>
      <Header /> {/* El Header fijo */}

      {/* ESTE ES EL CONTENEDOR PRINCIPAL QUE SOLUCIONA EL SOLAPAMIENTO */}
      {/* Todo el contenido que NO sea el Header o Footer debe ir aquí dentro */}
      <main className="main-content-area">
        {/* Aquí insertamos Noticias, ahora estará debajo del padding-top */}
        <Noticias /> 

        {/* Las Rutas para el contenido de tus páginas */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/consulta" element={<Consulta />} />
          <Route path="/portafolio" element={<Portafolio />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/cotizar" element={<Cotizar />} />
        </Routes>
      </main>

      <Footer /> {/* El Footer al final del body */}
    </Router>
  );
}

export default App;