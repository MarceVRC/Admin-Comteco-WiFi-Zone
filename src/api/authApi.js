import { env } from "../config/env";

const AUTH_URL = env.API_BASE_URL.replace("/zonas", "/auth");

/**
 * Inicia sesión de un administrador.
 */
export const login = async (email, password) => {
    const respuesta = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.message || datos.error || "Error al iniciar sesión");
    }

    return datos;
};
