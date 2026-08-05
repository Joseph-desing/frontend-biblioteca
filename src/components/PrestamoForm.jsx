import { useEffect, useState } from "react";
import { FiRepeat, FiSave, FiX } from "react-icons/fi";

const formularioInicial = {
  usuario_id: "",
  libro_id: "",
  fecha_prestamo: "",
  fecha_devolucion: "",
  estado: "PRESTADO",
  observaciones: "",
};

function PrestamoForm({
  prestamoSeleccionado,
  usuarios,
  libros,
  onGuardar,
  onCancelar,
}) {
  const [formulario, setFormulario] = useState(formularioInicial);

  useEffect(() => {
    if (prestamoSeleccionado) {
      setFormulario({
        usuario_id:
          prestamoSeleccionado.usuario_id?.toString() || "",
        libro_id:
          prestamoSeleccionado.libro_id?.toString() || "",
        fecha_prestamo:
          prestamoSeleccionado.fecha_prestamo || "",
        fecha_devolucion:
          prestamoSeleccionado.fecha_devolucion || "",
        estado:
          prestamoSeleccionado.estado || "PRESTADO",
        observaciones:
          prestamoSeleccionado.observaciones || "",
      });
    } else {
      setFormulario(formularioInicial);
    }
  }, [prestamoSeleccionado]);

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
      usuario_id: Number(formulario.usuario_id),
      libro_id: Number(formulario.libro_id),
    });

    if (!prestamoSeleccionado) {
      setFormulario(formularioInicial);
    }
  }

  function manejarCancelacion() {
    setFormulario(formularioInicial);
    onCancelar();
  }

  const librosDisponibles = libros.filter(
    (libro) =>
      (
        libro.estado === "DISPONIBLE" &&
        Number(libro.stock) > 0
      ) ||
      libro.id === prestamoSeleccionado?.libro_id
  );

  return (
    <form className="form-card" onSubmit={manejarEnvio}><div className="form-card__heading"><span><FiRepeat /></span><div>
      <h3>
        {prestamoSeleccionado
          ? "Editar préstamo"
          : "Registrar préstamo"}
      </h3>
      <p>Gestiona la entrega y devolución</p></div></div><div className="form-grid">

      <label htmlFor="usuario_id">Usuario</label>
      <select
        id="usuario_id"
        name="usuario_id"
        value={formulario.usuario_id}
        onChange={manejarCambio}
        required
      >
        <option value="">Seleccione un usuario</option>

        {usuarios.map((usuario) => (
          <option key={usuario.id} value={usuario.id}>
            {usuario.nombre} - {usuario.correo}
          </option>
        ))}
      </select>

      <label htmlFor="libro_id">Libro</label>
      <select
        id="libro_id"
        name="libro_id"
        value={formulario.libro_id}
        onChange={manejarCambio}
        required
      >
        <option value="">Seleccione un libro</option>

        {librosDisponibles.map((libro) => (
          <option key={libro.id} value={libro.id}>
            {libro.titulo} - {libro.autor} - Stock: {libro.stock}
          </option>
        ))}
      </select>

      <label htmlFor="fecha_prestamo">
        Fecha del préstamo
      </label>
      <input
        id="fecha_prestamo"
        name="fecha_prestamo"
        type="date"
        value={formulario.fecha_prestamo}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="fecha_devolucion">
        Fecha de devolución
      </label>
      <input
        id="fecha_devolucion"
        name="fecha_devolucion"
        type="date"
        value={formulario.fecha_devolucion}
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
        <option value="PRESTADO">PRESTADO</option>
        <option value="DEVUELTO">DEVUELTO</option>
        <option value="ATRASADO">ATRASADO</option>
        <option value="CANCELADO">CANCELADO</option>
      </select>

      <label htmlFor="observaciones">Observaciones</label>
      <textarea
        id="observaciones"
        name="observaciones"
        rows="4"
        value={formulario.observaciones}
        onChange={manejarCambio}
      />
      </div><div className="form-actions"><button className="button button--primary" type="submit"><FiSave />
        {prestamoSeleccionado ? "Actualizar" : "Guardar"}
      </button>

      {prestamoSeleccionado && (
        <button className="button button--secondary" type="button" onClick={manejarCancelacion}><FiX />
          Cancelar
        </button>
      )}</div>
    </form>
  );
}

export default PrestamoForm;
