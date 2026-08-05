import { useEffect, useState } from "react";
import { FiTag, FiSave, FiX } from "react-icons/fi";

const formularioInicial = {
  nombre: "",
  descripcion: "",
  estado: "ACTIVA",
};

function CategoriaForm({
  categoriaSeleccionada,
  onGuardar,
  onCancelar,
}) {
  const [formulario, setFormulario] = useState(formularioInicial);

  useEffect(() => {
    if (categoriaSeleccionada) {
      setFormulario({
        nombre: categoriaSeleccionada.nombre || "",
        descripcion: categoriaSeleccionada.descripcion || "",
        estado: categoriaSeleccionada.estado || "ACTIVA",
      });
    } else {
      setFormulario(formularioInicial);
    }
  }, [categoriaSeleccionada]);

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

    if (!categoriaSeleccionada) {
      setFormulario(formularioInicial);
    }
  }

  function manejarCancelacion() {
    setFormulario(formularioInicial);
    onCancelar();
  }

  return (
    <form className="form-card" onSubmit={manejarEnvio}><div className="form-card__heading"><span><FiTag /></span><div>
      <h3>
        {categoriaSeleccionada
          ? "Editar categoría"
          : "Registrar categoría"}
      </h3>
      <p>Define y organiza las colecciones</p></div></div><div className="form-grid">

      <label htmlFor="nombre">Nombre</label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        value={formulario.nombre}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="descripcion">Descripción</label>
      <input
        id="descripcion"
        name="descripcion"
        type="text"
        value={formulario.descripcion}
        onChange={manejarCambio}
      />

      <label htmlFor="estado">Estado</label>
      <select
        id="estado"
        name="estado"
        value={formulario.estado}
        onChange={manejarCambio}
        required
      >
        <option value="ACTIVA">ACTIVA</option>
        <option value="INACTIVA">INACTIVA</option>
      </select>
      </div><div className="form-actions"><button className="button button--primary" type="submit"><FiSave />
        {categoriaSeleccionada ? "Actualizar" : "Guardar"}
      </button>

      {categoriaSeleccionada && (
        <button className="button button--secondary" type="button" onClick={manejarCancelacion}><FiX />
          Cancelar
        </button>
      )}</div>
    </form>
  );
}

export default CategoriaForm;
