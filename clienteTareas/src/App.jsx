import React from "react";
import { Route, Routes } from "react-router-dom";
import TareasPages from "./pages/TareasPages";
import TareasFormulario from "./pages/TareasFormulario";
import NotFound from "./pages/NotFound";
import Navbar from "./componentes/Navbar";
import { TareasContextoProvider } from "./contexto/TareasProvider";

function App() {
  
  return (
    <div className="bg-zinc-300 h-screen">
      <Navbar />
    <div className="container mx-auto py-4 px-20">
    <TareasContextoProvider>
      
      <Routes>
        <Route path="/" element={<TareasPages />} />
        <Route path="/new" element={<TareasFormulario />} />
        <Route path="/edit/:id" element={<TareasFormulario />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </TareasContextoProvider>
    </div>
    </div>
  );
}

export default App;
