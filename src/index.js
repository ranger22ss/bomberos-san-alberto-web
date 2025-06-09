// src/App.js
import React from 'react';
import './App.css'; // Tus estilos específicos de App
import './index.css'; // Importa tus estilos globales

// Importa tus componentes (Header, Footer, Páginas, etc.)
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio'; // Ejemplo de una página

function App() {
  return (
    <div className="App"> {/* Este es el contenedor principal de tu App */}
      <Header /> {/* Tu componente de encabezado */}
      <main className="main-content-area"> {/* Contenedor principal de contenido */}
        {/* Aquí irán tus diferentes páginas/componentes */}
        <Inicio /> {/* Por ejemplo, tu página de inicio */}
        {/* <Noticias /> si lo renderizas directamente aquí, o dentro de tus páginas */}
      </main>
      <Footer /> {/* Tu componente de pie de página */}
    </div>
  );
}

export default App;