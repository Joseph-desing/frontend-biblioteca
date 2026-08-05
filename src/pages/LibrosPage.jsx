import { useEffect, useState } from "react";

import LibroForm from "../components/LibroForm.jsx";
import LibroTable from "../components/LibroTable.jsx";

import { obtenerCategorias } from "../services/categoriaService.js";

import {
  actualizarLibro,
  crearLibro,
  eliminarLibro,
  obtenerLibros,
} from "../services/libroService.js";

function LibrosPage() {
  const [libros, setLibros] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [libroSeleccionado, setLibroSeleccionado] =
    useState(null);

  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function cargarDatos() {
    try {
      setCargando(true);
      setError("");

      const [datosLibros, datosCategorias] =
        await Promise.all([
          obtenerLibros(),
          obtenerCategorias(),
        ]);

      setLibros(datosLibros || []);
      setCategorias(datosCategorias || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  async function guardarLibro(formulario) {
    try {
      setMensaje("");
      setError("");

      if (libroSeleccionado) {
        const resultado = await actualizarLibro(
          libroSeleccionado.id,
          formulario
        );

        setMensaje(
          resultado.message ||
            "Libro actualizado correctamente."
        );
      } else {
        const resultado = await crearLibro(formulario);

        setMensaje(
          resultado.message ||
            "Libro creado correctamente."
        );
      }

      setLibroSeleccionado(null);
      await cargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  function editarLibro(libro) {
    setMensaje("");
    setError("");
    setLibroSeleccionado(libro);
  }

  function cancelarEdicion() {
    setLibroSeleccionado(null);
  }

  async function borrarLibro(id) {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este libro?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setMensaje("");
      setError("");

      const resultado = await eliminarLibro(id);

      setMensaje(
        resultado.message ||
          "Libro eliminado correctamente."
      );

      if (libroSeleccionado?.id === id) {
        setLibroSeleccionado(null);
      }

      await cargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section>
      <h2>Libros</h2>

      <LibroForm
        libroSeleccionado={libroSeleccionado}
        categorias={categorias}
        onGuardar={guardarLibro}
        onCancelar={cancelarEdicion}
      />

      {mensaje && <p className="mensaje-exito">{mensaje}</p>}
      {error && <p className="mensaje-error">{error}</p>}

      {cargando ? (
        <p className="loading-state"><span className="spinner" />Cargando libros...</p>
      ) : (
        <LibroTable
          libros={libros}
          onEditar={editarLibro}
          onEliminar={borrarLibro}
        />
      )}
    </section>
  );
}

export default LibrosPage;
