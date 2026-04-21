import { env } from "../config/env";
import { apiFetch } from "./apiClient";

const resolverUrlImagen = (url) => {
    if (!url) return null;
    if (url.startsWith('/uploads')) {
        // Usar la URL base sin el sufijo /zonas
        const baseUrl = env.API_BASE_URL.replace('/zonas', '');
        return `${baseUrl}${url}`;
    }
    // Para URLs externas o inválidas, devolver null para no mostrar
    return null;
};

/**
 * Verifica si una URL de imagen es válida.
 */
export const verificarImagen = (url) =>
    new Promise((resolve) => {
        if (!url) return resolve(null);
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(null);
        img.src = url;
    });

/**
 * Agrega la propiedad position si no existe.
 */
export const normalizarZona = (zona) => ({
    ...zona,
    position: zona.position || (zona.lat != null && zona.lng != null ? [zona.lat, zona.lng] : null),
});

/**
 * Obtiene todas las zonas desde el backend.
 */
export const obtenerZonas = async () => {
    const respuesta = await apiFetch(env.API_BASE_URL);
    if (!respuesta.ok) throw new Error(`Error al obtener zonas: ${respuesta.status}`);

    const datos = await respuesta.json();

    if (datos.ok && Array.isArray(datos.zonas)) {
        const zonasVerificadas = await Promise.all(
            datos.zonas.map(async (zona) => {
                const fotoUrl = resolverUrlImagen(zona.foto);
                const fotoValida = await verificarImagen(fotoUrl);
                return normalizarZona({ ...zona, foto: fotoValida || fotoUrl });
            })
        );
        return zonasVerificadas;
    }
    return [];
};

/**
 * Crea una nueva zona.
 */
export const crearZona = async (datosZona) => {
    const respuesta = await apiFetch(env.API_BASE_URL, {
        method: "POST",
        body: JSON.stringify(datosZona),
    });
    if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.error || `Al crear zona: ${respuesta.status}`);
    }
    return respuesta.json();
};

/**
 * Actualiza una zona existente.
 */
export const actualizarZona = async (id, datosZona) => {
    const respuesta = await apiFetch(`${env.API_BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(datosZona),
    });
    if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.error || `Error al actualizar zona: ${respuesta.status}`);
    }
    return respuesta.json();
};

/**
 * Elimina una zona.
 */
export const eliminarZona = async (id) => {
    const respuesta = await apiFetch(`${env.API_BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!respuesta.ok) throw new Error(`Error al eliminar zona: ${respuesta.status}`);
    return respuesta.json();
};
