/**
 * Cliente API centralizado para manejar peticiones con autenticación.
 */
import { clearAuth, getAuthToken, redirectToLogin } from "../utils/auth";

export const apiFetch = async (url, options = {}) => {
    const token = getAuthToken();
    
    const headers = {
        ...options.headers,
    };

    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Token expirado o inválido
        clearAuth();
        redirectToLogin();
        throw new Error("Sesión expirada. Inicie sesión nuevamente.");
    }

    return response;
};
