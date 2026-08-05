const API_URL = "http://127.0.0.1:5000/api/login";

export async function iniciarSesion(credenciales) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credenciales),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "No se pudo iniciar sesión."
    );
  }

  return resultado;
}