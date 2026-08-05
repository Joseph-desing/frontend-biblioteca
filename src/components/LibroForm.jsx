import { useEffect, useState } from "react";
import { FiBook, FiSave, FiX } from "react-icons/fi";

const formularioInicial = {
  titulo: "",
  autor: "",
  isbn: "",
  categoria_id: "",
  stock: "",
  estado: "DISPONIBLE",
};

function LibroForm({
  libroSeleccionado,
  categorias,
  onGuardar,
  onCancelar,
}) {
  const [formulario, setFormulario] = useState(formularioInicial);

  useEffect(() => {
    if (libroSeleccionado) {
      setFormulario({
        titulo: libroSeleccionado.titulo || "",
        autor: libroSeleccionado.autor || "",
        isbn: libroSeleccionado.isbn || "",
        categoria_id:
          libroSeleccionado.categoria_id?.toString() || "",
        stock: libroSeleccionado.stock ?? "",
        estado: libroSeleccionado.estado || "DISPONIBLE",
      });
    } else {
      setFormulario(formularioInicial);
    }
  }, [libroSeleccionado]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    onGuardar({
      ...formulario,
      categoria_id: Number(formulario.categoria_id),
      stock: Number(formulario.stock),
    });

    if (!libroSeleccionado) {
      setFormulario(formularioInicial);
    }
  }

  function manejarCancelacion() {
    setFormulario(formularioInicial);
    onCancelar();
  }

  const categoriasActivas = categorias.filter(
    (categoria) =>
      categoria.estado === "ACTIVA" ||
      categoria.id === libroSeleccionado?.categoria_id
  );

  return (
    <form className="form-card" onSubmit={manejarEnvio}><div className="form-card__heading"><span><FiBook /></span><div>
      <h3>
        {libroSeleccionado
          ? "Editar libro"
          : "Registrar libro"}
      </h3>
      <p>Registra los datos del ejemplar</p></div></div><div className="form-grid">

      <label htmlFor="titulo">Título</label>
      <input
        id="titulo"
        name="titulo"
        type="text"
        value={formulario.titulo}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="autor">Autor</label>
      <input
        id="autor"
        name="autor"
        type="text"
        value={formulario.autor}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="isbn">ISBN</label>
      <input
        id="isbn"
        name="isbn"
        type="text"
        value={formulario.isbn}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="categoria_id">Categoría</label>
      <select
        id="categoria_id"
        name="categoria_id"
        value={formulario.categoria_id}
        onChange={manejarCambio}
        required
      >
        <option value="">Seleccione una categoría</option>

        {categoriasActivas.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        ))}
      </select>

      <label htmlFor="stock">Stock</label>
      <input
        id="stock"
        name="stock"
        type="number"
        min="0"
        value={formulario.stock}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="estado">Estado</label>
      <select
        id="estado"
        name="estado"
        value={formulario.estado}
        onChange={manejarCambio}
        required
      >
        <option value="DISPONIBLE">DISPONIBLE</option>
        <option value="AGOTADO">AGOTADO</option>
        <option value="INACTIVO">INACTIVO</option>
      </select>
      </div><div className="form-actions"><button className="button button--primary" type="submit"><FiSave />
        {libroSeleccionado ? "Actualizar" : "Guardar"}
      </button>

      {libroSeleccionado && (
        <button className="button button--secondary" type="button" onClick={manejarCancelacion}><FiX />
          Cancelar
        </button>
      )}</div>
    </form>
  );
}

export default LibroForm;
