import { env } from "../config/env";

/**
 * Sube una imagen a Cloudinary.
 * @param {File} file - El archivo de imagen a subir.
 * @returns {Promise<string>} - La URL de la imagen subida.
 */
export const subirImagenACloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", env.CLOUDINARY_UPLOAD_PRESET);

    const url = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`;

    try {
        const respuesta = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.error?.message || "Error al subir imagen a Cloudinary");
        }

        const datos = await respuesta.json();
        return datos.secure_url;
    } catch (error) {
        console.error("Error en cloudinaryService:", error);
        throw error;
    }
};
