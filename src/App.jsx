import { Route, Routes } from "react-router-dom";

import RutaProtegida from "./components/RutaProtegida.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

import CategoriasPage from "./pages/CategoriasPage.jsx";
import InicioPage from "./pages/InicioPage.jsx";
import LibrosPage from "./pages/LibrosPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrestamosPage from "./pages/PrestamosPage.jsx";
import UsuariosPage from "./pages/UsuariosPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <RutaProtegida>
            <MainLayout />
          </RutaProtegida>
        }
      >
        <Route path="/" element={<InicioPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/libros" element={<LibrosPage />} />
        <Route path="/prestamos" element={<PrestamosPage />} />
      </Route>
    </Routes>
  );
}

export default App;