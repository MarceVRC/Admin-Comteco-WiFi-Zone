import { env } from "../config/env";
import { apiFetch } from "./apiClient";

const ADS_URL = env.ADS_API_URL;

export const crearAd = async ({ image_url, redirect_url }) => {
  const respuesta = await apiFetch(ADS_URL, {
    method: "POST",
    body: JSON.stringify({ image_url, redirect_url }),
  });

  const datos = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    throw new Error(datos.message || datos.error || `Error al crear anuncio: ${respuesta.status}`);
  }

  return datos;
};

export const obtenerAds = async () => {
  const respuesta = await apiFetch(ADS_URL);

  const datos = await respuesta.json().catch(() => ([]));

  if (!respuesta.ok) {
    throw new Error(datos.message || datos.error || `Error al obtener anuncios: ${respuesta.status}`);
  }

  return datos;
};

export const cambiarOrdenAd = async (id, direccion) => {
  const respuesta = await apiFetch(`${ADS_URL}/${id}/order/${direccion}`, {
    method: "PUT",
  });

  const datos = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    throw new Error(datos.message || datos.error || `Error al cambiar orden: ${respuesta.status}`);
  }

  return datos;
};

export const eliminarAd = async (id) => {
  const respuesta = await apiFetch(`${ADS_URL}/${id}`, {
    method: "DELETE",
  });

  if (!respuesta.ok) {
    let datos = {};
    try {
      datos = await respuesta.json();
    } catch {}
    throw new Error(datos.message || datos.error || `Error al eliminar anuncio: ${respuesta.status}`);
  }

  return true;
};