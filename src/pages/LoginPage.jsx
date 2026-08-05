import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiMail, FiLock, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import { iniciarSesion } from "../services/authService.js";

function LoginPage() {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({ correo: "", contrasena: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  function manejarCambio(evento) { const { name, value } = evento.target; setFormulario((anterior) => ({ ...anterior, [name]: value })); }
  async function manejarEnvio(evento) {
    evento.preventDefault();
    try { setCargando(true); setError(""); const resultado = await iniciarSesion(formulario); localStorage.setItem("usuario", JSON.stringify(resultado.data)); navigate("/"); }
    catch (error) { setError(error.message); } finally { setCargando(false); }
  }
  return (
    <div className="login-container">
      <div className="login-orb login-orb--one" /><div className="login-orb login-orb--two" />
      <div className="login-intro"><span className="login-intro__icon"><FiBookOpen /></span><p>Organiza. Administra. Inspira.</p><h1>El conocimiento,<br />siempre a tu alcance.</h1><span>Una plataforma moderna para gestionar tu biblioteca de forma simple y eficiente.</span></div>
      <form className="login-card" onSubmit={manejarEnvio}>
        <div className="login-card__logo"><FiBookOpen /></div><p className="eyebrow">BIENVENIDO</p><h2>Sistema de Biblioteca</h2><p className="login-card__subtitle">Ingresa tus credenciales para acceder al panel</p>
        <label htmlFor="correo">Correo electrónico</label><div className="input-icon"><FiMail /><input id="correo" name="correo" type="email" placeholder="nombre@correo.com" value={formulario.correo} onChange={manejarCambio} required /></div>
        <label htmlFor="contrasena">Contraseña</label><div className="input-icon"><FiLock /><input id="contrasena" name="contrasena" type="password" placeholder="Ingresa tu contraseña" value={formulario.contrasena} onChange={manejarCambio} required /></div>
        {error && <p className="mensaje-error"><FiAlertCircle />{error}</p>}
        <button className="login-button" type="submit" disabled={cargando}>{cargando ? <><span className="spinner spinner--light" /> Ingresando...</> : <>Ingresar al sistema <FiArrowRight /></>}</button>
        <p className="login-footer">Sistema de Gestión de Biblioteca · 2026</p>
      </form>
    </div>
  );
}
export default LoginPage;
