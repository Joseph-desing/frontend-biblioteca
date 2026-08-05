import { useEffect, useState } from "react";

import PrestamoForm from "../components/PrestamoForm.jsx";
import PrestamoTable from "../components/PrestamoTable.jsx";

import { obtenerLibros } from "../services/libroService.js";
import { obtenerUsuarios } from "../services/usuarioService.js";

import {
  actualizarPrestamo,
  crearPrestamo,
  eliminarPrestamo,
  obtenerPrestamos,
} from "../services/prestamoService.js";

function PrestamosPage() {
  const [prestamos, setPrestamos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);

  const [prestamoSeleccionado, setPrestamoSeleccionado] =
    useState(null);

  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function cargarDatos() {
    try {
      setCargando(true);
      setError("");

      const [
        datosPrestamos,
        datosUsuarios,
        datosLibros,
      ] = await Promise.all([
        obtenerPrestamos(),
        obtenerUsuarios(),
        obtenerLibros(),
      ]);

      setPrestamos(datosPrestamos || []);
      setUsuarios(datosUsuarios || []);
      setLibros(datosLibros || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  async function guardarPrestamo(formulario) {
    try {
      setMensaje("");
      setError("");

      if (prestamoSeleccionado) {
        const resultado = await actualizarPrestamo(
          prestamoSeleccionado.id,
          formulario
        );

        setMensaje(
          resultado.message ||
            "Préstamo actualizado correctamente."
        );
      } else {
        const resultado = await crearPrestamo(formulario);

        setMensaje(
          resultado.message ||
            "Préstamo creado correctamente."
        );
      }

      setPrestamoSeleccionado(null);
      await cargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  function editarPrestamo(prestamo) {
    setMensaje("");
    setError("");
    setPrestamoSeleccionado(prestamo);
  }

  function cancelarEdicion() {
    setPrestamoSeleccionado(null);
  }

  async function borrarPrestamo(id) {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este préstamo?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setMensaje("");
      setError("");

      const resultado = await eliminarPrestamo(id);

      setMensaje(
        resultado.message ||
          "Préstamo eliminado correctamente."
      );

      if (prestamoSeleccionado?.id === id) {
        setPrestamoSeleccionado(null);
      }

      await cargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section>
      <h2>Préstamos</h2>

      <PrestamoForm
        prestamoSeleccionado={prestamoSeleccionado}
        usuarios={usuarios}
        libros={libros}
        onGuardar={guardarPrestamo}
        onCancelar={cancelarEdicion}
      />

      {mensaje && <p className="mensaje-exito">{mensaje}</p>}
      {error && <p className="mensaje-error">{error}</p>}

      {cargando ? (
        <p>Cargando préstamos...</p>
      ) : (
        <PrestamoTable
          prestamos={prestamos}
          onEditar={editarPrestamo}
          onEliminar={borrarPrestamo}
        />
      )}
    </section>
  );
}

export default PrestamosPage;