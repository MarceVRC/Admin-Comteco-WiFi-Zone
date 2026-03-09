import { env } from "../config/env";

/**
 * Verifica si una URL de imagen es válida.
 * @param {string} url - URL de la imagen.
 * @returns {Promise<string|null>} - La URL si es válida, null de lo contrario.
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
 * @param {Object} zona - Objeto de la zona.
 * @returns {Object} - Zona normalizada.
 */
export const normalizarZona = (zona) => ({
    ...zona,
    position: zona.position || (zona.lat != null && zona.lng != null ? [zona.lat, zona.lng] : null),
});

/**
 * Obtiene todas las zonas desde el backend.
 * @returns {Array} - Lista de zonas.
 */
export const obtenerZonas = async () => {
    const respuesta = await fetch(env.API_BASE_URL);
    if (!respuesta.ok) throw new Error(`Error al obtener zonas: ${respuesta.status}`);

    const datos = await respuesta.json();

    if (datos.ok && Array.isArray(datos.zonas)) {
        const zonasVerificadas = await Promise.all(
            datos.zonas.map(async (zona) => {
                const fotoValida = await verificarImagen(zona.foto);
                return normalizarZona({ ...zona, foto: fotoValida });
            })
        );
        return zonasVerificadas;
    }
    return [];
};

/**
 * Crea una nueva zona.
 * @param {Object} datosZona - Datos de la zona a crear.
 * @returns {Object} - Respuesta del servidor.
 */
export const crearZona = async (datosZona) => {
    console.log(`POST a ${env.API_BASE_URL} con:`, datosZona);
    const respuesta = await fetch(env.API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosZona),
    });
    if (!respuesta.ok) {
        const errorData = await respuesta.json();
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || `Al crear zona: ${respuesta.status}`);
    }
    return respuesta.json();
};

/**
 * Actualiza una zona existente.
 * @param {string|number} id - ID de la zona.
 * @param {Object} datosZona - Datos actualizados.
 * @returns {Object} - Respuesta del servidor.
 */
export const actualizarZona = async (id, datosZona) => {
    console.log(`PUT a ${env.API_BASE_URL}/${id} con:`, datosZona);
    const respuesta = await fetch(`${env.API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosZona),
    });
    if (!respuesta.ok) {
        const errorData = await respuesta.json();
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || `Error al actualizar zona: ${respuesta.status}`);
    }
    return respuesta.json();
};

/**
 * Elimina una zona.
 * @param {string|number} id - ID de la zona.
 * @returns {Object} - Respuesta del servidor.
 */
export const eliminarZona = async (id) => {
    const respuesta = await fetch(`${env.API_BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!respuesta.ok) throw new Error(`Error al eliminar zona: ${respuesta.status}`);
    return respuesta.json();
};
