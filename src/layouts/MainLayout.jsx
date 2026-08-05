import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiBookOpen, FiGrid, FiUsers, FiTag, FiBook, FiRepeat, FiLogOut, FiMenu, FiX, FiChevronRight } from "react-icons/fi";

const enlaces = [
  { to: "/", texto: "Inicio", icono: FiGrid },
  { to: "/usuarios", texto: "Usuarios", icono: FiUsers },
  { to: "/categorias", texto: "Categorías", icono: FiTag },
  { to: "/libros", texto: "Libros", icono: FiBook },
  { to: "/prestamos", texto: "Préstamos", icono: FiRepeat },
];

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const paginaActual = enlaces.find((enlace) => enlace.to === location.pathname)?.texto || "Biblioteca";

  function cerrarSesion() {
    localStorage.removeItem("usuario");
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuAbierto ? "sidebar--open" : ""}`}>
        <div className="brand"><span className="brand__icon"><FiBookOpen /></span><span><strong>Biblioteca</strong><small>Panel de gestión</small></span></div>
        <button className="sidebar__close" type="button" onClick={() => setMenuAbierto(false)} aria-label="Cerrar menú"><FiX /></button>
        <nav className="sidebar__nav" aria-label="Navegación principal">
          <span className="sidebar__label">MENÚ PRINCIPAL</span>
          {enlaces.map(({ to, texto, icono: Icono }) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setMenuAbierto(false)} className={({ isActive }) => `nav-item ${isActive ? "nav-item--active" : ""}`}>
              <Icono /><span>{texto}</span><FiChevronRight className="nav-item__arrow" />
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__footer"><div className="user-mini"><span>{usuario?.nombre?.charAt(0)?.toUpperCase() || "U"}</span><div><strong>{usuario?.nombre || "Usuario"}</strong><small>{usuario?.correo || "Sesión activa"}</small></div></div></div>
      </aside>
      {menuAbierto && <button className="sidebar-overlay" aria-label="Cerrar menú" onClick={() => setMenuAbierto(false)} />}
      <div className="app-main">
        <header className="topbar">
          <div className="topbar__title"><button type="button" className="menu-toggle" onClick={() => setMenuAbierto(true)} aria-label="Abrir menú"><FiMenu /></button><div><span>Panel administrativo</span><h1>{paginaActual}</h1></div></div>
          <div className="topbar__actions"><div className="topbar__user"><span className="avatar">{usuario?.nombre?.charAt(0)?.toUpperCase() || "U"}</span><div><strong>{usuario?.nombre || "Usuario"}</strong><small>Administrador</small></div></div><button className="logout-button" type="button" onClick={cerrarSesion}><FiLogOut /><span>Cerrar sesión</span></button></div>
        </header>
        <main className="content"><Outlet /></main>
      </div>
    </div>
  );
}

export default MainLayout;
