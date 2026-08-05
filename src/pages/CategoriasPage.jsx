import { useEffect, useState } from "react";

import CategoriaForm from "../components/CategoriaForm.jsx";
import CategoriaTable from "../components/CategoriaTable.jsx";

import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  obtenerCategorias,
} from "../services/categoriaService.js";

function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState(null);

  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function cargarCategorias() {
    try {
      setCargando(true);
      setError("");

      const datos = await obtenerCategorias();
      setCategorias(datos || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarCategorias();
  }, []);

  async function guardarCategoria(formulario) {
    try {
      setMensaje("");
      setError("");

      if (categoriaSeleccionada) {
        const resultado = await actualizarCategoria(
          categoriaSeleccionada.id,
          formulario
        );

        setMensaje(
          resultado.message ||
            "Categoría actualizada correctamente."
        );
      } else {
        const resultado = await crearCategoria(formulario);

        setMensaje(
          resultado.message ||
            "Categoría creada correctamente."
        );
      }

      setCategoriaSeleccionada(null);
      await cargarCategorias();
    } catch (error) {
      setError(error.message);
    }
  }

  function editarCategoria(categoria) {
    setMensaje("");
    setError("");
    setCategoriaSeleccionada(categoria);
  }

  function cancelarEdicion() {
    setCategoriaSeleccionada(null);
  }

  async function borrarCategoria(id) {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar esta categoría?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setMensaje("");
      setError("");

      const resultado = await eliminarCategoria(id);

      setMensaje(
        resultado.message ||
          "Categoría eliminada correctamente."
      );

      if (categoriaSeleccionada?.id === id) {
        setCategoriaSeleccionada(null);
      }

      await cargarCategorias();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section>
      <h2>Categorías</h2>

      <CategoriaForm
        categoriaSeleccionada={categoriaSeleccionada}
        onGuardar={guardarCategoria}
        onCancelar={cancelarEdicion}
      />

      {mensaje && <p className="mensaje-exito">{mensaje}</p>}
      {error && <p className="mensaje-error">{error}</p>}

      {cargando ? (
        <p>Cargando categorías...</p>
      ) : (
        <CategoriaTable
          categorias={categorias}
          onEditar={editarCategoria}
          onEliminar={borrarCategoria}
        />
      )}
    </section>
  );
}

export default CategoriasPage;