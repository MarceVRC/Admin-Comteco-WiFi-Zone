/**
 * Configuración centralizada de variables de entorno.
 */
export const env = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    REPORTS_API_URL: import.meta.env.VITE_REPORTS_API_URL,
    ADS_API_URL: import.meta.env.VITE_ADS_API_URL,
    CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};
