// src/App.js (Ejemplo de estructura recomendada)
import React from 'react';
import './App.css'; // Tus estilos específicos de App
import './index.css'; // Tus estilos globales (con los cambios que hicimos)

import Header from './components/Header'; // Asegúrate de que tu Header esté importado
import Footer from './components/Footer'; // Asegúrate de que tu Footer esté importado
import Inicio from './pages/Inicio'; // Por ejemplo, una de tus páginas

function App() {
  return (
    <div className="App">
      <Header /> {/* El Header va aquí, fuera del main-content-area */}
      <main className="main-content-area"> {/* Este contendrá todas tus páginas */}
        {/* Aquí irán tus componentes de página o tu sistema de ruteo */}
        <Inicio />
        {/* <Noticias /> si lo renderizas directamente aquí, o dentro de tus páginas */}
      </main>
      <Footer /> {/* El Footer también va aquí, fuera del main-content-area */}
    </div>
  );
}
export default App;