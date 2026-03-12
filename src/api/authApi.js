import { env } from "../config/env";
import { apiFetch } from "./apiClient";

const AUTH_URL = env.API_BASE_URL.replace("/zonas", "/auth");

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

export const register = async (nombre, email, password, telefono) => {
    const respuesta = await apiFetch(`${AUTH_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ nombre, email, password, telefono }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.message || datos.error || "Error en el registro");
    }

    return datos;
};
