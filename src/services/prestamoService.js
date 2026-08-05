const API_URL = `${import.meta.env.VITE_API_URL}/prestamos`;
export async function obtenerPrestamos() {
  const respuesta = await fetch(API_URL);
  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al obtener los préstamos."
    );
  }

  return resultado.data || [];
}

export async function crearPrestamo(prestamo) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prestamo),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al crear el préstamo."
    );
  }

  return resultado;
}

export async function actualizarPrestamo(id, prestamo) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prestamo),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al actualizar el préstamo."
    );
  }

  return resultado;
}

export async function eliminarPrestamo(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al eliminar el préstamo."
    );
  }

  return resultado;
}