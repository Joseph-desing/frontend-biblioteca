import { useEffect, useState } from "react";
import { FiUsers, FiTag, FiBook, FiRepeat, FiArrowUpRight, FiBookOpen } from "react-icons/fi";
import { obtenerUsuarios } from "../services/usuarioService.js";
import { obtenerCategorias } from "../services/categoriaService.js";
import { obtenerLibros } from "../services/libroService.js";
import { obtenerPrestamos } from "../services/prestamoService.js";

function InicioPage() {
  const [totales, setTotales] = useState({ usuarios: 0, categorias: 0, libros: 0, prestamos: 0 });
  const [cargando, setCargando] = useState(true);
  useEffect(() => { async function cargarResumen() { try { const [usuarios, categorias, libros, prestamos] = await Promise.all([obtenerUsuarios(), obtenerCategorias(), obtenerLibros(), obtenerPrestamos()]); setTotales({ usuarios: usuarios?.length || 0, categorias: categorias?.length || 0, libros: libros?.length || 0, prestamos: prestamos?.length || 0 }); } finally { setCargando(false); } } cargarResumen(); }, []);
  const tarjetas = [
    { clave: "usuarios", titulo: "Usuarios", texto: "Personas registradas", icono: FiUsers, color: "blue" },
    { clave: "categorias", titulo: "Categorías", texto: "Colecciones organizadas", icono: FiTag, color: "violet" },
    { clave: "libros", titulo: "Libros", texto: "Títulos en el catálogo", icono: FiBook, color: "green" },
    { clave: "prestamos", titulo: "Préstamos", texto: "Movimientos registrados", icono: FiRepeat, color: "orange" },
  ];
  return <section className="dashboard"><div className="welcome-card"><div><span className="eyebrow eyebrow--light">PANEL GENERAL</span><h2>Bienvenido al Sistema de Gestión de Biblioteca</h2><p>Administra tu catálogo, usuarios y préstamos desde un solo lugar.</p></div><FiBookOpen /></div><div className="section-heading"><div><h3>Resumen general</h3><p>Una vista rápida del estado de tu biblioteca</p></div><span>Actualizado ahora</span></div><div className="stats-grid">{tarjetas.map(({ clave, titulo, texto, icono: Icono, color }) => <article className="stat-card" key={clave}><div className={`stat-card__icon stat-card__icon--${color}`}><Icono /></div><div><p>{titulo}</p><strong>{cargando ? "—" : totales[clave]}</strong><span>{texto}</span></div><FiArrowUpRight className="stat-card__arrow" /></article>)}</div><div className="dashboard-note"><div className="dashboard-note__icon"><FiBookOpen /></div><div><h3>Todo listo para comenzar</h3><p>Utiliza el menú lateral para gestionar los recursos de la biblioteca.</p></div></div></section>;
}
export default InicioPage;
