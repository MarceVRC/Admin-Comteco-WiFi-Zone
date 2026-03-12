/**
 * Cliente API centralizado para manejar peticiones con autenticación.
 */
export const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Token expirado o inválido
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Sesión expirada. Inicie sesión nuevamente.");
    }

    return response;
};
