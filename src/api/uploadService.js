import { env } from "../config/env";
import { apiFetch } from "./apiClient";

/**
 * Sube una imagen al backend y devuelve la ruta pública relativa.
 * @param {File} file - El archivo de imagen a subir.
 * @returns {Promise<string>} - La URL relativa de la imagen subida.
 */
export const subirImagenAlBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // El endpoint de upload está en la raíz, no bajo /zonas
    const baseUrl = env.API_BASE_URL.replace('/zonas', '');
    const respuesta = await apiFetch(`${baseUrl}/upload`, {
        method: "POST",
        body: formData,
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(datos.message || datos.error || `Error al subir imagen: ${respuesta.status}`);
    }

    if (!datos.url) {
        throw new Error("No se recibió la URL de la imagen subida.");
    }

    return datos.url;
};
