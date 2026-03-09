import { env } from "../config/env";

/**
 * Obtiene todos los reportes desde el backend.
 * @returns {Array} - Lista de reportes.
 */
export const obtenerReportes = async () => {
    try {
        const respuesta = await fetch(env.REPORTS_API_URL);
        if (!respuesta.ok) throw new Error(`Error al obtener reportes: ${respuesta.status}`);

        const datos = await respuesta.json();

        if (datos.ok && Array.isArray(datos.reportes)) {
            return datos.reportes;
        }
        return [];
    } catch (error) {
        console.error("Error en obtenerReportes:", error);
        throw error;
    }
};
