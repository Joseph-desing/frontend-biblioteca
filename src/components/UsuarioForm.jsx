import { useEffect, useState } from "react";
import { FiUser, FiSave, FiX } from "react-icons/fi";

const formularioInicial = {
  nombre: "",
  correo: "",
  contrasena: "",
};

function UsuarioForm({
  usuarioSeleccionado,
  onGuardar,
  onCancelar,
}) {
  const [formulario, setFormulario] = useState(formularioInicial);

  useEffect(() => {
    if (usuarioSeleccionado) {
      setFormulario({
        nombre: usuarioSeleccionado.nombre || "",
        correo: usuarioSeleccionado.correo || "",
        contrasena: "",
      });
    } else {
      setFormulario(formularioInicial);
    }
  }, [usuarioSeleccionado]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    onGuardar(formulario);

    if (!usuarioSeleccionado) {
      setFormulario(formularioInicial);
    }
  }

  function manejarCancelacion() {
    setFormulario(formularioInicial);
    onCancelar();
  }

  return (
    <form className="form-card" onSubmit={manejarEnvio}>
      <div className="form-card__heading"><span><FiUser /></span><div>
      <h3>
        {usuarioSeleccionado
          ? "Editar usuario"
          : "Registrar usuario"}
      </h3>
      <p>Completa la información del usuario</p></div></div><div className="form-grid">

      <label htmlFor="nombre">Nombre</label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        value={formulario.nombre}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="correo">Correo</label>
      <input
        id="correo"
        name="correo"
        type="email"
        value={formulario.correo}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="contrasena">
        {usuarioSeleccionado
          ? "Nueva contraseña (opcional)"
          : "Contraseña"}
      </label>
      <input
        id="contrasena"
        name="contrasena"
        type="password"
        value={formulario.contrasena}
        onChange={manejarCambio}
        required={!usuarioSeleccionado}
      />
      </div><div className="form-actions"><button className="button button--primary" type="submit"><FiSave />
        {usuarioSeleccionado ? "Actualizar" : "Guardar"}
      </button>

      {usuarioSeleccionado && (
        <button className="button button--secondary" type="button" onClick={manejarCancelacion}><FiX />
          Cancelar
        </button>
      )}</div>
    </form>
  );
}

export default UsuarioForm;
