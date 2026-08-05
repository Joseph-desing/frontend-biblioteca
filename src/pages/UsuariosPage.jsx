import { useEffect, useState } from "react";

import UsuarioForm from "../components/UsuarioForm.jsx";
import UsuarioTable from "../components/UsuarioTable.jsx";

import {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
  obtenerUsuarios,
} from "../services/usuarioService.js";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] =
    useState(null);

  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function cargarUsuarios() {
    try {
      setCargando(true);
      setError("");

      const datos = await obtenerUsuarios();
      setUsuarios(datos || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function guardarUsuario(formulario) {
    try {
      setMensaje("");
      setError("");

      if (usuarioSeleccionado) {
        const datosActualizar = { ...formulario };

        if (!datosActualizar.contrasena) {
          delete datosActualizar.contrasena;
        }

        const resultado = await actualizarUsuario(
          usuarioSeleccionado.id,
          datosActualizar
        );

        setMensaje(
          resultado.message ||
            "Usuario actualizado correctamente."
        );
      } else {
        const resultado = await crearUsuario(formulario);

        setMensaje(
          resultado.message ||
            "Usuario creado correctamente."
        );
      }

      setUsuarioSeleccionado(null);
      await cargarUsuarios();
    } catch (error) {
      setError(error.message);
    }
  }

  function editarUsuario(usuario) {
    setMensaje("");
    setError("");
    setUsuarioSeleccionado(usuario);
  }

  function cancelarEdicion() {
    setUsuarioSeleccionado(null);
  }

  async function borrarUsuario(id) {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este usuario?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setMensaje("");
      setError("");

      const resultado = await eliminarUsuario(id);

      setMensaje(
        resultado.message ||
          "Usuario eliminado correctamente."
      );

      if (usuarioSeleccionado?.id === id) {
        setUsuarioSeleccionado(null);
      }

      await cargarUsuarios();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section>
      <h2>Usuarios</h2>

      <UsuarioForm
        usuarioSeleccionado={usuarioSeleccionado}
        onGuardar={guardarUsuario}
        onCancelar={cancelarEdicion}
      />

      {mensaje && (
        <p className="mensaje-exito">{mensaje}</p>
      )}

      {error && (
        <p className="mensaje-error">{error}</p>
      )}

      {cargando ? (
        <p className="loading-state"><span className="spinner" />Cargando usuarios...</p>
      ) : (
        <UsuarioTable
          usuarios={usuarios}
          onEditar={editarUsuario}
          onEliminar={borrarUsuario}
        />
      )}
    </section>
  );
}

export default UsuariosPage;
